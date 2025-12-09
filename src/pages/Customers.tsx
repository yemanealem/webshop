import React, { useState } from "react";
import type { Column } from "../components/Table";
import Table from "../components/Table";
import type { Customer } from "../types/Customer";



export default function CustomersPage() {
  const [customers] = useState<Customer[]>([
  { id: 1, name: "John Doe", email: "john@mail.com", phone: "123456" },
  { id: 2, name: "Sarah Smith", email: "sarah@mail.com", phone: "987654" },
]);


  const columns: Column<Customer>[] = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Customers</h1>
      <Table<Customer> data={customers} columns={columns} />
    </div>
  );
}
