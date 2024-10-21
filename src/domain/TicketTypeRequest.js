export class TicketTypeRequest {
  constructor(type, quantity) {
    if (!['INFANT', 'CHILD', 'ADULT'].includes(type)) {
      throw new Error("Invalid ticket type");
    }
    if (quantity < 0) {
      throw new Error("Quantity cannot be negative");
    }

    this._type = type;
    this._quantity = quantity;
  }

  get type() {
    return this._type;
  }

  get quantity() {
    return this._quantity;
  }
}
