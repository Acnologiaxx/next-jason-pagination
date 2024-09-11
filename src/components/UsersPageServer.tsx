import { fetchUsers } from '@/services/user.service';
import UsersPage from './UsersPage';
import { User } from '@/types/user.types';

interface UsersPageServerProps {
  initialUsers: User[];
  initialTotalPages: number;
}

const UsersPageServer = async () => {
  const initialData = await fetchUsers(1);
  return <UsersPage initialUsers={initialData.users} initialTotalPages={initialData.totalPages} />;
};

export default UsersPageServer;