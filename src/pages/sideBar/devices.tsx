import { TabletIcon } from "lucide-react";
import PagesHeader from "../../components/shared/PageHeader";
import { SEO } from "../../components/SEO";

export default function DevicesPage() {
    return (
        <section>
            <SEO title="FiteMetrics - Devices" ></SEO>
            <PagesHeader title="Devices" icon={TabletIcon}>
            </PagesHeader>
        </section>



    );
}