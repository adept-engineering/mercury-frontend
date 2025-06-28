/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xy6MpYtkczL
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input"

export default function SearchInput({ value, onChange }: { value: string, onChange: (value: string) => void }) {
  return (
    <div className="flex w-full max-w-sm items-center h-10 border bg-white border-gray-300 rounded-lg px-2.5 py-1.5 ">
      <SearchIcon className="h-4 w-4 mr-2.5" />
      <Input type="search" placeholder="Search..." value={value} onChange={(e) => onChange(e.target.value)} className="w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
    </div>
  )
}

function SearchIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}