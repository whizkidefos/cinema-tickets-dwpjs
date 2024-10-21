import { TicketTypeRequest } from '../src/domain/TicketTypeRequest.js';

test('should create a valid ticket request', () => {
  const request = new TicketTypeRequest('ADULT', 2);
  expect(request.type).toBe('ADULT');
  expect(request.quantity).toBe(2);
});

test('should throw an error for invalid ticket type', () => {
  expect(() => new TicketTypeRequest('SENIOR', 1)).toThrow('Invalid ticket type');
});

test('should throw an error for negative quantity', () => {
  expect(() => new TicketTypeRequest('ADULT', -1)).toThrow('Quantity cannot be negative');
});