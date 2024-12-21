import { useEffect, useState } from 'react';

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        console.log('deneme')
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:3000/api/product', {
                method: 'POST',
                body: JSON.stringify({ action: 'getProducts' }),
            });
            const data = await response.json();
            console.log(data);
            setProducts(data.data);
        };
        fetchProducts();
    }, []);

    return <div></div>;
};

export default Products;
