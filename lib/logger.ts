import fs from "fs";
import path from "path";

function ensureDir(dir: string) {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch {}
}

export function logToLocal(
  file: string,
  data: string | Record<string, unknown>
) {
  try {
    const root = process.cwd();
    const dir = path.join(root, ".local-logs");
    ensureDir(dir);
    const p = path.join(dir, file);
    const stamp = new Date().toISOString();
    const text = typeof data === "string" ? data : JSON.stringify(data);
    fs.appendFileSync(p, `[${stamp}] ${text}\n`);
  } catch {
    // ignore file logging errors to avoid affecting request flow
  }
}
