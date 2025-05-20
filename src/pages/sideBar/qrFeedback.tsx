import { MessageSquare } from "lucide-react";
import PagesHeader from "../../components/shared/PageHeader";
import { SEO } from "../../components/SEO";

export default function QrFeedbackPage() {
    return (
        <section>
            <SEO title="FiteMetrics - UserFeedback" ></SEO>
            <PagesHeader title="User Feedback" icon={MessageSquare}>
            </PagesHeader>
        </section>



    );
}