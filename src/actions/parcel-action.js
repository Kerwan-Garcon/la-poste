"use server";

import { generateUuid } from "@/utils/generateUUid";
import prisma from "../../prisma/db";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const cookieStore = cookies();

export const createParcel = async (parcelName, destination, description) => {
  const parcel = await prisma.parcel.create({
    data: {
      parcelName,
      destination,
      description,
      ownerId: parseInt(cookieStore.get("userId").value),
      trackingNumber: generateUuid(),
      statusId: 1,
    },
  });

  revalidatePath("/tracking");

  return parcel;
};

export const getUserParcels = async () => {
  const userId = cookieStore.get("userId").value;

  if (!userId) return null;

  const parcels = await prisma.parcel.findMany({
    where: {
      ownerId: parseInt(userId),
    },
    include: {
      status: true,
    },
  });

  return parcels;
};

export const getParcelById = async (tracking) => {
  const parcel = await prisma.parcel.findFirst({
    where: {
      trackingNumber: tracking,
    },
    include: {
      status: true,
    },
  });

  return parcel;
};

export const getAllParcels = async () => {
  const parcels = await prisma.parcel.findMany({
    include: {
      status: true,
    },
    orderBy: {
      trackingNumber: "asc",
    },
  });

  return parcels;
};

export const updateParcelStatus = async (id, number) => {
  const parcels = await prisma.parcel.update({
    where: {
      trackingNumber: number,
    },
    data: {
      statusId: id,
      trackingNumber: number,
    },
  });

  revalidatePath("/dashboard");

  return parcels;
};

export const updateParcelStock = async (stock, number) => {
  const parcel = await prisma.parcel.update({
    where: {
      trackingNumber: number,
    },
    data: {
      storeId: stock,
    },
  });

  revalidatePath("/dashboard");

  return parcel;
};

export const updateParcelStore = async (store, number) => {
  const parcel = await prisma.parcel.update({
    where: {
      trackingNumber: number,
    },
    data: {
      storeId: store,
    },
  });

  revalidatePath("/dashboard");

  return parcel;
};
