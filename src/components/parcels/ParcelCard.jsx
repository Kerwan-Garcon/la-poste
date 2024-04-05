"use client";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { updateParcelStatus, updateParcelStock } from "@/actions/parcel-action";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

// Jamais faire son comp comme ça c'est pour aller vite hein
function ParcelCard(props) {
  console.log(props);
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

  const updateStock = async () => {
    const parcel = await updateParcelStock(stock, props.tracking);
    toast({ title: "Stock has been modified" });
  };

  return (
    <Card className={`p-4 ${props.isGrid ? "w-full" : "w-1/3"} mx-auto`}>
      <CardHeader>
        <h1>{props.parcelName}</h1>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div>
          Destination: <span> {props.destination}</span>
        </div>
        <div>
          Delivery status:<span> {props.status.name}</span>
        </div>
      </CardContent>

      {props.isGrid ? (
        <>
          <div className="flex flex-col">
            <Label>In Which location will it be stock ?</Label>
            <div className="flex gap-2">
              <Input
                className="mb-2"
                name="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
              <Button onClick={() => updateStock()}>Change Stock</Button>
            </div>
          </div>
          <div className="flex gap-2">
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
        </>
      ) : null}
    </Card>
  );
}

export default ParcelCard;
