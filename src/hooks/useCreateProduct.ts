import { useMutation } from "react-query";

import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { api } from "../services/api";
import { queryClient } from "../services/queryClient";

export type Product = {
  id: number;
  name: number;
  description: string;
  price: string;
  active: number;
}

type ErrorType = {
  title: string;
  details: string;
}

export function useCreateProduct(onSuccess?: () => {}, onError?: () => {}) {
  const toast = useToast()

  return useMutation(async (product: Product) => {
    const response = await api.post('v1/product', {
      ...product
    });

    return response.data.user;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['product'])
      onSuccess?.()
      toast({
        title: "Sucesso!",
        description: "Produto cadastrado!",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top'
      })
    }, onError: (error: AxiosError<ErrorType>) => {
      onError?.()

      toast({
        title: error.response.data.title,
        description: error.response.data.details,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  });
}
