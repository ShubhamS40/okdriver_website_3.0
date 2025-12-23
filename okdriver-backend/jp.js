const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createDriverSubscription() {
  try {
    const driverId = "0c583eab-769b-4ae4-8126-e96fba4c63a7";
    const planId = 11;

    // Fetch the plan to get durationDays
    const plan = await prisma.driverPlan.findUnique({
      where: { id: planId }
    });

    if (!plan) {
      console.log("❌ Plan not found");
      return;
    }

    // Calculate end date
    const startAt = new Date();
    const endAt = new Date();
    endAt.setDate(startAt.getDate() + plan.durationDays);

    // Create subscription
    const subscription = await prisma.driverSubscription.create({
      data: {
        driverId,
        planId,
        startAt,
        endAt,
        status: "ACTIVE"
      }
    });

    console.log("✔ Subscription Created:", subscription);
  } catch (error) {
    console.error("❌ Error creating subscription:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createDriverSubscription();
