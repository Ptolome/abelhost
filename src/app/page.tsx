'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard/ProductCard';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '@/components/ErronMessage/ErronMessage';
import { getProducts } from '@/services/authService';
import { Product, ProductsResponse } from '@/types';
import styles from './page.module.scss';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data: ProductsResponse = await getProducts(12);
      setProducts(data.products);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <ErrorMessage message={error} onRetry={fetchProducts} />;
  }
  
  return (
      <main className={styles.main}>
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Latest Products</h1>
        <p className={styles.heroSubtitle}>Discover our amazing collection</p>
      </section>
      
      <section className={styles.productsSection}>
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}