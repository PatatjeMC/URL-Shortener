"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { create } from "./actions";
import { FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";

export default function Page() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setLoading(true);

		const formData = new FormData(event.currentTarget);
		create(formData.get("url") as string).then((data) => {
			console.log(data);
			setLoading(false);
		});
	}

	return (
		<>
			<div className="flex justify-center items-center h-screen w-screen">
				<form onSubmit={onSubmit} className="w-[40%] flex h-14">
					<Input
						name="url"
						placeholder="Enter URL to shorten!"
						className="h-full rounded-r-none"
						disabled={loading}
					></Input>
					<Button variant={"default"} className="h-full rounded-l-none w-24">
						{!loading && "Shorten"}
						{loading && <Loader2 className="animate-spin"></Loader2>}
					</Button>
				</form>
			</div>
			{modalIsOpen && (
				<div className="bg-transparent/50 absolute h-full w-full top-0 left-0 flex justify-center items-center">
					<div>test</div>
				</div>
			)}
		</>
	);
}
