"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { LoadingDots } from "@/components/ui/loading-dots";
import { login } from "@/auth/login";
import { resetPassword } from "@/actions/auth";

interface AuthForm {
  type: "login" | "forgot-password" | "reset-password";
  userEmail?: string;
  token?: string;

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AuthForm({ type, userEmail, token }: AuthForm) {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);


  const submitForm = async (formData: FormData) => {
    setButtonDisabled(true);
    try {
      switch (type) {
        case "reset-password":
          const password = formData.get("password")?.toString();
          const confirmPassword = formData.get("confirmPassword")?.toString();
          if (!password || !confirmPassword) {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Please enter both password fields.",
            });
            setButtonDisabled(false);
            return;
          }
          if (password !== confirmPassword) {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Passwords do not match.",
            });
            setButtonDisabled(false);
            return;
          }
          try {
            await resetPassword(password, token || "");
            toast({
              variant: "success",
              title: "Password Reset",
              description: "Your password has been reset successfully. Please login with your new password.",
            });
            router.push("/login");
          } catch (error: any) {
            toast({
              variant: "destructive",
              title: "Error",
              description: error.message || "Failed to reset password. Please try again.",
            });
          }
          break;
        case "forgot-password":
          const email = formData.get("email")?.toString();
          if (!email) {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Please enter a valid email address.",
            });
            return;
          }
          try {
            toast({
              variant: "success",
              title: "Reset Link Sent",
              description: "If an account exists with this email, you will receive a password reset link.",
            });
            router.push("/login");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            toast({
              variant: "destructive",
              title: "Error",
              description: error.message || "Failed to send reset link. Please try again.",
            });
            setButtonDisabled(false);
          }
          break;

        case "login":
          setButtonDisabled(true);
          try {
            await login(formData, null)
            // const shouldShowMfa = ;
            toast({
              variant: "success",
              title: "login successfull"
            })
            router.push("/data-audit");
            formData.get("email")?.toString()
            formData.get("password")?.toString()
            break;
            // eslint-disable-next-line
          } catch (error: any) {
            setButtonDisabled(false);
            toast({
              variant: "destructive",
              title: "Login Error",
              description: "Invalid email or password. Please try again.",
            });
          }
          break;



        default:
          return;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setButtonDisabled(false);
      toast({
        title: "An error occurred!",
        description: err.message,
        variant: "destructive",
      });
    } finally {
    }
  };

  const inputClassName =
    "w-full text-base placeholder:text-secondary-foreground/65 focus-visible:ring-0 focus-visible:ring-offset-0";

  return (
    <>

      <form action={submitForm}>
        <main className="space-y-2 text-secondary-foreground">
          {type === "forgot-password" ? (
            <div className="text-secondary-foreground space-y-1 max-lg:space-y-0.5">
              <Label
                htmlFor="email"
                className="text-base max-lg:text-sm text-secondary-foreground font-medium"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                className={inputClassName}
              />
            </div>
          ) : type === "reset-password" ? (
            <>
              <div className="text-secondary-foreground space-y-1 max-lg:space-y-0.5 relative">
                <Label
                  htmlFor="password"
                  className="text-base max-lg:text-sm text-secondary-foreground font-medium"
                >
                  New Password
                </Label>
                <Input
                  name="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  required
                  className={inputClassName}
                />
                {showPassword ? (
                  <Eye
                    className="absolute right-2 bottom-3 transform cursor-pointer text-secondary-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    size={16}
                  />
                ) : (
                  <EyeOff
                    className="absolute right-2 bottom-3 transform cursor-pointer text-secondary-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    size={16}
                  />
                )}
              </div>

              <div className="text-secondary-foreground space-y-1 max-lg:space-y-0.5 relative">
                <Label
                  htmlFor="confirmPassword"
                  className="text-base max-lg:text-sm text-secondary-foreground font-medium"
                >
                  Confirm Password
                </Label>
                <Input
                  name="confirmPassword"
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  required
                  className={inputClassName}
                />
                {showConfirmPassword ? (
                  <Eye
                    className="absolute right-2 bottom-3 transform cursor-pointer text-secondary-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    size={16}
                  />
                ) : (
                  <EyeOff
                    className="absolute right-2 bottom-3 transform cursor-pointer text-secondary-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    size={16}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <div className="text-secondary-foreground space-y-1 max-lg:space-y-0.5">
                <Label
                  htmlFor="last_name"
                  className="text-base max-lg:text-sm text-secondary-foreground font-medium"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  required
                  className={inputClassName}
                />
              </div>

              <div className="text-secondary-foreground space-y-1 max-lg:space-y-0.5 relative">
                <Label
                  htmlFor="last_name"
                  className="text-base max-lg:text-sm text-secondary-foreground font-medium"
                >
                  Password
                </Label>
                <Input
                  name="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  required
                  className={inputClassName}
                />
                {showPassword ? (
                  <Eye
                    className="absolute right-2 bottom-3 transform cursor-pointer text-secondary-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    size={16}
                  />
                ) : (
                  <EyeOff
                    className="absolute right-2 bottom-3 transform cursor-pointer text-secondary-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    size={16}
                  />
                )}
              </div>

              <div className="text-secondary-foreground flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm max-lg:text-xs text-primary font-medium"
                >
                  Forgot password?
                </Link>
              </div>
            </>
          )}
        </main>

        <div className="mt-8">
          <Submit type={type} disabled={buttonDisabled} />
        </div>
      </form>
    </>
  );
}

function Submit({ type, disabled }: AuthForm & { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending || disabled ? (
        <LoadingDots />
      ) : type === "forgot-password" ? (
        "Send Reset Link"
      ) : type === "reset-password" ? (
        "Reset Password"
      ) : (
        "Login"
      )}
    </Button>
  );
}
