"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { getParcelById } from "@/actions/parcel-action";
import ParcelCard from "../parcels/ParcelCard";

function SearchTrackingForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [parcel, setParcel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const myParcel = await getParcelById(data.tracking);
    console.log(myParcel);
    setParcel(myParcel);
    setIsLoading(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 flex gap-2 justify-center items-center"
      >
        <div className="flex flex-col gap-2 w-full">
          <Label>Tracking number</Label>
          <Input placeholder="Tracking number" {...register("tracking")} />
        </div>

        <Button className="mt-4">Search</Button>
      </form>

      {isLoading ? <span>Searching Parcel...</span> : null}

      {parcel != null ? (
        <ParcelCard
          parcelName={parcel.parcelName}
          description={parcel.description}
          destination={parcel.destination}
          status={parcel.status}
          store={parcel.store}
        />
      ) : (
        <div>Search a parcel and it will show</div>
      )}
    </>
  );
}

export default SearchTrackingForm;
