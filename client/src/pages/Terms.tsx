import LegalPage from "@/legal/LegalPage";
import { TERMS_EN } from "@/legal/texts";

export default function Terms() {
  return <LegalPage title="Terms of Service" text={TERMS_EN} active="terms" />;
}
