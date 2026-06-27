import { prisma } from "@/lib/prisma";
import CampaignManager from "./CampaignManager";

export default async function CampaignsPage() {
  const templates = await prisma.template.findMany({
    orderBy: { createdAt: "desc" }
  });
  
  const tags = await prisma.tag.findMany();
  
  const contacts = await prisma.contact.findMany({
    include: {
      tags: true
    },
    orderBy: { createdAt: "desc" }
  });

  const settings = await prisma.setting.findMany();
  const settingsMap: Record<string, string> = {};
  settings.forEach(s => {
    settingsMap[s.key] = s.value;
  });

  return <CampaignManager templates={templates} tags={tags} contacts={contacts} globalSettings={settingsMap} />;
}
