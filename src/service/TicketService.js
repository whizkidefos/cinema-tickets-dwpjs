export class TicketService {
  constructor(paymentService, reservationService) {
    this.paymentService = paymentService;
    this.reservationService = reservationService;
    this.availableTickets = {
      'ADULT': 100,
      'CHILD': 100,
      'INFANT': 100,
    }
  }

  getAvailableTickets() {
    return this.availableTickets;
  }

  purchaseTickets(accountId, ...ticketTypeRequests) {
    if (accountId <= 0) {
      throw new Error("Invalid account ID");
    }

    let totalTickets = 0;
    let totalPrice = 0;
    let adultTickets = 0;
    let childTickets = 0;
    let infantTickets = 0;

    ticketTypeRequests.forEach((request) => {
      totalTickets += request.quantity;
      switch (request.type) {
        case 'ADULT':
          adultTickets += request.quantity;
          totalPrice += request.quantity * 25;
          break;
        case 'CHILD':
          childTickets += request.quantity;
          totalPrice += request.quantity * 15;
          break;
        case 'INFANT':
          infantTickets += request.quantity;
          break;
        default:
          throw new Error("Unknown ticket type");
      }
    });

    if (totalTickets > 25) {
      throw new Error('Cannot purchase more than 25 tickets');
    }

    if (adultTickets === 0 && (childTickets > 0 || infantTickets > 0)) {
      throw new Error('Child and Infant tickets cannot be purchased without an Adult ticket');
    }

    if (totalTickets === 0) {
      throw new Error('Cannot purchase tickets with zero quantity');
    }
    
    ticketTypeRequests.forEach((request) => {
      if (this.availableTickets[request.type] < request.quantity) {
        throw new Error(`Not enough ${request.type} tickets available`);
      }
    });

    // Continue with payment and seat reservation...
    // Proceed with payment
    this.paymentService.makePayment(accountId, totalPrice);

    // Reserve seats
    const seatsToReserve = adultTickets + childTickets;
    this.reservationService.reserveSeat(accountId, seatsToReserve);
  }
}