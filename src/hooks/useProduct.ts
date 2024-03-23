import { useQuery } from "react-query";
import { api } from "../services/api";

type Product = {
  id: number;
  name: number;
  description: string;
  price: string;
  active: number;
}

export type ProductResponse = {
  totalElements: number;
  content: Product[];
}

export async function getProduct(page, size, sort): Promise<ProductResponse> {
  const response = await api.get('v1/product', {
    params: {
      page,
      size,
      sort
    }
  });

  const totalElements = response.data.totalElements
  const content = response.data.content
  return { content, totalElements };
}

export function useProduct(page, size, sort) {
  return useQuery(['product', page, size, sort], () => getProduct(page, size, sort), {
    staleTime: 0,
  })
}
