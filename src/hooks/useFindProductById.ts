import { useQuery } from "react-query";
import { Product } from "./useCreateProduct";
import { api } from "../services/api";


async function getProductById(id: number): Promise<Product> {
  const response = await api.get<Product>('v1/product/' + id);
  return response.data;
}

export function useProductById(id: number) {
  return useQuery(['product', id], async () => getProductById(id), {
    enabled: id !== undefined,
    staleTime: 0,
    cacheTime: 0
  })
}
