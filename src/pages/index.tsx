import React, { useState } from 'react';
import { Button, Flex, HStack, Spinner, Text, useBreakpointValue } from "@chakra-ui/react";
import SidebarWithHeader from "../components/SideBar";
import NextLink from "next/link";
import { RiAddLine } from "react-icons/ri";
import { ButtonOptions, CustomButton, TableColumn, TableHeadProps } from "../components/CustomTable/types/ColumnTypes";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { useProduct } from "../hooks/useProduct";
import CustomTable from "../components/CustomTable/CustomTable";
import CustomTableMobile from "../components/CustomTable/CustomMobile";

const columns: TableColumn[] = [
  {name: {name: "name"}, align: "start", label: "Nome"},
  {name: {name: "description"}, align: "center", label: "Descrição"},
  {name: {name: "price", fontWeight: "medium", function: parseMoney}, align: "center", label: "Preço"},
  {name: {name: "active"}, align: "center", label: "Status", tag: {trueLabel: "Ativo", falseLabel: "Inativo"}}
];

const tableHead: TableHeadProps = {
  menuOptions: [
    {value: 'name', label: 'Nomes'},
    {value: 'description', label: 'Descrição'},
    {value: 'price', label: 'Preço'},
    {value: 'active', label: 'Ativo'}
  ],
  buttonOptions: [
    {value: 'all', label: 'Todos', active: true},
  ],
  activeSearch: true
}

const buttonOptions: CustomButton = {
  editPath: "/product/[id]",
  titleDelete: "Deletar produto",
  descriptionDelete: "Deseja deletar este produto? Essa ação não poderá ser desfeita.",
  buttonTextDelete: "Deletar",
  deleteVariant: "danger"
}

const buttonsOptions: ButtonOptions = {
  active: true,
  editIsModal: {
    active: false
  },
  deleteButton: true
}

function parseMoney(name: string): string {
  return numberFormat(Number(name));
}

export function numberFormat(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export default function OutsourcedList() {
  //RESPONSIVIDADE
  const isMobile = useBreakpointValue({base: true, md: true, lg: false});

  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [sort, setSort] = useState<string>();
  const [active, setActive] = useState<boolean>();
  const [keyword, setKeyword] = useState<string>();

  const {data: products, isLoading, error} = useProduct(page, sizePerPage, sort);
  const {mutate: deleteProduct} = useDeleteProduct()

  const handleDeleteProduct = (productId: number) => {
    deleteProduct(productId)
  }

  const handleSort = (sort: string) => {
    setSort(sort)
  }

  const handleActiveButtonClick = (activeButton: string) => {
    setActive(activeButton === "active" ? true : activeButton === "inactive" ? false : null);
  };

  const handleSizePerPage = (sizePerPage: number) => {
    setSizePerPage(sizePerPage)
  }

  const handlePage = (page: number) => {
    setPage(page)
  }

  const handleKeyword = (keyword: string) => {
    setKeyword(keyword)
  }

  return (
    <SidebarWithHeader containerSize={"full"}>
      <Flex h={"55px"} alignItems={"center"} justify={"space-between"}>
        <HStack>
          <Text fontSize={"22px"} fontWeight={"medium"}>Produtos</Text>
          {isLoading && (<Spinner size={"sm"} />)}
        </HStack>
        <NextLink href={"/product/create"} passHref>
          <Button
            size={"sm"}
            fontSize={"sm"}
            fontWeight={"medium"}
            bg={"black"}
            color={"white"}
            leftIcon={<RiAddLine fontSize={"20"} />}
          >
            Adicionar
          </Button>
        </NextLink>
      </Flex>

      { isMobile ? (
        <CustomTableMobile data={products} buttonsOptions={buttonOptions} onDelete={handleDeleteProduct} />
        ) : (
        <CustomTable
          columns={columns}
          data={products}
          tableHeadOptions={tableHead}
          actualPage={page}
          sizePerPage={sizePerPage}
          onSort={handleSort}
          onKeyword={handleKeyword}
          onActive={handleActiveButtonClick}
          onPage={handlePage}
          onSizePerPage={handleSizePerPage}
          buttonOptionalColumns={buttonsOptions}
          buttonsOptions={buttonOptions}
          activeSearch={false}
          onDelete={handleDeleteProduct}
          tableHeight={3}
        />
      ) }
    </SidebarWithHeader>
  );
}
