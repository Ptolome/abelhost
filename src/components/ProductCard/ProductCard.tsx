'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useAuthStore } from '@/store/authStore';
import styles from './Product.module.scss';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user } = useAuthStore();
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  // Фолбэк изображение на случай ошибки загрузки
  const fallbackImage = 'https://via.placeholder.com/300x200?text=No+Image';
  
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={imageError ? fallbackImage : product.thumbnail}
          alt={product.title}
          fill
          className={styles.image}
          onError={handleImageError}
          loading="lazy"
          quality={75}
        />
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.category}>{product.category}</p>
        <div className={styles.priceSection}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          {user && (
            <button className={styles.addToCartButton}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;