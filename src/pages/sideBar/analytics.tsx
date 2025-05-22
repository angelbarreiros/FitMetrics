import { ChartNoAxesCombined } from "lucide-react";
import PagesHeader from "../../components/shared/PageHeader";
import { SEO } from "../../components/shared/SEO";

export default function AnalyticsPage() {
    return (
        <section>
            <SEO title="FitMetrics - Analytics" ></SEO>
            <PagesHeader title="Analytics" icon={ChartNoAxesCombined}>
            </PagesHeader>
        </section>



    );
}