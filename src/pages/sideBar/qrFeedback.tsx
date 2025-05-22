import { MessageSquare } from "lucide-react";
import PagesHeader from "../../components/shared/PageHeader";
import { SEO } from "../../components/shared/SEO";

export default function QrFeedbackPage() {
    return (
        <section>
            <SEO title="FitMetrics - UserFeedback" ></SEO>
            <PagesHeader title="User Feedback" icon={MessageSquare}>
            </PagesHeader>
        </section>



    );
}