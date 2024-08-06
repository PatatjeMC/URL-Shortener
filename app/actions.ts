"use server";

import { PrismaClient } from "@prisma/client";
import { randomInt } from "crypto";
import Sqids from "sqids";

const prisma = new PrismaClient();
const sqids = new Sqids({
    alphabet: 'pOYJGFiqugAHXIPjnmTMc8095e74dQNft2wUEZbxa1hBl6RkLKVCWsryz3voSD',
    minLength: 8,
});

export async function create(url: string) {
    const shortenedUrl = await prisma.url.create({
        data: {
            fullUrl: url,
            createdBy: "test", // Change this to IP addres later.
        },
    });

    const id = shortenedUrl.id;

    const shortUrl = sqids.encode([id, url.length])

    await prisma.url.update({
        where: {
            id,
        },
        data: {
            shortUrl,
        }
    })

    return shortUrl;
}
