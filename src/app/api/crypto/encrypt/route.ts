import { proxyCrypto } from "../proxy";

export const runtime = "nodejs";
export const maxDuration = 190;

export async function POST(request: Request): Promise<Response> {
  return proxyCrypto(request, "encrypt");
}
