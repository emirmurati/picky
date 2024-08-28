import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Avatar from "../assets/img/avatar.jpeg";
const people = [
  {
    name: "Whitney Francis",
    role: "Copywriter",
    imageUrl:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    xUrl: "#",
    linkedinUrl: "#",
  },
  // More people...
];

function UserCard({ user }) {
  return (
    <li key={user?.firstName}>
      <img
        alt=""
        src={
          user.avatar
            ? `https://picky-70o0.onrender.com/images/${user?.avatar}`
            : Avatar
        }
        className="mx-auto h-56 w-56 rounded-full"
      />
      <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
        {user?.firstName.charAt(0).toUpperCase() + user?.firstName.slice(1)}{" "}
        {user?.lastName.charAt(0).toUpperCase() + user?.lastName.slice(1)}
      </h3>
      <p className="text-sm leading-6 text-gray-600">{user?.description}</p>
    </li>
  );
}

export default UserCard;
