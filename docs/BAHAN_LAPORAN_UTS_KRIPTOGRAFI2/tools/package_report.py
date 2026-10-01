#!/usr/bin/env python3
"""Build and verify the portable report package using only the standard library.

Run from the project root after refreshing tests and writing the report:
    python docs/BAHAN_LAPORAN_UTS_KRIPTOGRAFI2/tools/package_report.py
    python docs/BAHAN_LAPORAN_UTS_KRIPTOGRAFI2/tools/package_report.py --check-only

Original application files and evidence are read only. Source bytes are copied
exactly. Local machine paths are removed only from copies of evidence JSON/text.
"""

from __future__ import annotations

import argparse
import base64
from collections import Counter
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import re
import shutil
import sys
from urllib.parse import unquote, urlsplit
import zipfile


PACKAGE_NAME = "BAHAN_LAPORAN_UTS_KRIPTOGRAFI2"
REPORT_NAME = PACKAGE_NAME + ".md"
MANIFEST_NAME = "MANIFEST_SHA256.json"
INTEGRITY_FILES = {MANIFEST_NAME, "SHA256SUMS.txt"}
CIPHERS = {
    "vigenere", "autokey", "extended-vigenere", "playfair",
    "affine", "hill", "super", "enigma-i",
}
SOURCE_DIRECTORIES = ("src", "apps/api", "scripts", "tests", "security", "public")
ROOT_FILES = {
    "README.md", "PRD.md", "package.json", "pnpm-lock.yaml", "pnpm-workspace.yaml",
    "tsconfig.json", "next-env.d.ts", "next.config.ts", "eslint.config.mjs",
    "playwright.config.ts", "vitest.config.ts", "vitest.evidence.config.ts",
    ".env.example", ".gitignore", ".ruby-version", ".node-version", ".nvmrc",
    ".npmrc", "LICENSE", "LICENSE.md", "LICENSE.txt",
    ".rspec", "Rakefile",
}
PROJECT_DOCUMENTS = ("docs/spesifikasi.md", "docs/catatan-teknis.md")
EXCLUDED_DIRECTORIES = {
    "node_modules", "vendor", ".bundle", ".git", ".next", ".tools", ".codex",
    ".agents", ".aws", ".ssh", ".vscode", ".idea", "__pycache__", ".pytest_cache",
    ".vitest", "test-results", "playwright-report", "out", "dist", "build",
    "graphify-out", ".cache", "tmp", "temp", "coverage",
}
EXCLUDED_SUFFIXES = {
    ".zip", ".7z", ".rar", ".tar", ".gz", ".exe", ".dll", ".so", ".dylib",
    ".pfx", ".p12", ".pem", ".key", ".jks", ".kdbx", ".log", ".pyc", ".tsbuildinfo",
}
EXCLUDED_NAMES = {"AGENTS.md", "CLAUDE.md", "prompt laporan.md", "Thumbs.db", ".DS_Store"}
TEXT_SUFFIXES = {
    ".md", ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".py", ".rb", ".ru",
    ".json", ".yaml", ".yml", ".txt", ".lock", ".css", ".svg", ".toml", ".ini",
}
REQUIRED_SOURCE = {
    "README.md", "PRD.md", ".env.example", "package.json", "pnpm-lock.yaml",
    "tsconfig.json", "next.config.ts", "eslint.config.mjs", "playwright.config.ts",
    "vitest.config.ts", "vitest.evidence.config.ts", "apps/api/Gemfile", "apps/api/Gemfile.lock",
    "apps/api/app.rb", "apps/api/config.ru", "apps/api/config/puma.rb",
    "apps/api/lib/uts_crypto/engine.rb", "apps/api/lib/uts_crypto/codecs.rb",
    "apps/api/lib/uts_crypto/container.rb", "apps/api/lib/uts_crypto/keys.rb",
    "apps/api/lib/uts_crypto/ciphers/classical.rb", "apps/api/lib/uts_crypto/ciphers/playfair.rb",
    "apps/api/lib/uts_crypto/ciphers/enigma.rb", "apps/api/lib/uts_crypto/ciphers/modular.rb",
    "src/components/Workbench.tsx", "src/components/KeyFields.tsx", "src/lib/engine/http.ts",
    "src/app/api/crypto/encrypt/route.ts", "src/app/api/crypto/decrypt/route.ts",
    "src/app/api/crypto/inspect/route.ts", "scripts/dev.mjs", "scripts/with-ruby.mjs",
    "scripts/ruby-service.mjs", "scripts/serve-api.rb", "scripts/test-ruby.mjs",
    "scripts/run-rspec.rb", "tests/unit/api-client.test.ts", "tests/e2e/app.spec.ts",
    "tests/evidence/scenarios.test.ts", "tests/migration/legacy-typescript-v1.json",
    "apps/api/spec/enigma_spec.rb", "apps/api/spec/ciphers_spec.rb", "apps/api/spec/api_spec.rb",
}
REQUIRED_EVIDENCE = {
    "file-scenarios.json", "text-examples.json", "unit-test-results.json",
    "ruby-test-results.json", "e2e-results.json", "format-checks.json",
    "screenshots/01-tampilan-utama.png", "screenshots/teks-enigma-i-enkripsi.png",
    "screenshots/teks-enigma-i-dekripsi.png", "screenshots/file-enigma-i-dekripsi.png",
}
REQUIRED_FIXTURES = {
    "teks-contoh.txt", "gambar-contoh.png", "database-contoh.sqlite",
    "audio-contoh.wav", "video-contoh.webm",
}
SECRET_PATTERNS = (
    ("private key", re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----")),
    ("OpenAI credential", re.compile(r"\bsk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{24,}")),
    ("GitHub credential", re.compile(r"\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,})")),
    ("AWS credential", re.compile(r"\b(?:AKIA|ASIA)[A-Z0-9]{16}\b")),
    ("npm credential", re.compile(r"(?im)^\s*(?://[^\n=]+:)?_authToken\s*=\s*(?!\$\{)[^\s#]{8,}")),
    ("assigned credential", re.compile(
        r"(?im)^\s*(?:export\s+)?(?:OPENAI_API_KEY|GITHUB_TOKEN|AWS_SECRET_ACCESS_KEY|"
        r"DATABASE_PASSWORD|SMTP_PASSWORD|PRIVATE_KEY)\s*[=:]\s*[\"']?[^\s\"'#]{8,}"
    )),
)
PRIVATE_PATH = re.compile(r"(?i)(?:[A-Z]:[\\/]+(?:Users|Documents and Settings)[\\/]+|/(?:Users|home)/)[^\s\"<>]+")


def sha256(path: Path) -> str:
    with path.open("rb") as stream:
        digest = hashlib.file_digest(stream, "sha256")
    return digest.hexdigest()


def write_json(path: Path, value: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def permitted(path: Path, relative: Path) -> bool:
    if path.is_symlink():
        raise ValueError(f"Symlink tidak disertakan: {relative.as_posix()}")
    if any(part in EXCLUDED_DIRECTORIES or part.startswith("BAHAN_LAPORAN_") for part in relative.parts):
        return False
    if path.name in EXCLUDED_NAMES or path.suffix.lower() in EXCLUDED_SUFFIXES:
        return False
    if path.name.startswith(".env") and path.name != ".env.example":
        return False
    if path.name.lower() in {"credentials", "credentials.json", "secrets.json", "id_rsa", "id_ed25519"}:
        return False
    return True


def walk(directory: Path, root: Path) -> list[Path]:
    if not directory.exists():
        return []
    result = []
    for child in sorted(directory.iterdir()):
        relative = child.relative_to(root)
        if not permitted(child, relative):
            continue
        if child.is_dir():
            result.extend(walk(child, root))
        elif child.is_file():
            result.append(child)
    return result


def source_files(root: Path) -> list[Path]:
    result = [root / name for name in sorted(ROOT_FILES) if (root / name).is_file()]
    result.extend(root / name for name in PROJECT_DOCUMENTS if (root / name).is_file())
    for name in SOURCE_DIRECTORIES:
        result.extend(walk(root / name, root))
    return sorted(set(result), key=lambda path: path.relative_to(root).as_posix())


def require_files(root: Path, required: set[str], label: str) -> None:
    missing = sorted(name for name in required if not (root / name).is_file())
    if missing:
        raise ValueError(f"{label} belum lengkap: {', '.join(missing)}")


def verify_ciphers(root: Path) -> None:
    text = (root / "apps/api/lib/uts_crypto/keys.rb").read_text(encoding="utf-8")
    match = re.search(r"CIPHER_IDS\s*=\s*%w\[([^]]+)\]", text)
    if not match or set(match.group(1).split()) != CIPHERS:
        raise ValueError("Daftar delapan cipher Ruby tidak cocok dengan cakupan laporan.")
    classical = (root / "apps/api/lib/uts_crypto/ciphers/classical.rb").read_text(encoding="utf-8")
    for function in ("vigenere", "extended", "affine", "hill", "transpose", "super_cipher"):
        if not re.search(rf"def\s+{function}\b", classical):
            raise ValueError(f"Implementasi Ruby wajib tidak ditemukan: {function}")


def clear_owned(directory: Path, output: Path) -> None:
    # Check the final absolute target before deleting any previous generated copy.
    target = directory.resolve()
    if directory.is_symlink() or target.parent != output.resolve() and target.parent != (output / "bukti").resolve():
        raise ValueError("Target pembersihan keluar dari subfolder keluaran yang dimiliki skrip.")
    if directory.name not in {"kode-sumber", "evidence", "fixtures"} or target == output.resolve():
        raise ValueError("Skrip hanya dapat membersihkan salinan kode, evidence, atau fixture miliknya.")
    if directory.exists():
        shutil.rmtree(directory)
    directory.mkdir(parents=True)


def sanitize_string(value: str, root: Path) -> str:
    variants = {str(root), root.as_posix(), str(root).replace("\\", "\\\\")}
    for prefix in sorted(variants, key=len, reverse=True):
        for separator in ("\\\\", "\\", "/"):
            value = value.replace(prefix + separator, "")
        value = value.replace(prefix, ".")
    return PRIVATE_PATH.sub("[lokasi lokal dihapus]", value)


def sanitize_value(value: object, root: Path) -> object:
    if isinstance(value, str):
        return sanitize_string(value, root)
    if isinstance(value, list):
        return [sanitize_value(item, root) for item in value]
    if isinstance(value, dict):
        return {key: sanitize_value(item, root) for key, item in value.items()}
    return value


def copy_evidence(source: Path, destination: Path, root: Path, output: Path, audit: list[dict]) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    changed = False
    if source.suffix.lower() == ".json":
        original = json.loads(source.read_text(encoding="utf-8-sig"))
        sanitized = sanitize_value(original, root)
        changed = sanitized != original
        if changed:
            write_json(destination, sanitized)
        else:
            shutil.copy2(source, destination)
    elif source.suffix.lower() in {".md", ".txt"}:
        original = source.read_text(encoding="utf-8-sig")
        sanitized = sanitize_string(original, root)
        changed = sanitized != original
        if changed:
            destination.write_text(sanitized, encoding="utf-8")
        else:
            shutil.copy2(source, destination)
    else:
        shutil.copy2(source, destination)
    if changed:
        audit.append({
            "file": destination.relative_to(output).as_posix(),
            "source": source.relative_to(root).as_posix(),
            "originalSha256": sha256(source), "packagedSha256": sha256(destination),
            "change": "Lokasi mesin lokal diganti path proyek relatif atau penanda penghapusan. Nilai hasil uji tidak diubah.",
        })


def text_file(path: Path) -> bool:
    return path.suffix.lower() in TEXT_SUFFIXES or path.name in {
        "Gemfile", "Rakefile", "config", ".env.example", ".gitignore", ".npmrc", "LICENSE",
        ".ruby-version", ".node-version", ".nvmrc", ".rspec",
    }


def scan_safe(files: list[Path], root: Path) -> None:
    problems = []
    for path in files:
        if not text_file(path):
            continue
        try:
            content = path.read_text(encoding="utf-8-sig")
        except UnicodeDecodeError as error:
            raise ValueError(f"Berkas teks bukan UTF-8: {path.relative_to(root)}") from error
        for label, pattern in SECRET_PATTERNS:
            if pattern.search(content):
                problems.append(f"{path.relative_to(root).as_posix()}: {label}")
        if PRIVATE_PATH.search(content):
            problems.append(f"{path.relative_to(root).as_posix()}: lokasi mesin pribadi")
    if problems:
        # Report file/category only. Never print any matched credential value.
        raise ValueError("Pemindaian paket menemukan data yang perlu ditinjau: " + "; ".join(problems))


def appendix(output: Path, sources: list[Path], root: Path) -> None:
    labels = {".ts": "typescript", ".tsx": "tsx", ".mjs": "javascript", ".json": "json", ".md": "markdown",
              ".rb": "ruby", ".ru": "ruby", ".py": "python", ".yaml": "yaml", ".yml": "yaml", ".css": "css", ".svg": "xml"}
    lines = ["# Lampiran kode program lengkap", "", "Kode dan konfigurasi berikut disalin dari proyek yang diuji. Salinan berkas asli tersedia pada `kode-sumber/`. Kunci pada fixture merupakan contoh uji.", "",
             "Dependensi terpasang, runtime lokal, cache, hasil build, kredensial, dan instruksi internal tidak dimasukkan. Modul cipher TypeScript lama tetap disertakan sebagai pembanding migrasi. Operasi aplikasi memakai mesin Ruby.", ""]
    for source in sources:
        if not text_file(source):
            continue
        relative = source.relative_to(root).as_posix()
        content = source.read_text(encoding="utf-8-sig")
        fence = "`" * max(3, max((len(match.group()) + 1 for match in re.finditer(r"`+", content)), default=3))
        lines.extend([f"## {relative}", "", f"Berkas: [kode-sumber/{relative}](<kode-sumber/{relative}>)", "",
                      fence + labels.get(source.suffix.lower(), "text"), content.rstrip("\n"), fence, ""])
    (output / "LAMPIRAN_KODE_PROGRAM.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def without_fences(content: str) -> str:
    lines = []
    active = None
    for line in content.splitlines():
        match = re.match(r"^\s*(`{3,}|~{3,})", line)
        if match:
            marker = match.group(1)
            if active is None:
                active = marker
            elif marker[0] == active[0] and len(marker) >= len(active):
                active = None
            continue
        if active is None:
            lines.append(line)
    return "\n".join(lines)


def verify_links(output: Path, files: list[Path], pending: set[str] | None = None) -> int:
    count = 0
    pattern = re.compile(r"!?\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))(?:\s+[^)]*)?\)")
    for path in files:
        if path.suffix.lower() != ".md":
            continue
        content = without_fences(path.read_text(encoding="utf-8-sig"))
        for match in pattern.finditer(content):
            target = match.group(1) or match.group(2)
            url = urlsplit(target)
            if url.scheme or target.startswith(("#", "//")):
                continue
            name = unquote(url.path)
            if not name:
                continue
            resolved = (path.parent / name).resolve()
            if not resolved.is_relative_to(output.resolve()):
                raise ValueError(f"Tautan lokal tidak tersedia dalam paket: {path.relative_to(output)} -> {target}")
            if not resolved.exists() and resolved.relative_to(output).as_posix() not in (pending or set()):
                raise ValueError(f"Tautan lokal tidak tersedia dalam paket: {path.relative_to(output)} -> {target}")
            count += 1
    return count


def all_output_files(output: Path) -> list[Path]:
    result = []
    for path in output.rglob("*"):
        if path.is_symlink():
            raise ValueError("Symlink tidak diperbolehkan pada paket laporan.")
        if path.is_file():
            result.append(path)
    return sorted(result, key=lambda path: path.relative_to(output).as_posix())


def verify_inventory(output: Path, files: list[Path]) -> None:
    for path in files:
        relative = path.relative_to(output)
        parts = relative.parts
        if any(part in EXCLUDED_DIRECTORIES or part.startswith("BAHAN_LAPORAN_") for part in parts[:-1]):
            raise ValueError(f"Folder internal, dependensi, atau laporan lama ada dalam paket: {relative.as_posix()}")
        if path.name.casefold() in {name.casefold() for name in EXCLUDED_NAMES} or path.suffix.lower() in EXCLUDED_SUFFIXES:
            raise ValueError(f"Berkas yang harus dikeluarkan ada dalam paket: {relative.as_posix()}")
        if path.name.startswith(".env") and path.name != ".env.example":
            raise ValueError("Kredensial .env tidak boleh disertakan.")


def read_container(path: Path) -> tuple[dict, bytes]:
    data = path.read_bytes()
    if len(data) < 13 or data[:8] != b"UTSKRIPT" or data[8] != 1:
        raise ValueError(f"Format kontainer tidak valid: {path.name}")
    length = int.from_bytes(data[9:13], "big")
    if 13 + length > len(data):
        raise ValueError(f"Metadata kontainer terpotong: {path.name}")
    metadata = json.loads(data[13:13 + length].decode("utf-8"))
    payload = data[13 + length:]
    if metadata.get("payloadLength") != len(payload):
        raise ValueError(f"Ukuran payload kontainer tidak sesuai: {path.name}")
    forbidden = {"key", "keyword", "byteKey", "byteKeyFormat", "affineA", "affineB", "hillMatrix",
                 "columnKey", "rotors", "ringSettings", "initialPositions", "reflector", "plugboard", "keyNotes", "parameters"}
    def check_keys(value: object) -> None:
        if isinstance(value, dict):
            if set(value) & forbidden:
                raise ValueError(f"Konfigurasi kunci tidak boleh berada pada metadata paket: {path.name}")
            for child in value.values():
                check_keys(child)
        elif isinstance(value, list):
            for child in value:
                check_keys(child)
    check_keys(metadata)
    return metadata, payload


def proof_path(output: Path, relative: str) -> Path:
    path = (output / relative).resolve()
    if not path.is_relative_to(output.resolve()) or not path.is_file():
        raise ValueError(f"Berkas bukti tidak tersedia di dalam paket: {relative}")
    return path


def verify_evidence(output: Path) -> dict:
    evidence = output / "bukti/evidence"
    require_files(evidence, REQUIRED_EVIDENCE, "Bukti pengujian")
    require_files(output / "bukti/fixtures", REQUIRED_FIXTURES, "Lima format fixture")
    files = json.loads((evidence / "file-scenarios.json").read_text(encoding="utf-8"))
    if files.get("engine") != "Ruby via HTTP":
        raise ValueError("Bukti file tidak menunjukkan jalur mesin Ruby.")
    scenarios = files.get("scenarios", [])
    counts = Counter(item.get("algorithm") for item in scenarios)
    if set(counts) != CIPHERS or any(value != 5 for value in counts.values()):
        raise ValueError("Bukti harus memiliki delapan cipher dengan lima skenario file masing-masing.")
    for item in scenarios:
        if item.get("result") != "LULUS" or item.get("byteIdentical") is not True:
            raise ValueError("Skenario file belum lulus atau belum identik byte demi byte.")
        original = proof_path(output, "bukti/fixtures/" + item["fixture"])
        recovered = proof_path(output, "bukti/" + item["decryptedFile"])
        encrypted = proof_path(output, "bukti/" + item["encryptedFile"])
        digest = sha256(original)
        if original.read_bytes() != recovered.read_bytes() or digest != item["originalSha256"] or digest != item["decryptedSha256"]:
            raise ValueError(f"Byte atau checksum file tidak cocok: {item['algorithm']} {item['fixture']}")
        if original.stat().st_size != item["originalSize"] or recovered.stat().st_size != item["decryptedSize"] or sha256(encrypted) != item["containerSha256"]:
            raise ValueError("Ukuran atau hash kontainer contoh tidak cocok dengan hasil uji.")
        metadata, _ = read_container(encrypted)
        if metadata.get("algorithm") != item["algorithm"] or metadata.get("inputMode") != "file" or metadata.get("sha256") != digest:
            raise ValueError("Metadata kontainer tidak cocok dengan cipher dan file asal.")
    texts = json.loads((evidence / "text-examples.json").read_text(encoding="utf-8"))
    examples = texts.get("examples", []) if isinstance(texts, dict) else texts
    if {item.get("algorithm") for item in examples} != CIPHERS:
        raise ValueError("Contoh teks harus mencakup kedelapan cipher.")
    for item in examples:
        if item.get("result") != "LULUS" or item.get("checksumVerified") is not True or item.get("decrypted") != item.get("processedPlaintext"):
            raise ValueError("Contoh teks belum menunjukkan pemulihan yang benar.")
        encrypted = proof_path(output, "bukti/" + item["packageFile"])
        metadata, payload = read_container(encrypted)
        if encrypted.read_bytes() != base64.b64decode(item["packageBase64"], validate=True) or payload != base64.b64decode(item["ciphertextBase64"], validate=True):
            raise ValueError("Base64 contoh teks tidak cocok dengan paket atau payload aktual.")
        expected = hashlib.sha256(item["decrypted"].encode("utf-8")).hexdigest()
        if metadata.get("algorithm") != item["algorithm"] or metadata.get("sha256") != expected:
            raise ValueError("Checksum contoh teks tidak cocok dengan hasil pemulihan.")
    unit = json.loads((evidence / "unit-test-results.json").read_text(encoding="utf-8"))
    ruby = json.loads((evidence / "ruby-test-results.json").read_text(encoding="utf-8"))
    browser = json.loads((evidence / "e2e-results.json").read_text(encoding="utf-8"))
    if not unit.get("numTotalTests") or not ruby.get("summary", {}).get("example_count") or not browser.get("stats"):
        raise ValueError("Ringkasan unit, RSpec, atau browser belum tersedia.")
    if unit.get("numFailedTests") != 0 or not unit.get("success") or ruby["summary"].get("failure_count") != 0 or ruby["summary"].get("pending_count") != 0:
        raise ValueError("Unit atau RSpec belum lulus seluruhnya.")
    if browser["stats"].get("unexpected") != 0 or browser["stats"].get("flaky") != 0 or browser.get("errors"):
        raise ValueError("Pengujian browser masih memiliki kegagalan atau hasil tidak stabil.")
    formats = json.loads((evidence / "format-checks.json").read_text(encoding="utf-8"))
    if not formats.get("checked") or formats.get("checked") != formats.get("passed") or any(item.get("ok") is not True for item in formats.get("results", [])):
        raise ValueError("Pemeriksaan format hasil pemulihan belum lulus seluruhnya.")
    browser_downloads = json.loads((output / "bukti/browser-downloads.json").read_text(encoding="utf-8"))
    downloads = browser_downloads.get("cases", [])
    if Counter(item["mode"] for item in downloads) != Counter({"file": 8, "teks": 8}):
        raise ValueError("Bukti unduhan browser belum mencakup delapan cipher untuk teks dan file.")
    for item in downloads:
        encrypted = proof_path(output, item["package"])
        recovered = proof_path(output, item["decryptedFile"])
        metadata, payload = read_container(encrypted)
        if item.get("result") != "LULUS" or sha256(encrypted) != item["packageSha256"] or sha256(recovered) != item["decryptedSha256"]:
            raise ValueError("Hash bukti unduhan browser tidak sesuai.")
        if payload != base64.b64decode(item["payloadBase64"], validate=True) or metadata.get("algorithm") != item["algorithm"]:
            raise ValueError("Payload unduhan browser tidak sesuai dengan ringkasan.")
        if metadata.get("sha256") != sha256(recovered):
            raise ValueError("Checksum paket browser tidak sama dengan file pemulihan.")
        if item["mode"] == "file":
            original = proof_path(output, "bukti/fixtures/" + item["fixture"])
            if item.get("byteIdentical") is not True or original.read_bytes() != recovered.read_bytes():
                raise ValueError("File unduhan browser tidak identik dengan file asal.")
    return {
        "fileScenarios": len(scenarios), "textExamples": len(examples),
        "vitest": {"passed": unit.get("numPassedTests"), "failed": unit.get("numFailedTests")},
        "rspec": ruby.get("summary"), "playwright": browser.get("stats"),
        "screenshots": len(list((evidence / "screenshots").glob("*.png"))),
        "browserDownloadPackages": len(downloads), "browserRecoveredFiles": 8,
        "formatChecks": formats["passed"], "containerMetadataChecked": len(scenarios) + len(examples) + len(downloads),
    }


def package_readme(output: Path) -> None:
    (output / "README.md").write_text("""# Bahan laporan UTS Kriptografi

Mulai dari [bahan laporan utama](BAHAN_LAPORAN_UTS_KRIPTOGRAFI2.md). Dokumen ini memuat tujuan, implementasi delapan cipher, contoh, hasil pengujian, dan pembahasan kedua bonus.

- [Keterangan 45 screenshot](KETERANGAN_SCREENSHOT.md) menjelaskan tampilan aplikasi yang diuji.
- [Kode lengkap dalam bentuk teks](LAMPIRAN_KODE_PROGRAM.md) dapat disalin ke lampiran laporan.
- [README aplikasi asli](kode-sumber/README.md) menjelaskan instalasi, menjalankan aplikasi, dan perintah pengujian.
- [Implementasi algoritma dan contoh kunci](IMPLEMENTASI_ALGORITMA.md) melengkapi uraian teknis.
- [Contoh teks aktual beserta kunci](bukti/evidence/text-examples.json) dan [40 skenario file beserta kunci](bukti/evidence/file-scenarios.json) memuat nilai hasil eksekusi.
- [Checksum lengkap file](CHECKSUM_FILE_LENGKAP.md) memuat ukuran dan hash file asal serta hasil pemulihan.
- [Paket yang diunduh dari browser](bukti/browser-downloads.json) mencatat 16 paket serta hasil dekripsi pada konteks browser baru.
- [Manifest SHA-256](MANIFEST_SHA256.json) dan [catatan validasi paket](VALIDASI_PAKET.json) membantu memeriksa kelengkapan dan integritas.

Folder `bukti/fixtures` berisi file asal. Folder `bukti/evidence/samples` berisi pasangan paket dan hasil dekripsinya. Folder `bukti/evidence/screenshots` berisi tangkapan layar. Folder `bukti/browser-downloads` berisi paket yang benar-benar diunduh melalui antarmuka serta delapan file biner hasil unduhan dekripsi. Hasil teks pada folder tersebut disimpan dari nilai yang diperiksa browser, sebagaimana dijelaskan pada ringkasan unduhan.

Folder `kode-sumber` berisi salinan byte asli kode proyek, konfigurasi, dan lockfile. Fixture dan salinan bukti juga tersedia di dalamnya agar petunjuk pengujian dapat diikuti. Dependensi terpasang, runtime lokal, cache, hasil build, kredensial, dan instruksi internal dikeluarkan. Salinan JSON bukti mengubah lokasi mesin pribadi menjadi path relatif. Nilai hasil pengujian tetap sama dan perubahan salinan dicatat pada catatan validasi. Berkas asli proyek dan evidence tidak diubah.

Untuk menjalankan aplikasi, buka terminal pada `kode-sumber`, jalankan `pnpm install`, lalu `bundle install` dari `apps/api`, kemudian `pnpm dev` dari root kode sumber. Versi runtime dan langkah produksi dijelaskan pada README aplikasi.

Skrip `tools/package_report.py` menyusun ulang paket menggunakan Python tanpa paket tambahan dan memerlukan root proyek asli sebagai sumber. Jalankan `python tools/package_report.py --check-only` dari folder bahan ini untuk memeriksa manifest, tautan lokal, dan bukti file setelah paket diekstrak. ZIP juga diperiksa bila tersedia di samping folder bahan.
""", encoding="utf-8")


def write_manifest(output: Path) -> dict:
    records = []
    for path in all_output_files(output):
        relative = path.relative_to(output).as_posix()
        if relative in INTEGRITY_FILES:
            continue
        records.append({"path": relative, "bytes": path.stat().st_size, "sha256": sha256(path)})
    manifest = {"algorithm": "SHA-256", "excludedSelfReferences": sorted(INTEGRITY_FILES), "files": records}
    write_json(output / MANIFEST_NAME, manifest)
    (output / "SHA256SUMS.txt").write_text("".join(f"{item['sha256']}  {item['path']}\n" for item in records), encoding="utf-8")
    return manifest


def verify_manifest(output: Path) -> dict:
    manifest = json.loads((output / MANIFEST_NAME).read_text(encoding="utf-8"))
    records = manifest["files"]
    names = [item["path"] for item in records]
    if len(names) != len(set(name.casefold() for name in names)):
        raise ValueError("Path manifest berulang atau bertabrakan pada Windows.")
    actual = {path.relative_to(output).as_posix() for path in all_output_files(output)} - INTEGRITY_FILES
    if actual != set(names):
        raise ValueError("Daftar manifest tidak sama dengan isi paket.")
    for item in records:
        path = output / item["path"]
        if not path.resolve().is_relative_to(output.resolve()) or sha256(path) != item["sha256"] or path.stat().st_size != item["bytes"]:
            raise ValueError(f"Hash atau ukuran tidak cocok: {item['path']}")
    expected_sums = "".join(f"{item['sha256']}  {item['path']}\n" for item in records)
    if (output / "SHA256SUMS.txt").read_text(encoding="utf-8") != expected_sums:
        raise ValueError("SHA256SUMS.txt tidak cocok dengan manifest JSON.")
    return manifest


def verify_archive(archive: Path, output: Path) -> None:
    expected = {f"{output.name}/{path.relative_to(output).as_posix()}": path for path in all_output_files(output)}
    with zipfile.ZipFile(archive) as bundle:
        names = bundle.namelist()
        if len(names) != len(set(name.casefold() for name in names)) or set(names) != set(expected):
            raise ValueError("ZIP memuat path berulang, berkas asing, atau berkas yang hilang.")
        if bundle.testzip() is not None:
            raise ValueError("Pemeriksaan CRC ZIP gagal.")
        for name in names:
            if ".." in Path(name).parts or Path(name).is_absolute():
                raise ValueError("ZIP memuat path yang tidak aman.")
            if hashlib.sha256(bundle.read(name)).hexdigest() != sha256(expected[name]):
                raise ValueError(f"Hash ZIP tidak cocok: {name}")


def package(root: Path, output: Path) -> dict:
    output.mkdir(parents=True, exist_ok=True)
    if not (output / REPORT_NAME).is_file() and (root / "docs" / REPORT_NAME).is_file():
        shutil.copy2(root / "docs" / REPORT_NAME, output / REPORT_NAME)
    require_files(output, {REPORT_NAME}, "Dokumen bahan laporan")
    sources = source_files(root)
    require_files(root, REQUIRED_SOURCE, "Sumber proyek")
    verify_ciphers(root)
    scan_safe(sources, root)
    original_hashes = {path.relative_to(root).as_posix(): sha256(path) for path in sources}
    code = output / "kode-sumber"
    clear_owned(code, output)
    for source in sources:
        destination = code / source.relative_to(root)
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, destination)
        if sha256(destination) != original_hashes[source.relative_to(root).as_posix()]:
            raise ValueError("Salinan kode sumber tidak identik dengan proyek.")
    audit = []
    # Preserve root-authored bukti/browser-downloads and other report evidence.
    for name in ("evidence", "fixtures"):
        destination_root = output / "bukti" / name
        clear_owned(destination_root, output)
        for source in walk(root / name, root):
            relative = source.relative_to(root / name)
            copy_evidence(source, destination_root / relative, root, output, audit)
            copy_evidence(source, code / name / relative, root, output, audit)
    appendix(output, sources, root)
    package_readme(output)
    for source in sources:
        if sha256(source) != original_hashes[source.relative_to(root).as_posix()]:
            raise ValueError("Sumber proyek berubah selama snapshot. Jalankan kembali setelah sumber stabil.")
    summary = verify_evidence(output)
    files = all_output_files(output)
    verify_inventory(output, files)
    scan_safe(files, output)
    links = verify_links(output, files, {MANIFEST_NAME, "SHA256SUMS.txt", "VALIDASI_PAKET.json"})
    write_json(output / "VALIDASI_PAKET.json", {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "sourceFiles": len(sources), "applicationSourcesUnchanged": True,
        "sourceCopiesIdentical": True, "localMarkdownLinksChecked": links,
        "secretScanFindings": [], "privatePathScanFindings": [],
        "evidenceCopiesSanitized": audit, "testEvidence": summary,
        "integrity": "MANIFEST_SHA256.json dan SHA256SUMS.txt mencatat semua berkas selain kedua manifest itu sendiri.",
    })
    write_manifest(output)
    verify_manifest(output)
    verify_links(output, all_output_files(output))
    return summary


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--project-root", type=Path, default=Path(__file__).resolve().parents[3])
    parser.add_argument("--check-only", action="store_true", help="Verifikasi isi paket dan ZIP yang sudah terbentuk tanpa menulis ulang.")
    arguments = parser.parse_args()
    root = arguments.project_root.resolve()
    output = Path(__file__).resolve().parent.parent if arguments.check_only else (root / "docs" / PACKAGE_NAME).resolve()
    archive = output.with_suffix(".zip")
    if not arguments.check_only and (output.parent != (root / "docs").resolve() or not output.is_relative_to(root)):
        raise ValueError("Folder output harus berada di docs proyek yang ditentukan.")
    if arguments.check_only:
        require_files(output / "kode-sumber", REQUIRED_SOURCE, "Snapshot sumber")
        verify_ciphers(output / "kode-sumber")
        summary = verify_evidence(output)
        files = all_output_files(output)
        verify_inventory(output, files)
        scan_safe(files, output)
        verify_links(output, files)
        verify_manifest(output)
        if archive.is_file():
            verify_archive(archive, output)
    else:
        summary = package(root, output)
        temporary = archive.with_suffix(".zip.tmp")
        with zipfile.ZipFile(temporary, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as bundle:
            for path in all_output_files(output):
                bundle.write(path, f"{output.name}/{path.relative_to(output).as_posix()}")
        verify_archive(temporary, output)
        temporary.replace(archive)
    print(json.dumps({
        "package": archive.relative_to(root).as_posix(), "bytes": archive.stat().st_size if archive.is_file() else None,
        "sha256": sha256(archive) if archive.is_file() else None, "files": len(all_output_files(output)),
        "verified": True, "archiveVerified": True if archive.is_file() else None, "evidence": summary,
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    try:
        main()
    except (ValueError, OSError, json.JSONDecodeError, zipfile.BadZipFile) as error:
        print(f"Paket belum dapat diselesaikan: {error}", file=sys.stderr)
        sys.exit(1)
