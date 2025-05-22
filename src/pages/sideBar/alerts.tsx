import { Bell } from "lucide-react";
import PagesHeader from "../../components/shared/PageHeader";
import { SEO } from "../../components/shared/SEO";

export default function AlertsPage() {
    return (
        <section>
            <SEO title="FitMetrics - Alerts" ></SEO>
            <PagesHeader title="Alerts" icon={Bell}>
            </PagesHeader>
        </section>



    );
}