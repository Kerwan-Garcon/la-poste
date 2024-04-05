"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { connectUser, createUser } from "@/actions/user-action";
import { useToast } from "../ui/use-toast";

function ConnexionForm() {
  const [isConnexion, setIsConnexion] = useState(true);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (isConnexion) {
      const isError = await connectUser(data.email, data.password);
      if (isError)
        toast({
          title: "Error",
          description: "Wrong email or password",
          variant: "destructive",
        });
      else {
        toast({
          title: "Success",
          description: "Connected",
        });
      }
    } else {
      const user = await createUser(data.email, data.password, data.username);

      if (user)
        toast({
          title: "Success",
          description: "User created, you can connect",
        });
      else
        toast({
          title: "Error",
          description: "User already exist",
          variant: "destructive",
        });
    }
  };

  return (
    <>
      <h2 className="text-2xl italic font-semibold">
        {isConnexion ? "Connexion" : "Inscription"}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 flex flex-col gap-2 w-1/2"
      >
        {!isConnexion && (
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              name="username"
              placeholder="name"
              {...register("username")}
            />
          </div>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            placeholder="email@domain.com"
            {...register("email")}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            placeholder="password"
            type="password"
            {...register("password")}
          />
        </div>
        <Button>Submit</Button>
      </form>

      <Button
        onClick={() => setIsConnexion(!isConnexion)}
        variant="outline"
        className="mt-8"
      >
        {isConnexion ? "S'inscrire" : "Se connecter "}
      </Button>
    </>
  );
}

export default ConnexionForm;
