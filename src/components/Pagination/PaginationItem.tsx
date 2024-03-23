import { Button,Text, LightMode } from "@chakra-ui/react";

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({isCurrent = false, number, onPageChange}: PaginationItemProps) {
  if (isCurrent) {
    return (
        <Button
                size={"sm"}
                borderRadius={0}
                borderColor={"black"}
                fontSize={"xs"}
                variant={"red"}
                disabled
                bg={"green"}
                color={"white"}
                _hover={{
                  bg: 'gray.700',
                  color: 'white'
                }}
                _disabled={{
                  bgColor: 'black',
                  cursor: 'default'
                }}
        >
          {number}
        </Button>
    )
  }

  return (
    <LightMode>
      <Button onClick={() => onPageChange(number - 1)}
              size={"sm"}
              borderRadius={0}
              border={"1px"}
              borderLeft={0}
              borderColor={"gray.150"}
              fontSize="xs"
              width={4}
              bg={"white"}
              _hover={{
                bg: 'littleGray.500'
              }}>
        <Text fontWeight={"bold"}>{number}</Text>
      </Button>
    </LightMode>
  )
}
