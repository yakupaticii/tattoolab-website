import { Separator } from "@/components/ui/separator";
import { Sparkles, Mail, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

/**
 * TattooLab Privacy Policy Page
 * Professional, App Store review-friendly legal document
 */

export default function Privacy() {
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
            <Link href="/privacy" className="text-sm hover:text-accent transition-colors font-semibold text-accent">Privacy</Link>
            <Link href="/terms" className="text-sm hover:text-accent transition-colors">Terms</Link>
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
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-8 text-foreground">
            {/* Introduction */}
            <section>
              <p className="text-lg leading-relaxed text-muted-foreground">
                TattooLab ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and related services (the "Service").
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect information you provide directly and information collected automatically when you use TattooLab:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>Account Information:</strong> When you create an account, we collect your email address and authentication credentials.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>Device Information:</strong> We collect information about your device, including device model, operating system, and unique device identifiers.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>Usage Information:</strong> We collect information about your interactions with the Service, including features used and actions taken.</span>
                </li>
              </ul>
            </section>

            {/* Photos and Images */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">2. Photos and Images Uploaded by Users</h2>
              <p className="text-muted-foreground leading-relaxed">
                When you upload photos or images to TattooLab for design purposes, tattoo aging simulation, or cover-up advisory features, these images are stored securely on your device and our servers. We use these images solely to provide the requested services. Your images are never shared with third parties without your explicit consent, except as required by law. You retain full ownership of all images you upload.
              </p>
            </section>

            {/* AI Processing */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">3. AI Processing with Google Gemini API</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                TattooLab uses Google Gemini API to provide AI-powered design and analysis features. We only send your data to Google Gemini API after you explicitly consent to AI processing for each specific request. This includes:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Design generation and refinement</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Aging simulation analysis</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Cover-up advisory recommendations</span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Google processes this data in accordance with their privacy policies. We recommend reviewing Google's privacy policy at{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  policies.google.com/privacy
                </a>.
              </p>
            </section>

            {/* Subscription and Payment */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">4. Subscription and Payment Data</h2>
              <p className="text-muted-foreground leading-relaxed">
                TattooLab uses Apple StoreKit for subscription management and payment processing. Your subscription and payment information is handled entirely by Apple and is subject to Apple's privacy policies. We do not store your credit card information or detailed payment data. We receive only subscription status information necessary to manage your access to premium features. For details about how Apple handles your payment information, please review Apple's privacy policy.
              </p>
            </section>

            {/* Firebase */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">5. Firebase Usage</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use Firebase for app configuration, crash reporting, and analytics. Firebase collects certain diagnostic and usage information to help us improve the Service. This includes crash logs and feature usage statistics. Firebase operates under Google's privacy policies. You can learn more at{" "}
                <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  firebase.google.com/support/privacy
                </a>.
              </p>
            </section>

            {/* Local Data */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">6. Local Data Storage</h2>
              <p className="text-muted-foreground leading-relaxed">
                Most of your data—including your designs, saved projects, and preferences—is stored locally on your device. This data remains under your control and is not transmitted to our servers unless you explicitly choose to sync or backup your data. Local data is encrypted and protected by your device's security features.
              </p>
            </section>

            {/* How We Use Data */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">7. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Provide, maintain, and improve the Service</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Process your subscription and manage your account</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Respond to your inquiries and provide customer support</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Send you service-related announcements and updates</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Analyze usage patterns to enhance user experience</span>
                </li>
              </ul>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">8. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as necessary to provide the Service and fulfill the purposes outlined in this Privacy Policy. You can request deletion of your account and associated data at any time by contacting us. Some information may be retained for legal compliance or legitimate business purposes.
              </p>
            </section>

            {/* Security */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">9. Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">10. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                TattooLab is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected information from a child under 13, we will take steps to delete such information and terminate the child's account. Parents or guardians who believe their child has provided information to TattooLab should contact us immediately.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">11. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
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

            {/* Changes */}
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">12. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last updated" date at the top of this policy. Your continued use of the Service following the posting of revised Privacy Policy means that you accept and agree to the changes.
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
