"use server";

import { PrismaClient } from "@prisma/client";
import Sqids from "sqids";

const prisma = new PrismaClient();
const sqids = new Sqids();

export async function create(url: string) {
    const shortenedUrl = await prisma.url.create({
        data: {
            fullUrl: url,
            id: sqids.encode([1, 2, 3]),
            createdBy: "test", // Change this to IP addres later.
        },
    });

    return shortenedUrl;
}
