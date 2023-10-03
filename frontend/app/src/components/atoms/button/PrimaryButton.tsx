import { CSSProperties, FC, ReactNode } from "react";
import { BaseButton } from "./BaseButton";

type Props = {
  children: ReactNode;
  isDisabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
};

export const PrimaryButton: FC<Props> = (props) => (
  <BaseButton colorScheme="blue" {...props} />
);
