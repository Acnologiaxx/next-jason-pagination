'use client';

import { useEffect, useState } from 'react';
import { useQuery, keepPreviousData, UseQueryResult } from '@tanstack/react-query';
import { fetchUsers } from '../../services/user.service';
import UserCard from '../../components/UserCard';
import LoadMoreButton from '../../components/LoadMoreButton';
import { User } from '../../types/user.types';

const UsersPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { data, error, isLoading, isFetching, isError }: UseQueryResult<{ users: User[], total: number, totalPages: number }, Error> = useQuery({
    queryKey: ['users', page],
    queryFn: () => fetchUsers(page),
    placeholderData: keepPreviousData,
    staleTime: 5000
  });

  useEffect(() => {
    if (data) {
      setAllUsers((prevUsers) => [...prevUsers, ...data.users]);
      setTotalPages(data.totalPages);
    }
  }, [data]);

  const loadMoreUsers = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const hasMore = page < totalPages;

  return (
    <div className="container mx-auto p-4">
      {isError && <p className="text-red-500">{error?.message}</p>}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {allUsers.map((user: User) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ul>
      <div className="mt-4">
        <LoadMoreButton onClick={loadMoreUsers} hasMore={hasMore} />
      </div>
      {(isLoading || isFetching) && <p>Loading...</p>}
    </div>
  );
};

export default UsersPage;