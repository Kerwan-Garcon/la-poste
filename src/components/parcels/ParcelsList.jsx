import { getAllParcels } from "@/actions/parcel-action";
import React from "react";
import ParcelCard from "./ParcelCard";
import { getStores } from "@/actions/store-action";

async function ParcelsList() {
  const parcels = await getAllParcels();
  const stores = await getStores();

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
          storeId={parcel.storeId}
          // faudrait créer un contexte plutot pour ça plutot que de passer de comp en comp
          stores={stores}
        />
      ))}
    </div>
  );
}

export default ParcelsList;
