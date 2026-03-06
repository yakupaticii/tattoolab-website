import { Separator } from "@/components/ui/separator";
import { Sparkles, Mail, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

/**
 * TattooLab Terms of Service Page
 * Professional, App Store review-friendly legal document
 */

export default function Terms() {
  const supportEmail = "support@tattoolab.app";
  const lastUpdated = "March 2024";

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
            <Link href="/terms" className="text-sm hover:text-accent transition-colors font-semibold text-accent">Terms</Link>
            <Link href="/support" className="text-sm hover:text-accent transition-colors">Support</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 py-12 md:py-16 px-4">
        <div className="container max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-8 text-foreground">
            {/* Introduction */}
            <section>
              <p className="text-lg leading-relaxed text-muted-foreground">
                These Terms of Service ("Terms") govern your use of the TattooLab mobile application and related services (the "Service"). By downloading, installing, or using TattooLab, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the Service.
              </p>
            </section>

            {/* Acceptance */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using TattooLab, you accept and agree to be bound by and abide by the terms and conditions of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            {/* Service Description */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                TattooLab is an AI-powered mobile application that provides the following features:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>AI Tattoo Design Studio for creating and exploring tattoo designs</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Aging Simulator to visualize how designs will age over time</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Cover-Up Advisor for expert recommendations on covering existing tattoos</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>TattooCare with professional aftercare guidance</span>
                </li>
              </ul>
            </section>

            {/* AI Content Disclaimer */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">3. AI-Generated Content Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                TattooLab uses artificial intelligence to generate design suggestions, aging predictions, and cover-up recommendations. Please understand that:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>AI-generated designs are suggestions only and may not be technically feasible or aesthetically suitable for your specific needs</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Aging predictions are estimates based on general patterns and may not accurately reflect how your specific tattoo will age</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Cover-up recommendations are advisory only and should be reviewed by a professional tattoo artist before implementation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>You are solely responsible for consulting with a professional tattoo artist before getting any tattoo</span>
                </li>
              </ul>
            </section>

            {/* Medical Disclaimer */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">4. Medical Disclaimer for Aftercare Guidance</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                TattooLab provides general aftercare guidance and tips for tattoo maintenance. This information is for educational purposes only and is not a substitute for professional medical advice. Please understand that:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Aftercare recommendations are general guidelines and may not apply to your specific situation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>If you experience infection, excessive pain, or allergic reactions, consult a healthcare professional immediately</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Always follow the aftercare instructions provided by your tattoo artist</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>We are not responsible for any adverse reactions or complications from tattoo aftercare</span>
                </li>
              </ul>
            </section>

            {/* User Responsibilities */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">5. User Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree to use TattooLab only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment of the Service. Prohibited behavior includes:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Harassing or causing distress or inconvenience to any person</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Transmitting obscene or offensive content</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Disrupting the normal flow of dialogue within the Service</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Attempting to gain unauthorized access to the Service</span>
                </li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">6. Intellectual Property Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Service and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio) are owned by TattooLab, its licensors, or other providers of such material and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You retain ownership of any designs, images, or content you create or upload to TattooLab. By uploading content, you grant TattooLab a license to use your content to provide the Service. You may not reproduce, distribute, or transmit the Service or its content without our prior written permission.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In no event shall TattooLab, its directors, employees, or agents be liable to you for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service or for any other claim related to the Service, even if we have been advised of the possibility of such damages.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our total liability to you for any claim arising out of or relating to the Service shall not exceed the amount you have paid to us in the twelve months preceding the claim.
              </p>
            </section>

            {/* Subscription Terms */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">8. Subscription Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                TattooLab offers the following subscription options:
              </p>
              <ul className="space-y-3 text-muted-foreground mb-6">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Weekly auto-renewable subscription</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Monthly auto-renewable subscription</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Yearly auto-renewable subscription</span>
                </li>
              </ul>

              <div className="bg-card border border-accent/30 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-lg text-accent">Important Subscription Information</h3>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Payment</h4>
                  <p className="text-muted-foreground text-sm">
                    Payment will be charged to your Apple ID account at the confirmation of purchase. Subscription automatically renews unless auto-renewal is turned off at least 24 hours before the end of the current subscription period.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Auto-Renewal</h4>
                  <p className="text-muted-foreground text-sm">
                    Your subscription will automatically renew at the end of each billing period unless you cancel it. The cost of renewal will be the same as the original subscription price unless we notify you of a price change in advance.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Cancellation</h4>
                  <p className="text-muted-foreground text-sm">
                    You can manage or cancel your subscription at any time by going to your Apple ID Settings. To cancel, go to Settings &gt; [Your Name] &gt; Apple ID &gt; Subscriptions, select TattooLab, and tap "Cancel Subscription." Cancellation takes effect at the end of your current billing period.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">No Refunds</h4>
                  <p className="text-muted-foreground text-sm">
                    Except as required by law, subscription fees are non-refundable. If you cancel your subscription, you will retain access to premium features through the end of your current billing period.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">9. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about these Terms of Service or the Service itself, please contact us:
              </p>
              <div className="bg-card border border-accent/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-5 h-5 text-accent" />
                  <a href={`mailto:${supportEmail}`} className="text-accent hover:underline font-semibold">
                    {supportEmail}
                  </a>
                </div>
                <p className="text-sm text-muted-foreground">We'll respond to your inquiry within 7 business days.</p>
              </div>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">10. Modifications to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify you of any changes by updating the "Last updated" date at the top of this page. Your continued use of the Service following the posting of revised Terms means that you accept and agree to the changes.
              </p>
            </section>

            {/* Severability */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">11. Severability</h2>
              <p className="text-muted-foreground leading-relaxed">
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.
              </p>
            </section>

            {/* Entire Agreement */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">12. Entire Agreement</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and TattooLab regarding the use of the Service and supersede all prior and contemporaneous agreements, understandings, and communications.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-card/40 border-t border-border/50 py-12 px-4">
        <div className="container max-w-3xl mx-auto">
          <Separator className="bg-border/50 mb-8" />
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 TattooLab. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
