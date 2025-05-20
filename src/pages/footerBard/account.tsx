
import { CircleUserRound } from "lucide-react";
import PagesHeader from "../../components/shared/PageHeader";
import { SEO } from "../../components/SEO";
import Paginator from "../../components/shared/Paginator";
import { useState } from "react";

export default function AccountPage() {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    return (
        <section>
            <SEO title="FitMetrics - Account Details" ></SEO>
            <PagesHeader title="Account Details" icon={CircleUserRound}>
            </PagesHeader>
            <div>
                <Paginator currentPage={page} pageSize={pageSize} noMoreItems={false} onPageChange={(page) => { setPage(page) }} onPageSizeChange={(size) => { setPageSize(size) }}></Paginator>
            </div>

        </section>



    );
}