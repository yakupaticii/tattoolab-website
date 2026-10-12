import LegalPage from "@/legal/LegalPage";
import { PRIVACY_TR } from "@/legal/texts";

/** KVKK Aydınlatma Metni: the Turkish privacy disclosure, also shown in the app on Turkish devices. */
export default function Kvkk() {
  return <LegalPage title="KVKK Aydınlatma Metni" text={PRIVACY_TR} active="kvkk" lang="tr" />;
}
