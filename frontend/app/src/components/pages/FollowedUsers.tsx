import { FC, useEffect, useState } from "react";
import { Text, Center } from "@chakra-ui/react";
import { getFollowedUsers } from "../../lib/api/report";
import { FollowUserType } from "../../types/report";
import { UserList } from "../organisms/lists/UserList";
import { useParams } from "react-router-dom";

export const FollowedUsers: FC = () => {
  const idString = useParams<{ id: string }>().id;
  const id = Number(idString);

  const [users, setUsers] = useState<FollowUserType[] | null>(null);

  useEffect(() => {
    getFollowedUsers(id).then((res) => setUsers(res.data));
  }, []);

  if (!users) {
    return <Text>Loading...</Text>;
  }

  return (
    <Center>
      <UserList
        users={users}
        title="フォロワー"
        emptyMessage="フォロワーはいません"
      />
    </Center>
  );
};
