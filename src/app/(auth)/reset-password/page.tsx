/* eslint-disable @next/next/no-img-element */
import AuthForm from "@/components/auth-form";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function ResetPasswordPage({ searchParams }: { searchParams: { token: string } }) {
    const token = await searchParams.token;
    if (!token) {
        return <div>Invalid token</div>;
    }
    return (
        <section className="grid grid-cols-2 max-lg:grid-cols-1 bg-background h-screen overflow-hidden">
            {/* Left side - Colorful wave background */}
            <div className="h-screen overflow-hidden max-lg:hidden relative">
                <img
                    src="/login.svg"
                    alt="Colorful wave background"
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Right side - Login form */}
            <main className="flex flex-col items-center justify-center px-8 max-lg:px-6 max-lg:py-8 bg-white">

                {/* Form container */}
                <div className="w-full max-w-sm space-y-6">
                    {/* Logo - visible on desktop */}
                    <div className="max-lg:hidden self-start mb-10">
                        <Image
                            src="/auth-Logo.svg"
                            alt="Mercury Logo"
                            width={150}
                            height={50}
                            className="h-24 w-auto"
                        />
                    </div>
                    {/* Header */}
                    <div className="space-y-2 text-center md:text-left">
                        <h1 className="text-2xl max-lg:text-xl font-semibold text-gray-900">
                            Reset Password
                        </h1>
                        <p className="text-sm text-gray-600">
                            Enter your new password below. Make sure it's strong and secure.
                        </p>
                    </div>

                    {/* Form */}
                    <Suspense>
                        <AuthForm type="reset-password" token={token} />
                    </Suspense>

                    {/* Sign up link */}
                    <div className="text-center text-sm text-gray-600">
                        Don&apos;t have an account yet?{" "}
                        <Link href="/register" className="text-blue-600 font-medium hover:text-blue-500">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </main>
        </section>
    );
}
