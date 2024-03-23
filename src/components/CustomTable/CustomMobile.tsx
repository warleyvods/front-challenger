import React from "react";
import { Flex, VStack, Text, HStack, IconButton, Icon } from "@chakra-ui/react";
import { ProductResponse } from "../../hooks/useProduct";
import { numberFormat } from "../../pages";
import { RiCloseLine } from "react-icons/ri";
import { ConfirmationDialog } from "../Dialog/ConfirmationDialog";
import { CustomButton } from "./types/ColumnTypes";

type CustomTableMobileProps = {
  data: ProductResponse;
  buttonsOptions: CustomButton;
  onDelete?: (id: number) => void;
};

export default function CustomTableMobile({data, buttonsOptions, onDelete}: CustomTableMobileProps) {

  if (data?.content.length === 0) {
    return (
      <h1>Faça um fallback aqui!</h1>
    )
  }

  return (
    <>
      <VStack>
        {data?.content.map((content, index) => {
          return (
            <Flex key={index}
                  w={"full"}
                  h={"auto"}
                  borderRadius={"5px"}
                  border={"1px"}
                  borderColor={"gray.100"}
                  p={"10px"}
                  justify={"space-between"}
                  bg={"white"}
                  _hover={{
                    boxShadow: "md",
                    zIndex: 2
                  }}
            >
              <VStack alignItems={"start"}>
                <Text>Nome: {content.name}</Text>
                <Text>Descrição: {content.description}</Text>
                <Text fontWeight={"medium"}>Preço: {numberFormat(Number(content.price))}</Text>
              </VStack>
              <HStack>
                <ConfirmationDialog
                  title={buttonsOptions.titleDelete} mainColor={"white"}
                  buttonText={buttonsOptions.buttonTextDelete}
                  description={buttonsOptions.descriptionDelete}
                  onOk={() => onDelete(content.id)}
                  variant={buttonsOptions.deleteVariant}
                  trigger={
                    (onOpen) =>
                      <IconButton
                        as={"a"}
                        colorScheme={"red"}
                        aria-label={"Call Segun"}
                        size="sm"
                        icon={<Icon as={RiCloseLine} fontSize={"16"} />}
                        onClick={onOpen}
                      />
                  }
                />
              </HStack>
            </Flex>
          )
        })}
      </VStack>
    </>
  );
}
