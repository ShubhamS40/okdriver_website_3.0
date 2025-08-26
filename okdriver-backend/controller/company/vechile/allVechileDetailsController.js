const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Get all vehicles
const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany();

    return res.status(200).json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAllVehicles };
