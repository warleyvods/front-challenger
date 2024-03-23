import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { api } from "../services/api";
import { queryClient } from "../services/queryClient";
import { AxiosError } from "axios";

type ErrorType = {
  title: string;
  details: string;
}

export function useDeleteProduct() {
  const toast = useToast()
  return useMutation(async (productId: number) => {
    await api.delete(`v1/product/${productId}`)
    return null;
  }, {
    onSuccess: async () => {
      toast({
        title: "Sucesso!",
        description: "Produto deletado com sucesso!",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top'
      })
      await queryClient.invalidateQueries(['product'])
    }, onError: (error: AxiosError<ErrorType>) => {
      toast({
        title: error.response.data.title,
        description: error.response.data.details,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      })
    }
  });
}
