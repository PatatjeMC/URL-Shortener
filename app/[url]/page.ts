import { notFound, redirect } from "next/navigation";
import { get } from "@/app/actions";

export default async function Page({ params }: { params: { url: string } }) {
    const data = await get(params.url)

    if (!data) {
        return notFound()
    }

    redirect(data.fullUrl)
}