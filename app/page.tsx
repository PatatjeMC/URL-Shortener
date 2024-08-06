import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
	return (
		<div className="flex justify-center items-center h-screen w-screen">
			<div className="w-[40%] flex h-14">
				<Input
					placeholder="Enter URL to shorten!"
					className="h-full rounded-r-none"
				></Input>
				<Button variant={"default"} className="h-full rounded-l-none">
					Shorten
				</Button>
			</div>
		</div>
	);
}
