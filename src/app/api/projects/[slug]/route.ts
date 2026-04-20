import { getProjectContent } from "@/lib/projects";
import { ok, fail } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await ctx.params;
    const project = await getProjectContent(slug);
    if (!project) return fail("Project not found", 404);
    return ok(project);
  } catch (e) {
    return fail((e as Error).message, 500);
  }
}
