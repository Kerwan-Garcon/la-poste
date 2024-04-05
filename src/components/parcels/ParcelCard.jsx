"use client";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { updateParcelStatus, updateParcelStock } from "@/actions/parcel-action";
import { useToast } from "../ui/use-toast";
import { Label } from "../ui/label";
import StoreSelect from "../store/StoreSelect";

// Jamais faire son comp comme ça c'est pour aller vite hein
function ParcelCard(props) {
  const { toast } = useToast();
  const [stock, setStock] = useState(props.stock || "");
  const changePending = async () => {
    const boolean = await updateParcelStatus(1, props.tracking);

    toast({ title: "Parcel is now pending" });
  };

  const changeTransit = async () => {
    const boolean = await updateParcelStatus(2, props.tracking);
    toast({ title: "Parcel is now Transit" });
  };

  const changeDelivered = async () => {
    const boolean = await updateParcelStatus(3, props.tracking);
    toast({ title: "Parcel is now Delivered" });
  };

  const updateStock = () => {
    updateParcelStock(stock, props.tracking);
    toast({ title: "Stock has been modified" });
  };

  return (
    <Card className={`p-4 ${props.isGrid ? "w-full" : "w-1/3"} mx-auto`}>
      <CardHeader>
        <h1>{props.parcelName}</h1>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col ">
        <div>
          Destination: <span> {props.destination}</span>
        </div>
        <div>
          Delivery status:<span> {props.status.name}</span>
        </div>
        {props.store ? (
          <div>
            Store: <span> {props.store}</span>
          </div>
        ) : (
          "Votre Colis n'est pas en stock actuellement"
        )}
      </CardContent>

      {props.isGrid ? (
        <div className="">
          <div className="flex flex-col ">
            <Label className="mb-1">In Which location will it be stock ?</Label>
            <div className="flex gap-2">
              <StoreSelect
                onChange={setStock}
                stores={props.stores}
                currentValue={props.storeId}
              />
              <Button onClick={() => updateStock()}>Change Stock</Button>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <Button onClick={() => changePending()} className="w-1/3">
              Pending
            </Button>
            <Button onClick={() => changeTransit()} className="w-1/3">
              In Transit
            </Button>
            <Button onClick={() => changeDelivered()} className="w-1/3">
              Delivered
            </Button>
          </div>
        </div>
      ) : null}
    </Card>
  );
}

export default ParcelCard;
