import { prisma } from '../src/lib/prisma';

async function main() {
  const templates = await prisma.template.findMany({
    select: { id: true, name: true, type: true, subject: true }
  });
  console.log("=== ALL TEMPLATES ===");
  templates.forEach((t, i) => {
    console.log(`${i + 1}. [${t.type}] "${t.name}" — Subject: "${t.subject}"`);
    console.log(`   ID: ${t.id}`);
  });
  console.log(`\nTotal: ${templates.length} templates`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
