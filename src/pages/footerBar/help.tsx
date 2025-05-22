import { HelpCircle } from "lucide-react";
import PagesHeader from "../../components/shared/PageHeader";
import { SEO } from "../../components/shared/SEO";

export default function HelpPage() {
    return (
        <section>
            <SEO title="FitMetrics - Help" ></SEO>
            <PagesHeader title="Help" icon={HelpCircle}>
            </PagesHeader>
        </section>



    );
}