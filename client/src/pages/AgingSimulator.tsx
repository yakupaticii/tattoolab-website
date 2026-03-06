import { Button } from "@/components/ui/button";
import { Clock, Upload, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function AgingSimulator() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col p-4 md:p-8">
            <div className="container max-w-5xl mx-auto flex-1 flex flex-col">
                <header className="mb-8">
                    <Link href="/">
                        <div className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </div>
                    </Link>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-accent" />
                        </div>
                        <h1 className="font-display text-3xl font-bold">Aging Simulator</h1>
                    </div>
                    <p className="text-muted-foreground">See how your tattoo will fade and change over the years.</p>
                </header>

                <main className="flex-1 flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 bg-card/40 border border-border/50 rounded-2xl flex flex-col items-center justify-center p-8 min-h-[400px] border-dashed">
                        <Upload className="w-12 h-12 text-muted-foreground/50 mb-4" />
                        <h3 className="font-medium text-lg mb-2">Upload Tattoo Design</h3>
                        <p className="text-muted-foreground text-sm mb-6 text-center max-w-xs">Upload your design or a photo of your current tattoo to simulate aging.</p>
                        <Button variant="outline" className="border-accent/30 hover:bg-accent/10">Browse Files</Button>
                    </div>

                    <div className="flex flex-col items-center justify-center py-4 lg:py-0">
                        <ArrowRight className="w-8 h-8 text-muted-foreground/30 rotate-90 lg:rotate-0 mb-4" />
                        <div className="bg-card/40 border border-border/50 rounded-lg p-3 text-center w-full max-w-[200px]">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">Years</label>
                            <select className="bg-background border border-border rounded p-2 text-sm focus:outline-none focus:border-accent w-full text-center">
                                <option>5 Years</option>
                                <option>10 Years</option>
                                <option selected>20 Years</option>
                                <option>30 Years</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex-1 bg-card/40 border border-border/50 rounded-2xl flex flex-col items-center justify-center p-8 min-h-[400px] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
                        <Clock className="w-12 h-12 text-muted-foreground/30 mb-4" />
                        <p className="text-muted-foreground z-10 text-center">Simulation results will appear here</p>
                    </div>
                </main>
            </div>
        </div>
    );
}
