const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Create a new DriverPlan
 */
const createDriverPlan = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      billingCycle,
      durationDays,
      benefits,
      features,
      storageLimitGB,
      services // array of service IDs to associate
    } = req.body;

    // Basic validations
    if (!name || !price || !billingCycle || !durationDays || !storageLimitGB) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create DriverPlan
    const driverPlan = await prisma.driverPlan.create({
      data: {
        name,
        description,
        price,
        billingCycle,
        durationDays,
        benefits: benefits || [],
        features: features || [],
        storageLimitGB,
        services: services && services.length > 0
          ? {
              connect: services.map(id => ({ id }))
            }
          : undefined
      },
      include: {
        services: true
      }
    });

    return res.status(201).json({ message: "Driver Plan created successfully", data: driverPlan });

  } catch (error) {
    console.error("Error creating driver plan:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createDriverPlan };
