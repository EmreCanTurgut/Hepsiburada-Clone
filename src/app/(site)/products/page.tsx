'use client'
import ProductCard from '@/components/products/ProductCard';

const Page = () => {
    return (
        <ProductCard
            image="https://productimages.hepsiburada.net/s/777/200-200/110000814378394.jpg/format:webp"
            price={250}
            rating={4}
            reviewCount={5}
            title="Hesap Makinesi"
            discountInfo="20"
            label='Hesap Makinesi'
            key={15}
            oldPrice={300}
        />
    );
};

export default Page;
