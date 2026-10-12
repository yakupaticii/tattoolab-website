import LegalPage from "@/legal/LegalPage";
import { PRIVACY_EN } from "@/legal/texts";

export default function Privacy() {
  return <LegalPage title="Privacy Policy" text={PRIVACY_EN} active="privacy" />;
}
