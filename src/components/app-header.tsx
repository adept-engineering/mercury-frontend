"use client";
import { Bell, LogOut } from "lucide-react";
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
import { useCurrentSession } from "@/hooks/use-current-session";
import { logout } from "@/actions/logout";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function AppHeader() {
    const { session } = useCurrentSession();
    const { toast } = useToast();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    if (!session?.user) return null;

    const initials = session.user.name
        ?.split(' ')
        .map(word => word[0])
        .join('') || 'U';

    const handleLogout = async () => {
        if (isLoggingOut) return; // Prevent double clicks

        try {
            setIsLoggingOut(true);
            await logout();
            toast({
                title: "Logged out successfully",
                description: "You have been logged out of your account.",
                variant: "default",
            });
        } catch (error: any) {
            console.error("Logout error:", error);
            toast({
                title: "Logout failed",
                description: error.message || "Failed to log out. Please try again.",
                variant: "destructive",
            });
            setIsLoggingOut(false);
        }
    };

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
                            <div className="flex items-center justify-start gap-2 p-2">
                                <div className="flex flex-col space-y-1 leading-none">
                                    {session.user.name && (
                                        <p className="font-medium">{session.user.name}</p>
                                    )}
                                    {session.user.email && (
                                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                                            {session.user.email}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="text-red-600 focus:text-red-600"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                {isLoggingOut ? "Logging out..." : "Log out"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
