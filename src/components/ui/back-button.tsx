"use client"
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export function BackButton() {
    const router = useRouter();

    return (
        <Button
            variant="link"
            size="sm"
            className="gap-2 p-0!"
            onClick={() => router.back()}
        >
            <ArrowLeft className="h-4 w-4" />
            Back
        </Button>
    );
} 