"use server";

import { cookies } from "next/headers";
import prisma from "../../prisma/db";
import { redirect } from "next/navigation";

const cookieStore = cookies();

export const createUser = async (email, password, username) => {
  const user = await prisma.user.create({
    data: {
      email,
      password,
      username,
      isAdmin: true,
    },
  });

  return user;
};

export const connectUser = async (email, password) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
      password,
    },
  });

  if (!user) return true;

  cookieStore.set("userId", user.id);

  if (user.isAdmin) redirect("/dashboard");
  else redirect("/tracking");
};

export const getUserInformations = async () => {
  const userId = cookieStore.get("userId").value;

  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
    select: {
      email: true,
      username: true,
      isAdmin: true,
    },
  });

  return user;
};
