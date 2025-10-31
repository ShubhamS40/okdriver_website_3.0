const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const deleteApiPlan = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) return res.status(400).json({ ok: false, error: 'invalid id' });

    await prisma.apiPlan.delete({ where: { id: Number(id) } });
    res.json({ ok: true });
  } catch (err) {
    console.error('deleteApiPlan error:', err);
    res.status(500).json({ ok: false, error: 'internal' });
  }
};

module.exports = { deleteApiPlan };


