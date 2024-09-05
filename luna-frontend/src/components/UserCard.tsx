import Avatar from "../assets/img/avatar.jpeg";

export interface UserCardProp {
  user: {
    firstName: string;
    avatar: string;
    lastName: string;
    description: string;
  };
}

function UserCard({ user }: UserCardProp) {
  return (
    <li key={user?.firstName}>
      <img
        alt=""
        src={
          user.avatar
            ? `https://picky-70o0.onrender.com/images/${user?.avatar}`
            : `${Avatar}`
        }
        className="mx-auto h-56 w-56 rounded-full"
      />
      <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
        {user?.firstName?.charAt(0).toUpperCase() + user?.firstName?.slice(1)}{" "}
        {user?.lastName?.charAt(0).toUpperCase() + user?.lastName?.slice(1)}
      </h3>
      <p className="text-sm leading-6 text-gray-600">{user?.description}</p>
    </li>
  );
}

export default UserCard;
