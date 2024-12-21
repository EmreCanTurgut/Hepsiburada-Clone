import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import ProductsFilter from './ProductsFilter';
import { DUMMY_PRODUCTS } from '@/data/Products';

export interface Product {
    id: number;
    product_name: string;
    price: number;
    product_image: string;
    category: string;
    discount: string | number | null | undefined;
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>(DUMMY_PRODUCTS);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [sortOption, setSortOption] = useState<string>('discount');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const response = await fetch('http://localhost:3000/api/product', {
    //             method: 'POST',
    //             body: JSON.stringify({ action: 'getProducts' }),
    //             headers: { 'Content-Type': 'application/json' },
    //         });
    //         const data = await response.json();
    //         console.log(data.data)
    //         setProducts(data.data);
    //         setFilteredProducts(data.data);
    //     };
    //     fetchProducts();
    // }, []);

    useEffect(() => {
        let filtered = [...products];

        if (categoryFilter !== 'all') {
            filtered = filtered.filter(
                (product) => product.category === categoryFilter
            );
        }

        if (sortOption === 'price') {
            filtered.sort((a, b) => b.price - a.price); 
        } else if (sortOption === 'discount') {
            filtered.sort((a, b) => a.price - b.price); 
        }

        setFilteredProducts(filtered);
    }, [sortOption, categoryFilter, products]);

    return (
        <div className="p-4">
            {products.length === 0 && <div>Loading...</div>}
            {products.length > 0 && (
                <>
                    <ProductsFilter
                        sortOption={sortOption}
                        setSortOption={setSortOption}
                        categoryFilter={categoryFilter}
                        setCategoryFilter={setCategoryFilter}
                    />
                    <div className="flex flex-wrap justify-center gap-5">
                        {filteredProducts.map((product: Product) => (
                            <div
                                key={product.id}
                                className="flex-[1_1_21%] max-w-[21%] min-w-[250px]"
                            >
                                <ProductCard
                                    image={product.product_image}
                                    price={product.price}
                                    title={product.product_name}
                                    discountInfo={typeof product.discount === 'string' ? product.discount : undefined}
                                    label={product.product_name}
                                />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Products;
