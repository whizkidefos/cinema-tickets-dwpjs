import { TicketService } from './src/service/TicketService.js';
import { TicketTypeRequest } from './src/domain/TicketTypeRequest.js';
import TicketPaymentService from './src/thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from './src/thirdparty/seatbooking/SeatReservationService.js';
import 'dotenv/config';

const paymentService = new TicketPaymentService();
const reservationService = new SeatReservationService();
const ticketService = new TicketService(paymentService, reservationService);

// Exprees & EJS Setup
import express from 'express';
import expressLayouts from 'express-ejs-layouts';

const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);

// Middleware
app.locals.year = new Date().getFullYear();

const formatDate = () => {
  const date = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

app.locals.currentDate = formatDate();

// Serve static files (CSS, images)
app.use(express.static('public'))

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    logo: '/images/logo.png',
    title: 'Cinema Ticket Booking',
    tagline: 'Your next movie awaits!',
    message: 'Welcome to the Cinema Ticket Booking',
    messageClass: 'alert-success',
  });
});

// Display available tickets
app.get('/available-tickets', (req, res) => {
  const availableTickets = ticketService.getAvailableTickets();
  res.render('available-tickets', { availableTickets, title: 'Available Tickets' });
});

// Handle tickets booking
const orderHistory = [];

app.post('/book', (req, res) => {
  const { adultQuantity, childQuantity, infantQuantity } = req.body;

  try {
    const adultCount = parseInt(adultQuantity, 10);
    const childCount = parseInt(childQuantity, 10);
    const infantCount = parseInt(infantQuantity, 10);

    // Business Rule: Check for at least one adult ticket if child/infant tickets are selected
    if ((childCount > 0 || infantCount > 0) && adultCount === 0) {
      throw new Error('You must purchase at least one Adult ticket with Child or Infant tickets.');
    }

    // Business Rule: Maximum of 25 tickets in total
    const totalTickets = adultCount + childCount + infantCount;
    if (totalTickets > 25) {
      throw new Error('You cannot purchase more than 25 tickets at a time.');
    }

    const requests = [];
    if (adultCount > 0) {
      requests.push(new TicketTypeRequest('ADULT', adultCount));
    }
    if (childCount > 0) {
      requests.push(new TicketTypeRequest('CHILD', childCount));
    }
    if (infantCount > 0) {
      requests.push(new TicketTypeRequest('INFANT', infantCount));
    }

    ticketService.purchaseTickets(1, ...requests);

    // Add to order history
    orderHistory.push({
      ticketType: `Adult: ${adultCount}, Child: ${childCount}, Infant: ${infantCount}`,
      quantity: totalTickets,
      price: (adultCount * 25) + (childCount * 15),
      date: new Date(),
    });

    res.render('index', {
      logo: '/images/logo.png',
      title: 'Cinema Ticket Booking - Booking Success',
      tagline: 'Your next movie awaits!',
      message: 'Your tickets have been successfully booked!',
      messageClass: 'alert-success',
    });
  } catch (error) {
    res.render('index', {
      logo: '/images/logo.png',
      title: 'Cinema Ticket Booking - Error Booking',
      tagline: 'Your next movie awaits!',
      message: `Error: ${error.message}`,
      messageClass: 'alert-error',
      adultQuantity,
      childQuantity,
      infantQuantity,
    });
  }
});


// Display order history
app.get('/order-history', (req, res) => {
  res.render('order-history', { orderHistory, title: 'Order History' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});