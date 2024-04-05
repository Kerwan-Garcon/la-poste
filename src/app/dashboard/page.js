import ParcelsList from "@/components/parcels/ParcelsList";
import React from "react";

async function DashboardPage() {
  return (
    <main className="p-8">
      <h1>Parcels List</h1>

      <ParcelsList />
    </main>
  );
}

export default DashboardPage;
