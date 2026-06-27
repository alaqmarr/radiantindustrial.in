import { prisma } from "@/lib/prisma";
import ContactManager from "./ContactManager";

export default async function ListsPage() {
  const contacts = await prisma.contact.findMany({
    include: {
      tags: {
        include: {
          tag: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  const tags = await prisma.tag.findMany();

  return <ContactManager contacts={contacts} allTags={tags} />;
}
