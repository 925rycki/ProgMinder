import { FC, ReactNode } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  isDisabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const DangetButton: FC<Props> = (props) => {
  const { children, isDisabled = false, onClick } = props;

  return (
    <Button
      bg="red.500"
      color="white"
      fontSize="sm"
      isDisabled={isDisabled}
      _hover={{ opacity: 0.8 }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
