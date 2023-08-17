import {
  Box,
  Image,
  Text,
  List,
  ListItem,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FollowUserType } from "../../../types/report";

type UserListProps = {
  users: FollowUserType[];
  title: string;
  emptyMessage: string;
};

export const UserList: React.FC<UserListProps> = ({
  users,
  title,
  emptyMessage,
}) => {
  const navigate = useNavigate();

  return (
    <Box m={4}>
      <Heading as="h1" mb="5" size="md" m={2} textAlign="center" mt={{ base: "60px", md: "80px" }}>
        {title}
      </Heading>
      {users.length === 0 ? (
        <Text>{emptyMessage}</Text>
      ) : (
        <List spacing={3} mt="10px">
          {users.map((user) => (
            <ListItem
              key={user.id}
              m={2}
              onClick={() => navigate(`/user/${user.id}`)}
              cursor="pointer"
            >
              <Flex align="center">
                <Image
                  boxSize="50px"
                  borderRadius="full"
                  src={user.image.url}
                  alt={user.name}
                />
                <Text mx={2}>{user.nickname}:</Text>
                <Text>{user.bio}</Text>
              </Flex>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};
