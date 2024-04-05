"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { createParcel } from "@/actions/parcel-action";
import { createAllStatus } from "@/actions/status-action";
import AddressSearch from "../search/AddressSearch";

function AddParcelForm() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [destination, setDestination] = useState();

  const onSubmit = async (data) => {
    const parcel = await createParcel(
      data.parcelName,
      destination,
      data.description
    );
    if (parcel)
      toast({
        title: "Success",
        description: "Parcel added",
      });
    else
      toast({
        title: "Error",
        description: "Parcel already exist || Error while adding parcel",
        variant: "destructive",
      });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Didnt have a Parcel yet ? Add one !</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add parcel</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 flex flex-col gap-2 w-full"
        >
          <Label>Parcel Name</Label>
          <Input
            placeholder="parcelName"
            {...register("parcelName", { required: true })}
          />

          <Label>Destination</Label>
          <AddressSearch value={destination} setValue={setDestination} />
          {/* <Input
            placeholder="Destination"
            {...register("destination", { required: true })}
          /> */}

          <Label>Description</Label>
          <Textarea
            placeholder="Mes informations de livraison"
            {...register("description")}
          ></Textarea>

          <DialogClose asChild>
            <Button type="submit">Add parcel</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddParcelForm;
