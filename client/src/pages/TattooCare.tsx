import { Button } from "@/components/ui/button";
import { Smartphone, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function TattooCare() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col p-4 md:p-8">
            <div className="container max-w-4xl mx-auto flex-1">
                <header className="mb-12">
                    <Link href="/">
                        <div className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-12 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </div>
                    </Link>
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/20 mb-6">
                            <Smartphone className="w-8 h-8 text-accent" />
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">TattooCare Guide</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Professional aftercare routines to heal perfectly and keep your ink vibrant.</p>
                    </div>
                </header>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Dos */}
                    <div className="bg-card/40 border border-border/50 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:shadow-accent/5 transition-all">
                        <div className="flex items-center gap-3 mb-6">
                            <CheckCircle2 className="w-6 h-6 text-accent" />
                            <h3 className="font-display text-2xl">What to Do</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                                <p className="text-muted-foreground">Wash gently with antimicrobial soap twice a day.</p>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                                <p className="text-muted-foreground">Pat dry with a clean paper towel (don't rub).</p>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                                <p className="text-muted-foreground">Apply a very thin layer of tattoo safe ointment or unscented lotion.</p>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                                <p className="text-muted-foreground">Wear loose, breathable clothing over the area.</p>
                            </li>
                        </ul>
                    </div>

                    {/* Don'ts */}
                    <div className="bg-card/40 border border-destructive/20 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:shadow-destructive/5 transition-all">
                        <div className="flex items-center gap-3 mb-6">
                            <AlertCircle className="w-6 h-6 text-destructive" />
                            <h3 className="font-display text-2xl">What to Avoid</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                                <p className="text-muted-foreground">Don't pick, scratch, or peel scabs or flaky skin.</p>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                                <p className="text-muted-foreground">Avoid direct sunlight on healing tattoos.</p>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                                <p className="text-muted-foreground">No swimming, baths, or soaking in water for 2-3 weeks.</p>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                                <p className="text-muted-foreground">Don't use petroleum jelly or heavy ointments as they clog pores.</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-muted-foreground italic max-w-xl mx-auto">
                        Note: Always follow the specific instructions provided by your tattoo artist, as they may have a healing method specific to their work and your skin type.
                    </p>
                </div>
            </div>
        </div>
    );
}
