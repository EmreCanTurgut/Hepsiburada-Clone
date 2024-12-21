interface ProductsFilterProps {
    sortOption: string;
    setSortOption: (value: string) => void;
    categoryFilter: string;
    setCategoryFilter: (value: string) => void;
}

const ProductsFilter: React.FC<ProductsFilterProps> = ({
    sortOption,
    setSortOption,
    categoryFilter,
    setCategoryFilter,
}) => {
    return (
        <div className="text-gray-700 bg-gray-100 w-fit px-4 rounded-md mx-auto mb-8">
            <div className="flex items-center p-4 gap-5">
                <div className="flex items-center gap-2">
                    <label className="text-sm font-semibold">Sort By:</label>
                    <select
                        className="border border-gray-300 rounded-md p-1"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="price">Azalan Fiyata Göre</option>
                        <option value="discount">Artan Fiyata Göre</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm font-semibold">Category:</label>
                    <select
                        className="border border-gray-300 rounded-md p-1"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="Elektronik">Elektronik</option>
                        <option value="Giyim">Giyim</option>
                        <option value="Spor">Spor</option>
                        <option value="Oyuncak">Oyuncak</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ProductsFilter;
