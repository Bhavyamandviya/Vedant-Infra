import { readJson, ok, fail } from "@/lib/http";
import { validateAppointment } from "@/lib/validators";
import { createAppointment } from "@/lib/services";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await readJson(req);
  const v = validateAppointment(body);
  if (!v.ok) return fail(v.error, 400);
  try {
    const result = await createAppointment(v.data);
    return ok(result, { status: 201 });
  } catch (e) {
    return fail((e as Error).message, 500);
  }
}
