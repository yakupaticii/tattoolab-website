import { Button } from "@/components/ui/button";
import { Sparkles, Mail, Lock, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Auth() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col p-4">
            <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-center">
                <div className="mb-8">
                    <Link href="/">
                        <div className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </div>
                    </Link>
                    <div className="flex justify-center">
                        <Link href="/">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
                                    <Sparkles className="w-7 h-7 text-accent-foreground" />
                                </div>
                                <span className="font-display font-bold text-3xl">TattooLab</span>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="bg-card/40 border border-border/50 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
                    <h2 className="font-display text-2xl font-bold mb-2 text-center">Welcome Back</h2>
                    <p className="text-muted-foreground text-center mb-8">Sign in to your design studio</p>

                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="text-sm font-medium mb-2 block text-muted-foreground">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-muted-foreground/50" />
                                </div>
                                <input
                                    type="email"
                                    className="w-full bg-background border border-border rounded-lg pl-10 pr-3 py-3 text-sm focus:outline-none focus:border-accent/50 transition-colors"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-medium text-muted-foreground">Password</label>
                                <a href="#" className="text-xs text-accent hover:underline">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-muted-foreground/50" />
                                </div>
                                <input
                                    type="password"
                                    className="w-full bg-background border border-border rounded-lg pl-10 pr-3 py-3 text-sm focus:outline-none focus:border-accent/50 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mt-2" size="lg">
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Don't have an account? <a href="#" className="text-accent hover:underline font-medium">Create one</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
