import { FC, useEffect, useState } from "react";
import { Center, Text } from "@chakra-ui/react";
import { getFollowingUsers } from "../../lib/api/report";
import { useParams } from "react-router-dom";
import { FollowUserType } from "../../types/report";
import { UserList } from "../organisms/lists/UserList";

export const FollowingUsers: FC = () => {
  const idString = useParams<{ id: string }>().id;
  const id = Number(idString);

  const [users, setUsers] = useState<FollowUserType[] | null>(null);

  useEffect(() => {
    getFollowingUsers(id).then((res) => setUsers(res.data));
  }, []);

  if (!users) {
    return <Text>Loading...</Text>;
  }

  return (
    <Center>
      <UserList users={users} title="フォロー中のユーザー" emptyMessage="フォロー中のユーザーはいません" />
    </Center>
  );
};
