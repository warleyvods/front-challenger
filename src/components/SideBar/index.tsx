import {
  Avatar,
  Box,
  Container,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { MdHome } from "react-icons/md";
import React, { ReactNode } from "react";
import NextLink from "next/link";
import { IconType } from "react-icons";


export default function SidebarWithHeader({children, containerSize = "7xl"}: { children?: ReactNode; containerSize?: string }) {
  const sidebar = useDisclosure();

  return (
    <Box as="section" bg="gray.50" _dark={{bg: "gray.700",}} minH="100vh">
      <SidebarContent display={{base: "none", md: "unset",}} />
      <Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{base: 0, md: 60,}} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify={{base: "space-between", md: "flex-end"}}
          w="full"
          px="4"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          borderBottomWidth="1px"
          color="inherit"
          h="14"
        >
          {/*ICONE DO HAMBURGER*/}
          <IconButton
            aria-label="Menu"
            display={{
              base: "inline-flex",
              md: "none",
            }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{boxShadow: 'none'}}>
              <HStack>
                <Avatar
                  size={"sm"}
                  borderColor={"gray.400"}
                  showBorder={true}
                />
                <VStack
                  display={{base: 'none', md: 'flex'}}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Administrador</Text>
                </VStack>
                <Box display={{base: 'none', md: 'flex'}}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList>
              <NextLink href={"#"}>
                <MenuItem>
                  Desconectar
                </MenuItem>
              </NextLink>
            </MenuList>
          </Menu>
        </Flex>
        <Container p={'15px'} maxW={containerSize}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

type NavItemProps = {
  icon?: IconType;
  children: ReactNode;
  href?: string;
  onClick?: () => void;

  pl?: string | number;
  py?: string | number;
}

const NavItem = ({icon, children, href, ...rest}: NavItemProps) => {
  const color = useColorModeValue("gray.600", "gray.300");
  return (
    <NextLink href={href} passHref>
      <Flex
        borderRadius={"md"}
        as="a"
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color="inherit"
        _dark={{
          color: "gray.400",
        }}
        _hover={{
          bg: "gray.100",
          _dark: {
            bg: "gray.900",
          },
          color: "gray.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color: color,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </NextLink>
  );
};

const SidebarContent = (props) => {
  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
      border
      color="inherit"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex justify={"flex-start"} px={"30px"} py="5" align="flex-start">
        {/*<Logo />*/}
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
        p={2}
      >
        <NavItem icon={MdHome} href={"/"}>Principal</NavItem>
      </Flex>
    </Box>
  )
};
