import { getUserParcels } from "@/actions/parcel-action";
import { getUserInformations } from "@/actions/user-action";
import AddParcelForm from "@/components/forms/AddParcelForm";
import SearchTrackingForm from "@/components/forms/SearchTrackingForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";

async function TrackingPage() {
  const user = await getUserInformations();
  const parcels = await getUserParcels();

  return (
    <main className="w-full flex gap-2">
      <aside className="p-4 w-1/5 h-screen flex flex-col bg-slate-400/20">
        <h1 className="mb-2 text-center">My trackings number</h1>
        <AddParcelForm />
        <div className="flex flex-col gap-2 mt-4">
          {parcels.map((parcel) => (
            <Card key={parcel.id} className="w-full p-4" variant="secondary">
              {parcel.parcelName} : {"   "}
              <span className="italic font-semibold">
                {" "}
                {parcel.trackingNumber}
              </span>
            </Card>
          ))}
        </div>
      </aside>
      <div className="p-8 w-4/5 mx-auto flex flex-col items-center gap-12">
        <h1 className="text-6xl  italic font-semibold ">
          Hello {user.username}{" "}
        </h1>

        <SearchTrackingForm />
      </div>
    </main>
  );
}

export default TrackingPage;
