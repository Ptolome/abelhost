import axios from 'axios';
import { api, publicApi } from './api';
import { AuthCredentials, User, ProductsResponse, CartResponse } from '@/types';

export const loginUser = async (credentials: AuthCredentials): Promise<User> => {
  try {
    const response = await api.post<User>('/auth/login', credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
    throw error;
  }
};

// Метод для получения продуктов (из /products)
export const getProducts = async (limit: number = 12): Promise<ProductsResponse> => {
  try {
    const response = await publicApi.get<ProductsResponse>(`/products?limit=${limit}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
    throw error;
  }
};

// Метод для получения корзин (из /carts) - если действительно нужны корзины
export const getCarts = async (limit: number = 10): Promise<CartResponse> => {
  try {
    const response = await publicApi.get<CartResponse>(`/carts?limit=${limit}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch carts');
    }
    throw error;
  }
};

// Метод для получения одного продукта по ID
export const getProductById = async (id: number) => {
  try {
    const response = await publicApi.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch product');
    }
    throw error;
  }
};

// Метод для поиска продуктов
export const searchProducts = async (query: string, limit: number = 12) => {
  try {
    const response = await publicApi.get(`/products/search?q=${query}&limit=${limit}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to search products');
    }
    throw error;
  }
};