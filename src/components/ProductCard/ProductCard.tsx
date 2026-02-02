'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useAuthStore } from '@/store/authStore';
import st from './Product.module.scss';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product:{title, category, price,thumbnail }}) => {
  const { user } = useAuthStore();
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  

  const fallbackImage = 'https://via.placeholder.com/300x200?text=No+Image';
  
  return (
    <div className={st.card}>
      <div className={st.imageContainer}>
        <Image
          src={imageError ? fallbackImage : thumbnail}
          alt={title}
          fill
          className={st.image}
          onError={handleImageError}
          loading="lazy"
          quality={75}
        />
      </div>
      
      <div className={st.content}>
        <h3 className={st.title}>{title}</h3>
        <p className={st.category}>{category}</p>
        <div className={st.priceSection}>
          <span className={st.price}>${price.toFixed(2)}</span>
          {user && (
            <button className={st.addToCartButton}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;