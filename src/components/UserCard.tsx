import { User, UserSchema } from "../types/user.types";
import { FC } from "react";
import Image from "next/image";

interface UserCardProps {
  user: User;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  const parsedUser = UserSchema.safeParse(user);
  if (!parsedUser.success) {
    console.error("Invalid user data", parsedUser.error);
    return (
      <li className="p-4 rounded-md bg-red-100">
        <p className="text-red-500">Error: Invalid user data. Please try again later or contact support.</p>
      </li>
    );
  }

  return (
    <li className="p-4 rounded-md bg-white flex flex-col items-center space-y-2">
      <Image
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        width={50}
        height={50}
        className="rounded-full"
      />
      <p className="text-gray-500">{user.id}</p>
      <p className="text-gray-500">{user.email}</p>
      <p className="text-lg font-semibold">
        {user.first_name} {user.last_name}
      </p>
    </li>
  );
};

export default UserCard;