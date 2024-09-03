import { User, UserSchema } from "../types/user.types";
import { FC } from "react";
import Image from "next/image";

interface UserCardProps {
  user: User;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  const parsedUser = UserSchema.safeParse(user);
  if (!parsedUser.success) {
    return (
      <li className="p-4 rounded-md bg-red-100">
        <p className="text-red-500">Error: Invalid user data. Please try again later or contact support.</p>
      </li>
    );
  }

  const { avatar, id, email, first_name, last_name } = parsedUser.data;

  return (
    <li className="p-4 rounded-md bg-white flex flex-col items-center space-y-2">
      <Image
        src={avatar ?? "/default-avatar.png"}
        alt={`${first_name} ${last_name}`}
        width={50}
        height={50}
        className="rounded-full"
        style={{ width: 'auto', height: 'auto' }} 
        priority
        loading="eager"
        quality={75}
      />
      <p className="text-gray-500">{id}</p>
      <p className="text-gray-500">{email}</p>
      <p className="text-lg font-semibold">
        {first_name} {last_name}
      </p>
    </li>
  );
};

export default UserCard;