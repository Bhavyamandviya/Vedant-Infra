import { NextRequest } from "next/server";
import { listProjects } from "@/lib/projects";
import { ok, fail } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const filter = req.nextUrl.searchParams.get("filter");
    const valid = filter === "latest" || filter === "completed" ? filter : undefined;
    const projects = await listProjects(valid);
    return ok(projects);
  } catch (e) {
    return fail((e as Error).message, 500);
  }
}
