import { useToast } from "@chakra-ui/react";

type Props = {
  title: string;
  status: "info" | "warning" | "success" | "error";
};

export const useMessage = () => {
  const toast = useToast();

  const showMessage = (props: Props) => {
    const { title, status } = props;
    toast({
      title,
      status,
      position: "top",
      duration: 1000,
      isClosable: true,
    });
  };

  return { showMessage };
};
