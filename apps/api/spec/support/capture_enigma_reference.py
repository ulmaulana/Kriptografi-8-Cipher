"""Reproduce frozen vectors with independent Py-Enigma 1.0.2 (test tooling only).

pip install py-enigma==1.0.2
python apps/api/spec/support/capture_enigma_reference.py
Reference implementation: https://github.com/gremmie/enigma
Documentation: https://py-enigma.readthedocs.io/en/latest/reference.html
"""
import json
from enigma.machine import EnigmaMachine

cases = [
    (["V", "IV", "II"], [2, 3, 4], "QEZ", "C", "AB CD EF GH IJ", "HELLOWORLD"),
    (["IV", "V", "I"], [13, 1, 26], "JZQ", "C", "", "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ"),
    (["I", "II", "III"], [2, 12, 26], "ADU", "B", "AV BS CG DL FU HZ IN KM OW RX", "THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG"),
]
out = []
for rotors, rings, positions, reflector, plugboard, text in cases:
    machine = EnigmaMachine.from_key_sheet(
        rotors=rotors,
        ring_settings=" ".join(map(str, rings)),
        reflector=reflector,
        plugboard_settings=plugboard,
    )
    machine.set_display(positions)
    ciphertext = machine.process_text(text)
    out.append({
        "key": {"rotors": rotors, "ringSettings": rings,
                "initialPositions": list(positions), "reflector": reflector,
                "plugboard": plugboard},
        "plain": text, "cipher": ciphertext, "finalPositions": machine.get_display(),
    })
print(json.dumps({"source": "Py-Enigma 1.0.2, independent Python simulator",
                  "url": "https://github.com/gremmie/enigma", "cases": out}, indent=2))
