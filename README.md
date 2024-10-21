# Cinema Booking

> **Brief Project Description**  
> A web application for purchasing cinema tickets with real-time ticket price calculation and mobile-friendly navigation. Users can select different ticket types (Adult, Child, Infant), and the system calculates the total while ensuring business rules are followed.
> Example:

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Mobile-friendly navigation with a toggle button.
- Real-time ticket price calculation based on ticket type and quantity.
- Error validation for ticket selection (e.g., no Child or Infant tickets without Adult tickets, max 25 tickets).
- Uses JavaScript, Express, EJS, and Bootstrap for responsive UI.

---

## Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: EJS, Sass, HTML5, JavaScript
- **Testing**: Jest
- **Others**: Git, npm

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/whizkidefos/cinema-tickets-dwpjs.git
```

2. Navigate to the project directory:

```bash
cd cinema-tickets-dwpjs
```

3. Install the necessary dependencies:

```bash
npm install
```

4. Set up environment variables:

   Create a `.env` file in the root directory and include any necessary environment variables (e.g., API keys, database URLs).

---

## Usage

1. Start the development server (to watch for changes and compile sass):

```bash
npm run dev
```

2. Open your browser and navigate to:

```
http://localhost:5000
```

3. You can now interact with the ticket booking system by selecting different ticket types and quantities.

---

## Testing

To run the unit tests for the project, including mobile navigation and the ticket price calculation:

```bash
npm test
```

- **Mobile Navigation Test**: Verifies that the navigation works correctly.
- **Ticket Calculation Test**: Ensures that the total price calculation adheres to the business rules.
- **TicketService Test**: Ensures that the TicketService class processes ticket purchases according to the business rules. This includes verifying that the correct payment amounts are calculated, the seat reservations are made based on the ticket types and quantities, and that invalid requests (e.g., exceeding ticket limits, missing adult tickets) are rejected.
- **TicketTypeRequest Test**: Validates that the TicketTypeRequest class correctly handles immutable ticket requests, ensuring that the correct ticket types (Adult, Child, Infant) are created and that the business rules for ticket type constraints are properly enforced (e.g., preventing modifications to the request object after it's created).

---

## Folder Structure

Here’s a quick overview of the project's folder structure:

```
/project-root
  ├── /public             # Static assets (CSS, JS, images)
  ├── /routes             # Express routes
  ├── /src                # Source files (business logic, services)
  ├── /test               # Unit tests for the project
  ├── /views              # EJS templates for the UI
  ├── app.js              # Main application file
  ├── package.json        # Project metadata and dependencies
  └── README.md           # Project documentation
```

---

## Contributing

Contributions are currently closed!:

---

## License

This project is licensed under the [MIT License](LICENSE).

---
