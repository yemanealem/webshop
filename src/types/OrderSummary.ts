export type OrderSummary = {
  orderId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingCity: string;
  shippingCountry: string;
  id: number; 
  items: { productId: number; quantity: number; productName?: string; price?: number }[]; 

};
