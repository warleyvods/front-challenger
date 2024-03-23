import { Box, Button, Checkbox, Flex, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";

import * as yup from "yup";
import { useRouter } from "next/router";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import React from "react";
import { Formik } from 'formik';
import { InputFormik } from "../../components/Form/input";
import SidebarWithHeader from "../../components/SideBar";
import NextLink from "next/link";
import InputMoney from "../../components/Form/MoneyInput";

export const productValidationSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório.').min(3, 'No mínimo 3 caracteres.'),
  description: yup.string().required('Descrição obrigatório.'),
  price: yup.string().required('Preço obrigatório.'),
});

const initialValues = {
  name: '',
  description: '',
  price: '',
  active: true
}

export default function CreateUser() {
  const router = useRouter()
  const createUser = useCreateProduct(() => router.push('/'))

  const handleCreateUser = async (values) => {
    await createUser.mutateAsync(values)
  }

  return (
    <SidebarWithHeader containerSize={"full"}>
      <Flex justifyContent={"space-between"} h={"70px"} alignItems={"center"}>
        <HStack spacing={"10px"}>
          <Text fontSize={"22px"} fontWeight={"medium"}>Adicionar Produto</Text>
        </HStack>
      </Flex>
      <Flex w="100%" maxWidth={"auto"} mx={"auto"}>
        <Box flex={1}
             p={5}
             bg={"white"}
             borderRadius={5}
             borderLeft={"1px"}
             borderBottom={"1px"}
             borderRight={"1px"}
             borderColor={"gray.100"}
             boxShadow="0px 0px 4px rgba(0, 0, 0, 0.1)"
        >
          <Formik initialValues={initialValues}
                  validateOnChange={false}
                  validationSchema={productValidationSchema}
                  onSubmit={handleCreateUser}
          >
            {({handleSubmit, handleChange, values, errors, setFieldValue}) =>
              <>
                <form onSubmit={handleSubmit}>
                  <VStack spacing={8}>
                    <SimpleGrid minChildWidth={"240px"} spacing={8} w={"100%"}>
                      <InputFormik label={"Nome do Produto"}
                                   name={"name"}
                                   important={"*"}
                                   type={"text"}
                                   onChange={handleChange}
                                   value={values.name}
                                   error={errors.name}
                      />
                    </SimpleGrid>
                    <SimpleGrid minChildWidth={"240px"} spacing={8} w={"100%"}>
                      <InputFormik label={"Descrição"}
                                   name={"description"}
                                   important={"*"}
                                   type={"text"}
                                   onChange={handleChange}
                                   value={values.description}
                                   error={errors.description}
                      />
                      <InputMoney
                        onChange={(value) => {
                          setFieldValue("price", value);
                        }}
                        value={values.price}
                        name={"price"}
                        error={errors.price}
                        label={"Preço"}
                        fontSize={{base: "0.9rem", md: "1rem"}}
                        fontWeight={"medium"}
                        important={true}
                      />
                    </SimpleGrid>
                  </VStack>

                  <Checkbox
                    mt={"15px"}
                    id="active"
                    name="active"
                    onChange={handleChange}
                    isChecked={values.active}
                  >
                    Ativo
                  </Checkbox>

                  <Flex justify={"flex-end"} mt={"20px"}>
                    <HStack spacing={1}>
                      <NextLink href={"/"} passHref>
                        <Button fontSize={"13px"} fontWeight={"medium"} colorScheme={"gray"}
                                size={"sm"}>Cancelar</Button>
                      </NextLink>
                      <Button size={"sm"} color={"white"} bg={"black"} fontWeight={"medium"}
                              type={"submit"}>Salvar</Button>
                    </HStack>
                  </Flex>
                </form>
              </>
            }
          </Formik>
        </Box>
      </Flex>
    </SidebarWithHeader>
  );
}
