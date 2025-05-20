import { MapPin } from "lucide-react";
import PagesHeader from "../../components/shared/PageHeader";
import { SEO } from "../../components/SEO";

export default function FacilitiesPage() {
    return (
        <section>
            <SEO title="FiteMetrics - Facilities" ></SEO>
            <PagesHeader title="Facilities" icon={MapPin}>
            </PagesHeader>
        </section>



    );
}