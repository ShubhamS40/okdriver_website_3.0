const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const crypto = require('crypto');

// PayU configuration - these should be in environment variables in production
const PAYU_MERCHANT_KEY = 'gtKFFx'; // Test merchant key
const PAYU_SALT = 'eCwWELxi'; // Test salt
const PAYU_BASE_URL = 'https://test.payu.in/_payment'; // Test URL

// Generate transaction ID
const generateTransactionId = () => {
  return `OKDRIVER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

// Calculate PayU hash
const calculateHash = (data) => {
  const hashString = `${PAYU_MERCHANT_KEY}|${data.txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|||||||||||${PAYU_SALT}`;
  return crypto.createHash('sha512').update(hashString).digest('hex');
};

// Create a new payment order
exports.createPaymentOrder = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    if (!userId || !planId) {
      return res.status(400).json({
        success: false,
        message: 'User ID and Plan ID are required'
      });
    }

    // Get user and plan details
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    const plan = await prisma.apiPlan.findUnique({
      where: { id: planId }
    });

    if (!user || !plan) {
      return res.status(404).json({
        success: false,
        message: 'User or Plan not found'
      });
    }

    // Create transaction ID
    const txnid = generateTransactionId();

    // Create payment data
    const paymentData = {
      key: PAYU_MERCHANT_KEY,
      txnid: txnid,
      amount: plan.price.toString(),
      productinfo: plan.name,
      firstname: user.name || 'User',
      email: user.email,
      phone: user.phone || '',
      surl: `${req.protocol}://${req.get('host')}/api/user/payment/success`,
      furl: `${req.protocol}://${req.get('host')}/api/user/payment/failure`,
      udf1: userId,
      udf2: planId
    };

    // Calculate hash
    const hash = calculateHash(paymentData);

    // Create payment record in database
    const payment = await prisma.payment.create({
      data: {
        transactionId: txnid,
        userId: userId,
        planId: planId,
        amount: plan.price,
        status: 'PENDING',
        paymentMethod: 'PAYU'
      }
    });

    return res.status(200).json({
      success: true,
      data: {
        ...paymentData,
        hash: hash,
        paymentUrl: PAYU_BASE_URL
      }
    });
  } catch (error) {
    console.error('Create Payment Order Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during payment order creation'
    });
  }
};

// Handle payment success
exports.handlePaymentSuccess = async (req, res) => {
  try {
    const {
      txnid,
      status,
      mihpayid,
      amount,
      udf1: userId,
      udf2: planId
    } = req.body;

    // Verify payment status
    if (status !== 'success') {
      return res.redirect('/user/dashboard?payment=failed');
    }

    // Update payment record
    await prisma.payment.updateMany({
      where: { transactionId: txnid },
      data: {
        status: 'COMPLETED',
        paymentRef: mihpayid
      }
    });

    // Get plan details
    const plan = await prisma.apiPlan.findUnique({
      where: { id: planId }
    });

    if (!plan) {
      return res.redirect('/user/dashboard?payment=failed');
    }

    // Calculate expiry date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + plan.daysValidity);

    // Create or update subscription
    await prisma.userApiSubscription.create({
      data: {
        userId: userId,
        planId: planId,
        planName: plan.name,
        status: 'ACTIVE',
        startAt: new Date(),
        expiresAt: expiresAt,
        paymentRef: mihpayid,
        paymentStatus: 'COMPLETED',
        payuMihpayid: mihpayid,
        paymentAmount: parseFloat(amount)
      }
    });

    return res.redirect('/user/dashboard?payment=success');
  } catch (error) {
    console.error('Payment Success Handler Error:', error);
    return res.redirect('/user/dashboard?payment=failed');
  }
};

// Handle payment failure
exports.handlePaymentFailure = async (req, res) => {
  try {
    const { txnid, status, error_Message } = req.body;

    // Update payment record
    await prisma.payment.updateMany({
      where: { transactionId: txnid },
      data: {
        status: 'FAILED',
        failureReason: error_Message || 'Payment failed'
      }
    });

    return res.redirect('/user/dashboard?payment=failed');
  } catch (error) {
    console.error('Payment Failure Handler Error:', error);
    return res.redirect('/user/dashboard?payment=failed');
  }
};