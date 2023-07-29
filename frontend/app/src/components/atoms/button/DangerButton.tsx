import { FC, ReactNode } from "react";
import { BaseButton } from "./BaseButton";

type Props = {
  children: ReactNode;
  isDisabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const DangerButton: FC<Props> = (props) => (
  <BaseButton colorScheme="red" {...props} />
);
