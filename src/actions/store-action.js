"use server";

import { generateUuid } from "@/utils/generateUUid";
import prisma from "../../prisma/db";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const cookieStore = cookies();

export const createStores = async () => {
  const store = await prisma.store.createMany({
    data: [
      { name: "Amazon", location: "USA" },
      { name: "Ebay", location: "USA" },
      { name: "Walmart", location: "USA" },
      { name: "Aliexpress", location: "China" },
      { name: "Bestbuy", location: "USA" },
    ],
  });

  return store;
};

export const getStores = async () => {
  const stores = await prisma.store.findMany();

  return stores;
};
