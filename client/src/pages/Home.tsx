import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Smartphone, Sparkles, Clock, Shield, Mail } from "lucide-react";
import { Link } from "wouter";

/**
 * TattooLab Home Page
 * Premium dark theme with warm gold accents
 * Mobile-first responsive design
 */

export default function Home() {
  const appStoreUrl = "https://apps.apple.com/app/tattoolab/id0000000000";
  const supportEmail = "support@tattoolab.app";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">TattooLab</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm hover:text-accent transition-colors">Home</Link>
            <Link href="/privacy" className="text-sm hover:text-accent transition-colors">Privacy</Link>
            <Link href="/terms" className="text-sm hover:text-accent transition-colors">Terms</Link>
            <Link href="/support" className="text-sm hover:text-accent transition-colors">Support</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 md:py-32 px-4 overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="container max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-block">
            <div className="px-4 py-2 rounded-full bg-card border border-accent/30 text-sm text-accent font-medium">
              ✨ AI-Powered Tattoo Design Studio
            </div>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
            TattooLab
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto font-light">
            AI Tattoo Creator, Design Studio, Aging Simulator, Cover-Up Advisor, and Tattoo Care
          </p>

          <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Visualize your tattoo ideas with AI-powered design tools. Explore how your design will age, get expert cover-up advice, and access professional tattoo care guidance—all in one beautiful app.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 hover:shadow-lg hover:shadow-accent/20"
            >
              <Smartphone className="w-5 h-5 mr-2" />
              Download on App Store
            </a>
            <a
              href={`mailto:${supportEmail}`}
              className="inline-flex items-center justify-center px-8 py-4 bg-card border border-accent/30 text-foreground font-semibold rounded-lg hover:bg-card/80 hover:border-accent/50 transition-all duration-200"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Support
            </a>
          </div>

          <div className="text-sm text-muted-foreground">
            Subscriptions managed through Apple In-App Purchases
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 bg-card/40">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to design, visualize, and care for your tattoos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Feature 1: Design Studio */}
            <Card className="p-8 bg-background border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">Design Studio</h3>
              <p className="text-muted-foreground leading-relaxed">
                Create stunning tattoo designs with AI assistance. Explore unlimited variations and refine your ideas until they're perfect.
              </p>
            </Card>

            {/* Feature 2: Aging Simulator */}
            <Card className="p-8 bg-background border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">Aging Simulator</h3>
              <p className="text-muted-foreground leading-relaxed">
                See how your tattoo will look over time. Our AI predicts aging patterns to help you make informed design choices.
              </p>
            </Card>

            {/* Feature 3: Cover-Up Advisor */}
            <Card className="p-8 bg-background border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">Cover-Up Advisor</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get expert recommendations for covering up existing tattoos. Our AI analyzes your current design and suggests creative solutions.
              </p>
            </Card>

            {/* Feature 4: TattooCare */}
            <Card className="p-8 bg-background border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">TattooCare</h3>
              <p className="text-muted-foreground leading-relaxed">
                Professional aftercare guidance and tips to keep your tattoo looking fresh. Follow personalized care routines for optimal results.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Divider */}
      <Separator className="bg-border/50" />

      {/* Support Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Need Help?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            We're here to support you. Reach out with any questions about TattooLab or your subscription.
          </p>
          <a
            href={`mailto:${supportEmail}`}
            className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200"
          >
            <Mail className="w-5 h-5 mr-2" />
            {supportEmail}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-card/40 border-t border-border/50 py-12 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-accent-foreground" />
                </div>
                <span className="font-display font-bold text-lg">TattooLab</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered tattoo design and care studio
              </p>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide text-accent">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide text-accent">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/support" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    Help & FAQ
                  </Link>
                </li>
                <li>
                  <a href={`mailto:${supportEmail}`} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="bg-border/50 mb-8" />

          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 TattooLab. All rights reserved.</p>
            <p className="mt-2">
              Subscriptions managed through Apple In-App Purchases. See our{" "}
              <Link href="/terms" className="text-accent hover:underline">
                Terms of Service
              </Link>
              {" "}for details.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
