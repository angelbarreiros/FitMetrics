import { CustomDropdown } from "./CustomDropdown";


type PaginatorProps = {
    currentPage: number;
    pageSize: number;
    noMoreItems: boolean;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
};

export const Paginator = ({ currentPage, pageSize, noMoreItems, onPageChange, onPageSizeChange }: PaginatorProps) => {
    const startItem = (currentPage) * pageSize + 1;


    const handlePageSizeChange = (page: string) => {
        onPageSizeChange(Number(page));
    };

    return (
        <div className="sticky bottom-0 bg-white border-t border-blue-200 py-4 px-6 shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

                <div className="flex items-center">
                    <label htmlFor="pageSize" className="mr-2 text-sm text-gray-600">
                        Elements Per Page:
                    </label>
                    <CustomDropdown options={[{ id: "10", name: "10" }, { id: "25", name: "25" }, { id: "50", name: "50" }]}
                        id="pageSize"
                        name="pageSize"
                        getValue={(page) => handlePageSizeChange(page)}
                        bgColor="white"
                        textColor="primary"

                    ></CustomDropdown>
                </div>


                <div className="flex justify-center flex-1">
                    <div className="flex gap-2">
                        <button
                            className="px-4 py-2 bg-white border border-blue-200 text-primary rounded-l-default disabled:opacity-50 disabled:text-gray-400 hover:bg-blue-50 transition-colors"
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </button>
                        <span className="px-4 py-2 bg-primary text-text font-medium rounded-md">
                            {currentPage}
                        </span>
                        <button
                            className="px-4 py-2 bg-white border border-blue-200 text-primary rounded-r-default disabled:opacity-50 disabled:text-gray-400 hover:bg-blue-50 transition-colors"
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={noMoreItems}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>


                <div className="w-24 text-right text-sm text-gray-600">
                    <span>{startItem}-{pageSize}</span>
                </div>
            </div>
        </div>
    );
};

export default Paginator;
