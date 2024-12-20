// ProductCard.tsx
import React, { useState } from 'react';

interface ProductCardProps {
    image: string;
    label?: string;
    title: string;
    rating: number;
    reviewCount: number;
    price: number;
    oldPrice?: number;
    discountInfo?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
    image,
    label,
    title,
    rating,
    reviewCount,
    price,
    oldPrice,
    discountInfo,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            className="border rounded-lg shadow-sm p-4 bg-white w-64"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {label && (
                <div className="text-sm bg-orange-500 text-white px-2 py-1 rounded">
                    {label}
                </div>
            )}
            <img
                src={image}
                alt={title}
                className="w-full h-40 object-contain mt-2"
            />
            <h3 className="text-sm font-medium mt-2">{title}</h3>
            <div className="flex items-center mt-2 text-yellow-500">
                {'★'.repeat(Math.floor(rating))}
                {'☆'.repeat(5 - Math.floor(rating))}
                <span className="text-gray-500 text-xs ml-2">
                    ({reviewCount})
                </span>
            </div>
            <div className="mt-2">
                <span className="text-lg font-bold text-green-600">
                    {price} TL
                </span>
                {oldPrice && (
                    <span className="text-sm line-through text-gray-500 ml-2">
                        {oldPrice} TL
                    </span>
                )}
            </div>
            {discountInfo && (
                <div className="text-sm text-green-500 mt-1">
                    {discountInfo}
                </div>
            )}
            {isHovered && (
                <button className="mt-3 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 w-full">
                    Sepete Ekle
                </button>
            )}
        </div>
    );
};

export default ProductCard;