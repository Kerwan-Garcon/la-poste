import { getAllParcels } from "@/actions/parcel-action";
import React from "react";
import { Card } from "../ui/card";
import ParcelCard from "./ParcelCard";

async function ParcelsList() {
  const parcels = await getAllParcels();

  return (
    <div className="grid grid-cols-3 gap-2 w-full">
      {parcels.map((parcel, key) => (
        <ParcelCard
          isGrid
          key={key}
          parcelName={parcel.parcelName}
          description={parcel.description}
          destination={parcel.destination}
          status={parcel.status}
          tracking={parcel.trackingNumber}
          stock={parcel.locationStock}
        />
      ))}
    </div>
  );
}

export default ParcelsList;
