import type { ApiResponse } from "@/types";

export function ok<T>(data: T, init?: ResponseInit): Response {
  const body: ApiResponse<T> = { ok: true, data };
  return Response.json(body, init);
}

export function fail(error: string, status = 400): Response {
  const body: ApiResponse = { ok: false, error };
  return Response.json(body, { status });
}

export async function readJson(req: Request): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    return null;
  }
}
