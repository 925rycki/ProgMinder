import { FC, ReactNode } from "react";
import { Button } from "@chakra-ui/react";

type BaseButtonProps = {
  children: ReactNode;
  isDisabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  colorScheme: string;
};

export const BaseButton: FC<BaseButtonProps> = (props) => {
  const { children, isDisabled = false, onClick, colorScheme } = props;

  return (
    <Button
      bg={`${colorScheme}.500`}
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
