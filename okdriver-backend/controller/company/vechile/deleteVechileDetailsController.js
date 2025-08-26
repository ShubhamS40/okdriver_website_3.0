const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Delete a vehicle
const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if vehicle exists
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: parseInt(id) },
    });

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Delete vehicle
    await prisma.vehicle.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { deleteVehicle };
