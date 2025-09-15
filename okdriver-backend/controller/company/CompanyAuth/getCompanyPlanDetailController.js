const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const getCompanyPlan = async (req, res) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const companyId = decoded.id;

    // Get company details
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        currentPlan: true
      }
    });

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Get active subscription
    const activeSubscription = await prisma.companySubscription.findFirst({
      where: {
        companyId: companyId,
        status: 'ACTIVE',
        endAt: { gte: new Date() }
      },
      include: {
        plan: true
      }
    });

    // Get current vehicle count
    const vehicleCount = await prisma.vehicle.count({
      where: { companyId: companyId }
    });

    // Prepare response
    let response = {
      company: {
        id: company.id,
        name: company.name,
        email: company.email,
        phone: company.phone,
        address: company.address,
        createdAt: company.createdAt
      },
      hasActivePlan: !!activeSubscription,
      currentVehicleCount: vehicleCount
    };

    if (activeSubscription) {
      response.activePlan = {
        id: activeSubscription.plan.id,
        name: activeSubscription.plan.name,
        price: activeSubscription.plan.price,
        durationDays: activeSubscription.plan.durationDays,
        maxVehicles: activeSubscription.plan.vehicleLimit || 0,
        description: activeSubscription.plan.description,
        startDate: activeSubscription.startAt,
        endDate: activeSubscription.endAt,
        status: activeSubscription.status
      };
    } else {
      // If no active subscription, get available plans
      const availablePlans = await prisma.companyPlan.findMany({
        orderBy: { createdAt: 'desc' }
      });
      response.availablePlans = availablePlans;
    }

    res.json(response);

  } catch (error) {
    console.error('Error fetching company plan:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCompanyPlan };
