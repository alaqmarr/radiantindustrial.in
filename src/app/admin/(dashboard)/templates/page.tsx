import { prisma } from "@/lib/prisma";
import TemplateManager from "./TemplateManager";

export default async function TemplatesPage() {
  const templates = await prisma.template.findMany({
    orderBy: { createdAt: "desc" }
  });

  return <TemplateManager templates={templates} />;
}
