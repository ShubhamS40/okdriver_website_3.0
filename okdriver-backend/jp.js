const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixNullDaysValidity() {
  try {
    const result = await prisma.$executeRawUnsafe(`
      UPDATE "ApiPlan"
      SET "daysValidity" = 30
      WHERE "daysValidity" IS NULL;
    `);

    console.log(`✅ Fixed ${result} record(s) where daysValidity was NULL.`);
  } catch (error) {
    console.error("❌ Error while updating records:", error);
  } finally {
    await prisma.$disconnect();
  }
}

fixNullDaysValidity();
