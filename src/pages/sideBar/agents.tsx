import { FileText } from "lucide-react";
import PagesHeader from "../../components/shared/PageHeader";
import { SEO } from "../../components/SEO";

export default function AgentsPage() {
    return (
        <section>
            <SEO title="FiteMetrics - Agents" ></SEO>
            <PagesHeader title="Agents" icon={FileText}>
            </PagesHeader>
        </section>



    );
}