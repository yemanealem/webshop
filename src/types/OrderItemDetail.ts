export interface OrderItemResponseDTO {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface OrderResponseDTO {
  orderId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPostal: string;
  shippingCountry: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
  items: OrderItemResponseDTO[];
}
