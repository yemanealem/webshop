import React, { useState } from "react";
import type { Column } from "../components/Table";
import Table from "../components/Table";
import type { Order } from "../types/Order"; 

export default function OrdersPage() {
  const [orders] = useState<Order[]>([
    { id: 1, productName: "Laptop", customerName: "John Doe", quantity: 2 },
    { id: 2, productName: "Phone", customerName: "Sarah Smith", quantity: 1 },
  ]);

  const columns: Column<Order>[] = [
    { header: "ID", accessor: "id" },
    { header: "Product Name", accessor: "productName" },
    { header: "Customer Name", accessor: "customerName" },
    { header: "Quantity", accessor: "quantity" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Orders</h1>
      <Table<Order> data={orders} columns={columns} />
    </div>
  );
}
