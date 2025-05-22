import { FileText } from "lucide-react";
import PagesHeader from "../../components/shared/PageHeader";
import { SEO } from "../../components/shared/SEO";

export default function AgentsPage() {
    return (
        <section>
            <SEO title="FitMetrics - Agents" ></SEO>
            <PagesHeader title="Agents" icon={FileText}>
            </PagesHeader>
        </section>



    );
}