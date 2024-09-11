'use client';

import { useState } from 'react';
import UserCard from '@/components/UserCard';
import LoadMoreButton from '@/components/LoadMoreButton';
import { User } from '@/types/user.types';
import { loadMoreUsers } from '@/lib/actions';

interface UsersPageProps {
  initialUsers: User[];
  initialTotalPages: number;
}

const UsersPage: React.FC<UsersPageProps> = ({ initialUsers, initialTotalPages }) => {
  const [page, setPage] = useState(1);
  const [allUsers, setAllUsers] = useState<User[]>(initialUsers);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  const handleLoadMore = async () => {
    const { updatedUsers, totalPages, nextPage } = await loadMoreUsers(page, allUsers);
    setAllUsers(updatedUsers);
    setTotalPages(totalPages);
    setPage(nextPage);
  };

  const hasMore = page < totalPages;

  return (
    <div className="container mx-auto p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {allUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ul>
      <div className="mt-4">
        <LoadMoreButton onClick={handleLoadMore} hasMore={hasMore} />
      </div>
    </div>
  );
};

export default UsersPage;