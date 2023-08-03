import { FC, useEffect, useState } from "react";
import { Box, Image, Text, Heading, List, ListItem, Flex, Center } from "@chakra-ui/react";
import { getFollowingUsers } from "../../lib/api/report";
import { useNavigate, useParams } from "react-router-dom";
import { FollowUserType } from "../../types/report";

export const FollowingUsers: FC = () => {
  const idString = useParams<{ id: string }>().id;
  const id = Number(idString);

  const navigate = useNavigate();

  const [users, setUsers] = useState<FollowUserType[] | null>(null);

  useEffect(() => {
    getFollowingUsers(id).then((res) => setUsers(res.data));
  }, []);

  if (!users) {
    return <Text>Loading...</Text>;
  }

  return (
    <Center>
    <Box m={4}>
      <Heading as="h1" mb="5" size="md" m={2} textAlign="center">
        フォロー中のユーザー
      </Heading>
      {
        users.length === 0 ? <Text>フォロー中のユーザーはいません</Text> :
      <List spacing={3}>
        {users.map((user) => (
          <ListItem key={user.id} m={2} onClick={() => navigate(`/user/${user.id}`)} cursor="pointer">
            <Flex align="center">
              <Image boxSize="50px" borderRadius="full" src={user.image.url} alt={user.name} />
              <Text mx={2}>{user.nickname}:</Text>
              <Text>{user.bio}</Text>
            </Flex>
          </ListItem>
        ))}
      </List>
}
    </Box>
    </Center>
  );
};
