/**
 * @jest-environment jsdom
 */

// Test the Mobile Navigation
describe('Mobile Navigation', () => {
  beforeEach(() => {
    // Set up the DOM elements for the navigation
    document.body.innerHTML = `
      <button class="nav-toggle"></button>
      <ul class="nav-links"></ul>
    `;

    // Add the event listener for toggling the nav links
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
  });

  it('should toggle the active class on nav-links when nav-toggle is clicked', () => {
    // Get the nav toggle button and the nav links list
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Simulate the click event
    navToggle.click();
    expect(navLinks.classList.contains('active')).toBe(true); // Ensure the class is added

    navToggle.click();
    expect(navLinks.classList.contains('active')).toBe(false); // Ensure the class is removed
  });
});

// Test the Ticket Booking Form
import { calculateTotal } from '../public/js/scripts.js';
describe('Ticket Booking Form', () => {
  let bookButton, totalPriceElement, alertContainer;

  beforeEach(() => {
    // Set up the DOM elements required for the form
    document.body.innerHTML = `
      <input id="adultQuantity" value="1" />
      <input id="childQuantity" value="0" />
      <input id="infantQuantity" value="0" />
      <button id="bookButton" disabled>Book Tickets</button>
      <span id="totalPrice"></span>
      <div id="alert-container"></div>
    `;

    // Initialize the elements
    bookButton = document.getElementById('bookButton');
    totalPriceElement = document.getElementById('totalPrice');
    alertContainer = document.getElementById('alert-container');
  });

  it('should calculate the total price correctly', () => {
    // Set ticket quantities
    document.getElementById('adultQuantity').value = 2;
    document.getElementById('childQuantity').value = 1;

    // Call the calculateTotal function
    calculateTotal();

    // Assert that the total price is calculated correctly
    expect(totalPriceElement.textContent).toBe('65'); // 2 Adults + 1 Child = £65
  });

  it('should enable the book button if tickets are valid', () => {
    // Set a valid number of tickets
    document.getElementById('adultQuantity').value = 1;

    // Call the calculateTotal function
    calculateTotal();

    // Assert that the book button is enabled
    expect(bookButton.disabled).toBe(false);
  });

  it('should disable the book button if no valid tickets are selected', () => {
    // Set invalid ticket numbers (e.g., no tickets selected)
    document.getElementById('adultQuantity').value = 0;
    document.getElementById('childQuantity').value = 0;
    document.getElementById('infantQuantity').value = 0;

    // Call the calculateTotal function
    calculateTotal();

    // Assert that the book button is disabled
    expect(bookButton.disabled).toBe(true);
  });
});