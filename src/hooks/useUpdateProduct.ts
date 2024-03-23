import { useMutation } from "react-query";

import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { api } from "../services/api";
import { queryClient } from "../services/queryClient";
import { Product } from "./useCreateProduct";


type ErrorType = {
  title: string;
  details: string;
}

export function useUpdateProduct(onSuccess?: () => {}, onError?: () => {}) {
  const toast = useToast()

  return useMutation(async (product: Product) => {
    const response = await api.put('v1/product', {
      ...product
    })

    return response.data.user;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['product'])
      onSuccess?.()
      toast({
        title: "Sucesso!",
        description: "Produto atualizado com sucesso!",
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
