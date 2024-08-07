"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { create } from "./actions";
import { FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { z } from "zod";

export default function Page() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [shortUrl, setShortUrl] = useState<string | null>(null);

	const hostname = `${window.location.protocol}//${window.location.hostname}${
		window.location.port && ":" + window.location.port
	}`;

	function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setLoading(true);
		setError(null);

		const formData = new FormData(event.currentTarget);

		let urlObject = z
			.string()
			.regex(/(^$|(http(s)?:\/\/)?([\w-]+\.)+[\w-]+([\w- ;,.\/?%&=]*))/)
			.safeParse(formData.get("url"));

		if (!urlObject.success) {
			setError("The provided URL is not a valid URL.");
			return setLoading(false);
		}

		let url = urlObject.data;

		if (!url.startsWith("https://") && !url.startsWith("http://")) {
			url = "https://" + url;
		}

		create(url).then((data) => {
			setLoading(false);

			//TODO: Check if error occured and return error

			const fullUrl = hostname + "/" + data;
			setShortUrl(fullUrl);
		});
	}

	return (
		<>
			<div className="flex justify-center items-center h-screen w-screen">
				<form onSubmit={onSubmit} className="w-[40vw] flex h-14">
					<p className="absolute translate-y-[-24px] text-destructive">
						{error}
					</p>
					<Input
						name="url"
						placeholder="Enter URL to shorten!"
						className={cn(
							"h-full rounded-r-none",
							error && "border-destructive border-r-0"
						)}
						disabled={loading}
					></Input>
					<Button variant="default" className="h-full rounded-l-none w-24">
						{!loading && "Shorten"}
						{loading && <Loader2 className="animate-spin"></Loader2>}
					</Button>
				</form>
			</div>
			{modalIsOpen && (
				<div className="bg-transparent/50 absolute h-full w-full top-0 left-0 flex justify-center items-center">
					<Card>
						<CardHeader></CardHeader>
						<CardContent></CardContent>
						<CardFooter></CardFooter>
					</Card>
				</div>
			)}
		</>
	);
}
