
import { CircleUserRound } from "lucide-react";
import PagesHeader from "../../components/shared/PageHeader";
import { SEO } from "../../components/SEO";

export default function AccountPage() {
    return (
        <section>
            <SEO title="FitMetrics - Account Details" ></SEO>
            <PagesHeader title="Account Details" icon={CircleUserRound}>
            </PagesHeader>
        </section>



    );
}