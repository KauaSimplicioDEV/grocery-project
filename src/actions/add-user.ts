"use server";

import { prisma } from "@/utils/prisma";
import { Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";

type UserData = {
  name: string;
  email: string;
  password: string;
};

export const addUsers = async (data: UserData) => {
  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(data.password, saltRounds);

  try {
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      user: newUser,
    };
  } catch (error) {
    console.error("Error creating user:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error("E-mail já cadastrado");
    }

    throw new Error("Failed to create user. Please try again.");
  }
};
