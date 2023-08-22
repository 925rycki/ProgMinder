import { FC, useContext } from "react";
import { Box, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../App";
import { AuthButtons } from "../../molecules/AuthButtons";
import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";

export const Header: FC = () => {
  const { loading, isSignedIn } = useContext(AuthContext);
  const { onClose, isOpen, onOpen } = useDisclosure();
  const navigate = useNavigate();

  return (
    <>
      <Flex
        as="nav"
        bg="blue.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
        position="fixed"
        width="100%"
        top="0"
        zIndex={1}
      >
        <Flex align="center" as="a" _hover={{ cursor: "pointer" }}>
          <Heading
            as="h1"
            fontSize={{ base: "md", md: "lg" }}
            onClick={() => navigate("/timeline")}
          >
            ProgMinder
          </Heading>
        </Flex>
        <Box display={{ base: "none", md: "block" }}>
          <AuthButtons loading={loading} isSignedIn={isSignedIn} />
        </Box>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer onClose={onClose} isOpen={isOpen} />
    </>
  );
};
