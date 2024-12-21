import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductCardProps {
    image: string;
    label?: string;
    title: string;
    price: number;
    oldPrice?: number;
    discountInfo?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
    image,
    label,
    title,
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
            className="border rounded-lg shadow-sm bg-white w-64 h-[310px]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {label && (
                <div className="text-sm bg-orange-500  text-white px-2 py-1 rounded-tl-lg rounded-tr-lg">
                    {label}
                </div>
            )}
            <img
                src={image}
                alt={title}
                className="w-full h-40 object-contain mt-2"
            />
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

            {isHovered && (
                <motion.button
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 40, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 bg-orange-500 text-white py-2 px-2 rounded hover:bg-orange-600 w-full flex justify-center mx-"
                >
                    Sepete Ekle
                </motion.button>
            )}
        </div>
    );
};

export default ProductCard;
