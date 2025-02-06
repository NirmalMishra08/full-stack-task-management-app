// POST /order: Place an order with selected menu items and
// quantities.
// ■ GET /orders: Fetch all orders of a logged-in user.

import express from 'express'
import { getOrders, placeOrder } from '../Controller/Order.controller';
import { authenticatedUser } from '../utils/Authentication';

const router = express.Router();

router.post('/order',authenticatedUser,placeOrder)
router.get('/orders', authenticatedUser, getOrders)

export default router;