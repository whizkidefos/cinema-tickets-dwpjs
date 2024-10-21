// Mobile Navigation
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
  }
});

// Ticket Booking Form
const ticketForm = document.getElementById('ticketForm');
const alertContainer = document.getElementById('alert-container');

export function calculateTotal() {
    const adultQuantity = parseInt(document.getElementById('adultQuantity').value, 10) || 0;
    const childQuantity = parseInt(document.getElementById('childQuantity').value, 10) || 0;
    const infantQuantity = parseInt(document.getElementById('infantQuantity').value, 10) || 0;

    const totalTickets = adultQuantity + childQuantity + infantQuantity;
    const totalPrice = (adultQuantity * 25) + (childQuantity * 15);

    // Get the total price element and update its content
    const totalPriceElement = document.getElementById('totalPrice');
    if (totalPriceElement) {
        totalPriceElement.textContent = totalPrice;
    } else {
        console.error('Total price element not found');
    }

    // Enable the 'Book Tickets' button only if at least one ticket is selected and below the limit
    const bookButton = document.getElementById('bookButton');
    if (bookButton) {
    bookButton.disabled = totalTickets === 0 || totalTickets > 25;
    } else {
    console.error('Book button not found');
    }

    // Client-side validation: Check for child/infant ticket without adult
    if ((childQuantity > 0 || infantQuantity > 0) && adultQuantity === 0) {
        showError('You must purchase at least one Adult ticket with Child or Infant tickets.');
        return;
    }

    // Client-side validation: Check for tickets limit
    if (totalTickets > 25) {
        showError('You cannot purchase more than 25 tickets in total.');
    } else {
        hideError();
    }
}

// Function to display error or success messages in the alert box
function showError(message) {
    let alertBox = document.querySelector('.alert-error');

    if (!alertBox) {
        alertBox = document.createElement('div');
        alertBox.className = 'alert alert-error';
        alertContainer.appendChild(alertBox);
    }

    alertBox.textContent = message;
    alertBox.style.display = 'block';
}

// Function to hide error messages
function hideError() {
    const alertBox = document.querySelector('.alert-error');
    if (alertBox) {
        alertBox.style.display = 'none';
    }
}

// Add client-side validation for child/infant ticket without adult
document.addEventListener('DOMContentLoaded', () => {
    ticketForm.addEventListener('submit', function (event) {
    const adultQuantity = parseInt(document.getElementById('adultQuantity').value, 10) || 0;
    const childQuantity = parseInt(document.getElementById('childQuantity').value, 10) || 0;
    const infantQuantity = parseInt(document.getElementById('infantQuantity').value, 10) || 0;
    const totalTickets = adultQuantity + childQuantity + infantQuantity;

    // Check if child/infant tickets are selected without adult
    if ((childQuantity > 0 || infantQuantity > 0) && adultQuantity === 0) {
        event.preventDefault();
        showError('You must purchase at least one Adult ticket with Child or Infant tickets.');
    }
    // Check if the total tickets exceeds 25
    else if (totalTickets > 25) {
        event.preventDefault();
        showError('You cannot purchase more than 25 tickets in total.');
    } else {
        hideError();
    }
    });

    // Listen for input changes to recalculate the total and enable/disable the button
    document.getElementById('adultQuantity').addEventListener('input', calculateTotal);
    document.getElementById('childQuantity').addEventListener('input', calculateTotal);
    document.getElementById('infantQuantity').addEventListener('input', calculateTotal);

    calculateTotal();
});