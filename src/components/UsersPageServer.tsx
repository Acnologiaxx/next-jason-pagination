import { fetchUsers } from '@/services/user.service';
import UsersPage from './UsersPage';

const UsersPageServer = async () => {
  const initialData = await fetchUsers(1);
  return <UsersPage initialUsers={initialData.users} initialTotalPages={initialData.totalPages} />;
};

export default UsersPageServer;