
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login")
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
      <h1>Hello World</h1>
    </div>
  );
}
