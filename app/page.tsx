"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { create } from "./actions";
import { FormEvent, useState } from "react";

export default function Page() {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	return (
		<>
			<div className="flex justify-center items-center h-screen w-screen">
				<form onSubmit={onSubmit} className="w-[40%] flex h-14">
					<Input
						name="url"
						placeholder="Enter URL to shorten!"
						className="h-full rounded-r-none"
					></Input>
					<Button variant={"default"} className="h-full rounded-l-none">
						Shorten
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

function onSubmit(event: FormEvent<HTMLFormElement>) {
	event.preventDefault();

	const formData = new FormData(event.currentTarget);
	create(formData.get("url") as string).then((data) => {
		console.log(data);
	});
}
