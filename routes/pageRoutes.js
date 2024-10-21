import express from 'express';
import { TicketService } from '../src/service/TicketService.js';
import TicketPaymentService from '../src/thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../src/thirdparty/seatbooking/SeatReservationService.js';
import { orderHistory } from './apiRoutes.js';


const paymentService = new TicketPaymentService();
const reservationService = new SeatReservationService();
const ticketService = new TicketService(paymentService, reservationService);

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    logo: '/images/logo.png',
    title: 'Cinema Ticket Booking',
    tagline: 'Your next movie awaits!',
    message: 'Welcome to the Cinema Ticket Booking',
    messageClass: 'alert-success',
  });
});

// Display available tickets
router.get('/available-tickets', (req, res) => {
  const availableTickets = ticketService.getAvailableTickets();
  res.render('available-tickets', { availableTickets, title: 'Available Tickets' });
});

// Display order history
router.get('/order-history', (req, res) => {
  res.render('order-history', { orderHistory, title: 'Order History' });
});

export default router;