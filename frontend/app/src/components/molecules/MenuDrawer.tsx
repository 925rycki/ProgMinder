import { FC, useContext } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";

import { MenuDrawerAuthButtons } from "./MenuDrawerAuthButtons";
import { AuthContext } from "../../App";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export const MenuDrawer: FC<Props> = (props) => {
  const { onClose, isOpen } = props;
  const { loading, isSignedIn } = useContext(AuthContext);

  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100" onClick={onClose}>
            <MenuDrawerAuthButtons loading={loading} isSignedIn={isSignedIn} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
