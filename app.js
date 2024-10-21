import { TicketService } from './src/service/TicketService.js';
import { TicketTypeRequest } from './src/domain/TicketTypeRequest.js';
import TicketPaymentService from './src/thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from './src/thirdparty/seatbooking/SeatReservationService.js';
import 'dotenv/config';

import pageRoutes from './routes/pageRoutes.js';
import apiRoutes from './routes/apiRoutes.js';

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
app.use('/', pageRoutes);
app.use('/available-tickets', pageRoutes);
app.use('/order-history', pageRoutes);
app.use('/', apiRoutes);

// Handle tickets booking
app

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});