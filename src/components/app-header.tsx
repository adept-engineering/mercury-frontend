import { Bell } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/auth";

export default async function AppHeader() {
    const session = await auth()
    if (!session?.user) return null

    const initials = session.user.name
        ?.split(' ')
        .map(word => word[0])
        .join('') || 'U'

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-3 fixed top-0 inset-x-0 z-50">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <Image
                        src="/nav-logo.svg"
                        alt="Mercury"
                        width={105}
                        height={60}
                        className="h-12 w-auto"
                    />
                </div>

                {/* Right Side Icons */}
                <div className="flex items-center space-x-2">
                    {/* Notifications */}
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-12 w-12 text-gray-500" />
                    </Button>

                    {/* Profile Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuItem>
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
