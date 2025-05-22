import { MessageSquare } from "lucide-react";
import PagesHeader from "../../components/shared/PageHeader";
import { SEO } from "../../components/shared/SEO";

export default function CalendarPage() {
    return (
        <section>
            <SEO title="FitMetrics - Calendar" ></SEO>
            <PagesHeader title="Custom Ratings" icon={MessageSquare}>
            </PagesHeader>
        </section>



    );
}