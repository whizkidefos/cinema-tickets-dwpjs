import { TicketService } from '../src/service/TicketService.js';
import { TicketTypeRequest } from '../src/domain/TicketTypeRequest.js';

// Mocking external services
class MockPaymentService {
  makePayment(accountId, amount) {
    if (amount <= 0) {
      throw new Error('Invalid payment amount');
    }
    this.accountId = accountId;
    this.amount = amount;
  }
}

class MockSeatReservationService {
  reserveSeat(accountId, seatCount) {
    if (seatCount <= 0) {
      throw new Error('Invalid seat count');
    }
    this.accountId = accountId;
    this.seatCount = seatCount;
  }
}

describe('TicketService', () => {
  let paymentService;
  let reservationService;
  let ticketService;

  beforeEach(() => {
    paymentService = new MockPaymentService();
    reservationService = new MockSeatReservationService();
    ticketService = new TicketService(paymentService, reservationService);
  });

  test('should throw an error if no adult ticket is purchased with child or infant tickets', () => {
    const requestChild = new TicketTypeRequest('CHILD', 2);
    const requestInfant = new TicketTypeRequest('INFANT', 1);

    expect(() => {
      ticketService.purchaseTickets(1, requestChild, requestInfant);
    }).toThrow('Child and Infant tickets cannot be purchased without an Adult ticket');
  });

  test('should successfully process tickets with correct seat reservation and payment', () => {
    const requestAdult = new TicketTypeRequest('ADULT', 2);
    const requestChild = new TicketTypeRequest('CHILD', 1);
    const requestInfant = new TicketTypeRequest('INFANT', 1);

    ticketService.purchaseTickets(1, requestAdult, requestChild, requestInfant);

    expect(paymentService.amount).toBe(65); // 2 Adult * 25 + 1 Child * 15
    expect(reservationService.seatCount).toBe(3); // 2 Adult + 1 Child (Infant doesn't count for seats)
  });

  test('should throw an error if more than 25 tickets are purchased', () => {
    const requestAdult = new TicketTypeRequest('ADULT', 26);

    expect(() => {
      ticketService.purchaseTickets(1, requestAdult);
    }).toThrow('Cannot purchase more than 25 tickets');
  });

  test('should throw an error for invalid account ID', () => {
    const requestAdult = new TicketTypeRequest('ADULT', 1);

    expect(() => {
      ticketService.purchaseTickets(0, requestAdult);
    }).toThrow('Invalid account ID');
  });

  test('should successfully process a purchase with only adult tickets', () => {
    const requestAdult = new TicketTypeRequest('ADULT', 2);

    ticketService.purchaseTickets(1, requestAdult);

    expect(paymentService.amount).toBe(50); // 2 Adult tickets * 25
    expect(reservationService.seatCount).toBe(2); // 2 Adult seats
  });

  test('should handle an edge case where exactly 25 tickets are purchased', () => {
    const requestAdult = new TicketTypeRequest('ADULT', 20);
    const requestChild = new TicketTypeRequest('CHILD', 5);

    ticketService.purchaseTickets(1, requestAdult, requestChild);

    expect(paymentService.amount).toBe(575); // 20 Adult * 25 + 5 Child * 15
    expect(reservationService.seatCount).toBe(25); // 20 Adult + 5 Child
  });

  test('should throw an error when invalid ticket type is requested', () => {
    expect(() => {
      new TicketTypeRequest('SENIOR', 1);
    }).toThrow('Invalid ticket type');
  });

  test('should throw an error when negative quantity is requested', () => {
    expect(() => {
      new TicketTypeRequest('ADULT', -1);
    }).toThrow('Quantity cannot be negative');
  });

  test('should throw an error when zero tickets are requested', () => {
    const requestAdult = new TicketTypeRequest('ADULT', 0);
  
    expect(() => {
      ticketService.purchaseTickets(1, requestAdult);
    }).toThrow('Cannot purchase tickets with zero quantity');
  });

  test('should throw an error when payment amount is invalid', () => {
    paymentService.makePayment = function () {
      throw new Error('Invalid payment amount');
    };
  
    const requestAdult = new TicketTypeRequest('ADULT', 1);
  
    expect(() => {
      ticketService.purchaseTickets(1, requestAdult);
    }).toThrow('Invalid payment amount');
  });
  
  test('should throw an error when seat reservation count is invalid', () => {
    reservationService.reserveSeat = function () {
      throw new Error('Invalid seat count');
    };
  
    const requestAdult = new TicketTypeRequest('ADULT', 1);
  
    expect(() => {
      ticketService.purchaseTickets(1, requestAdult);
    }).toThrow('Invalid seat count');
  });
});