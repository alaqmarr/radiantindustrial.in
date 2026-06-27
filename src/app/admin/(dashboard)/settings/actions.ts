"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveSettings(settings: Record<string, string>) {
  try {
    for (const [key, value] of Object.entries(settings)) {
      await prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      });
    }
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("Failed to save settings:", error);
    return { error: "Failed to save settings." };
  }
}
