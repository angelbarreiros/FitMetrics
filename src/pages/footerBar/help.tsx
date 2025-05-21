import { HelpCircle } from "lucide-react";
import PagesHeader from "../../components/shared/PageHeader";
import { SEO } from "../../components/SEO";

export default function HelpPage() {
    return (
        <section>
            <SEO title="FiteMetrics - Help" ></SEO>
            <PagesHeader title="Help" icon={HelpCircle}>
            </PagesHeader>
        </section>



    );
}