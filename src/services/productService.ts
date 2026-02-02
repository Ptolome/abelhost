
import axios from 'axios';
import { publicApi } from './api';
import { ProductsResponse } from '@/types';

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
