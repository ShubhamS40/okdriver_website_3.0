const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function activateUserApiSubscription() {
  const userId = '49ced1b2-5654-4b00-aafd-9e83309366fd';
  const planId = 14; // Your ApiPlan ID
  const now = new Date();
  
  // Plan duration (you can fetch it from DB)
  const plan = await prisma.apiPlan.findUnique({
    where: { id: planId },
  });
  
  if (!plan) {
    throw new Error('❌ Plan not found');
  }

  const startAt = now;
  const endAt = new Date();
  endAt.setDate(startAt.getDate() + ( 365));

  // Step 1: Find if user already has a subscription for this plan
  let existing = await prisma.userApiSubscription.findFirst({
    where: { userId, planId },
  });

  // Step 2: Update or Create
  let subscription;
  if (existing) {
    subscription = await prisma.userApiSubscription.update({
      where: { id: existing.id },
      data: {
        startAt,
        endAt,
        status: 'ACTIVE',
        paymentStatus: 'SUCCESS',
      },
    });
  } else {
    subscription = await prisma.userApiSubscription.create({
      data: {
        userId,
        planId,
        startAt,
        endAt,
        status: 'ACTIVE',
        paymentStatus: 'SUCCESS',
      },
    });
  }

  console.log('✅ Subscription active:', subscription);
}

activateUserApiSubscription()
  .catch(err => console.error('❌ Error:', err))
  .finally(() => prisma.$disconnect());
