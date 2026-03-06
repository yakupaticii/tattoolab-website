import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Sparkles, Mail, ArrowLeft, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

/**
 * TattooLab Support Page
 * FAQ and contact information
 */

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I restore purchases?",
    answer: "To restore your purchases, open TattooLab and go to Settings > Account > Restore Purchases. This will restore your subscription and any premium features you've previously purchased. Make sure you're signed in with the same Apple ID you used to make the purchase.",
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel your subscription anytime through your Apple ID settings. Go to Settings > [Your Name] > Apple ID > Subscriptions, select TattooLab, and tap 'Cancel Subscription.' Your cancellation takes effect at the end of your current billing period, and you'll retain access to premium features until then.",
  },
  {
    question: "How do I contact support?",
    answer: "We're here to help! You can reach our support team by emailing support@tattoolab.app. Please include details about your issue, and we'll respond within 7 business days. For urgent issues, please mark your email as urgent.",
  },
  {
    question: "How does TattooLab use AI?",
    answer: "TattooLab uses Google Gemini API to power our AI features. We use AI to generate tattoo design suggestions, predict how designs will age over time, and provide cover-up recommendations. All AI processing happens only after you explicitly consent to it for each request. Your data is processed securely and is never shared without your permission.",
  },
  {
    question: "Is my data safe?",
    answer: "Yes, your data security is our priority. Most of your data is stored locally on your device and encrypted. When we do process data through our AI services, it's done securely and only with your explicit consent. We comply with industry-standard security practices and never share your personal information with third parties without permission.",
  },
  {
    question: "What subscription plans are available?",
    answer: "TattooLab offers three subscription options: weekly, monthly, and yearly auto-renewable subscriptions. All plans provide access to our full suite of features including Design Studio, Aging Simulator, Cover-Up Advisor, and TattooCare. Pricing varies by region and plan duration.",
  },
  {
    question: "Can I use TattooLab offline?",
    answer: "Yes! Most TattooLab features work offline. Your designs and projects are stored locally on your device. However, AI-powered features like design generation and aging simulation require an internet connection to process your requests through our AI services.",
  },
  {
    question: "How do I delete my account?",
    answer: "To delete your account, please contact us at support@tattoolab.app with your request. We'll process your account deletion within 7 business days. Please note that this will delete all your data associated with TattooLab, and this action cannot be undone.",
  },
];

function FAQItemComponent({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border/50 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-card/50 transition-colors text-left"
      >
        <h3 className="font-semibold text-foreground pr-4">{item.question}</h3>
        <ChevronDown
          className={`w-5 h-5 text-accent flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <>
          <Separator className="bg-border/50" />
          <div className="px-6 py-4 bg-card/20 text-muted-foreground leading-relaxed">
            {item.answer}
          </div>
        </>
      )}
    </div>
  );
}

export default function Support() {
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
            <Link href="/" className="text-sm hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/privacy" className="text-sm hover:text-accent transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm hover:text-accent transition-colors">
              Terms
            </Link>
            <Link href="/support" className="text-sm hover:text-accent transition-colors font-semibold text-accent">
              Support
            </Link>
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
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">Help & Support</h1>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions or reach out to our support team
            </p>
          </div>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="font-display text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <FAQItemComponent key={index} item={faq} />
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-8">
            <h2 className="font-display text-3xl font-bold mb-8">Still Need Help?</h2>
            <Card className="p-8 md:p-12 bg-gradient-to-br from-card to-card/50 border-accent/30">
              <div className="text-center">
                <Mail className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold mb-3">Contact Our Support Team</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Our dedicated support team is ready to help. Send us an email with your question or issue, and we'll get back to you as soon as possible.
                </p>
                <a
                  href={`mailto:${supportEmail}`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 mb-4"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  {supportEmail}
                </a>
                <p className="text-sm text-muted-foreground">
                  We typically respond within 7 business days
                </p>
              </div>
            </Card>
          </section>

          {/* Response Time Info */}
          <section className="bg-card/40 border border-border/50 rounded-lg p-6 md:p-8">
            <h3 className="font-semibold text-lg mb-3 text-foreground">What to Include in Your Email</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                <span>A clear description of your issue or question</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                <span>Your device model and iOS version</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                <span>Steps you've already tried to resolve the issue</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                <span>Screenshots if applicable</span>
              </li>
            </ul>
          </section>
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
