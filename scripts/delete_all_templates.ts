import { prisma } from '../src/lib/prisma';

async function main() {
  console.log("🗑️  Deleting ALL existing templates...");
  const result = await prisma.template.deleteMany({});
  console.log(`   Deleted ${result.count} templates.\n`);
  console.log("✅ Database is clean. Ready for fresh seed.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
