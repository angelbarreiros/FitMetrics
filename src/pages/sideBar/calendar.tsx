import { MessageSquare } from "lucide-react";
import PagesHeader from "../../components/shared/PageHeader";
import { SEO } from "../../components/SEO";

export default function CalendarPage() {
    return (
        <section>
            <SEO title="FiteMetrics - Calendar" ></SEO>
            <PagesHeader title="Custom Ratings" icon={MessageSquare}>
            </PagesHeader>
        </section>



    );
}