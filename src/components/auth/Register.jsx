import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import GoogleLoginButton from "./components/GoogleLoginButton";
import { Link } from "react-router-dom";

export default function Register() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const onSubmit = (data) => console.log("Register Data:", data);

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <Card className="w-full max-w-sm border border-border">
                <CardHeader className="text-center space-y-1">
                    <CardTitle className="text-2xl font-semibold text-primary">Create Account</CardTitle>
                    <CardDescription className="text-[var(--foreground)]">
                        Register to start shopping with <span className="font-semibold text-primary">BANYAN</span>
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Name */}
                        <div>
                            <Label htmlFor="name" className="text-foreground">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                className="border-[var(--border)] focus:ring-ring mt-1"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Photo URL */}
                        <div>
                            <Label htmlFor="photo" className="text-foreground">Photo URL</Label>
                            <Input
                                id="photo"
                                type="url"
                                placeholder="https://example.com/photo.jpg"
                                className="border-[var(--border)] focus:ring-ring mt-1"
                                {...register("photoUrl")}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <Label htmlFor="email" className="text-foreground">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="border-[var(--border)] focus:ring-ring mt-1"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <Label htmlFor="password" className="text-foreground">Password</Label>
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="border-border focus:ring-ring mt-1 pr-10"
                                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-7 text-foreground"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                            {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
                        </div>

                        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-accent transition">
                            Sign Up
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-2 text-sm text-center">
                    <GoogleLoginButton />
                    <p className="text-foreground">
                        Already have an account?{" "}
                        <Link to={'/login'} className="text-primary hover:underline">Login</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
