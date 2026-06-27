import { prisma } from "@/lib/prisma";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
  const settingsData = await prisma.setting.findMany();
  
  // Convert array of {key, value} to an object
  const initialSettings = settingsData.reduce((acc: Record<string, string>, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {});

  return <SettingsForm initialSettings={initialSettings} />;
}
