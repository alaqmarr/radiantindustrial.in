import { prisma } from "@/lib/prisma";
import { wrapInEmailTemplate } from "@/lib/emailTemplate";
import TemplatePreviewGallery from "./TemplatePreviewGallery";

export default async function TemplatePreviewPage() {
  const templates = await prisma.template.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Pre-render wrapped HTML for each email template on the server
  const templatesWithHtml = templates.map((template) => ({
    id: template.id,
    name: template.name,
    subject: template.subject || "",
    body: template.body,
    type: template.type,
    createdAt: template.createdAt.toISOString(),
    wrappedHtml:
      template.type === "EMAIL"
        ? wrapInEmailTemplate(
            template.subject || template.name,
            template.body,
            "customer@example.com"
          )
        : template.body,
  }));

  return <TemplatePreviewGallery templates={templatesWithHtml} />;
}
