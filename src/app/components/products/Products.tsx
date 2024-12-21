import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

export interface Product {
    id: number;
    product_name: string;
    price: number;
    product_image: string;
    category: string;
    discount: string;
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:3000/api/product', {
                method: 'POST',
                body: JSON.stringify({ action: 'getProducts' }),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            setProducts(data.data);
        };
        fetchProducts();
    }, []);

    return (
        <div className="p-4">
            {products.length === 0 && <div>Loading...</div>}
            {products.length > 0 && (
                <div className="flex flex-wrap justify-center gap-5">
                    {products.map((product: Product) => (
                        <div
                            key={product.id}
                            className="flex-[1_1_21%] max-w-[21%] min-w-[250px]"
                        >
                            <ProductCard
                                image={product.product_image}
                                price={product.price}
                                title={product.product_name}
                                discountInfo={product.discount}
                                label={product.product_name}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
