import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import 'dotenv/config';
import pageRoutes from './routes/pageRoutes.js';
import apiRoutes from './routes/apiRoutes.js';


// Exprees & EJS Setup
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});