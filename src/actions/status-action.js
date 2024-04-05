"use server";

import { cookies } from "next/headers";
import prisma from "../../prisma/db";
import { redirect } from "next/navigation";

export const createAllStatus = async () => {
  const status = await prisma.deliveryStatus.createMany({
    data: [{ name: "Pending" }, { name: "In transit" }, { name: "Delivered" }],
  });

  return status;
};
