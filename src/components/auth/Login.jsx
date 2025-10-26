import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import GoogleLoginButton from "./components/GoogleLoginButton";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const { loginUser } = useAuth()
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const { email, password } = data || {};

        try {
            const result = await loginUser(email, password)
            if (result?.user) {
                console.log(result.user);
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <Card className="w-full max-w-sm border border-border">
                <CardHeader className="text-center space-y-1">
                    <CardTitle className="text-2xl font-semibold text-primary">Welcome Back</CardTitle>
                    <CardDescription className="text-[var(--foreground)]">
                        Login to continue shopping with <span className="font-semibold text-primary">BANYAN</span>
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                                {...register("password", { required: "Password is required" })}
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
                            Login
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-2 text-sm text-center">
                    <GoogleLoginButton />
                    <p className="text-foreground">
                        Don’t have an account?{" "}
                        <Link to={'/register'} className="text-primary hover:underline">Sign up</Link>
                    </p>
                    <a href="#" className="text-accent hover:underline">Forgot password?</a>
                </CardFooter>
            </Card>
        </div>
    );
}
