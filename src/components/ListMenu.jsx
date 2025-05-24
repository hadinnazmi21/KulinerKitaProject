import { NavLink } from "react-router-dom";

export default function ListMenu({ id, icon, label, to }) {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2
    ${
      isActive
        ? "text-hijau bg-green-200 font-extrabold"
        : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
    }`;

  return (
    <li>
      <NavLink id={id} to={to} className={menuClass}>
        <span className="mr-4 text-xl">{icon}</span>
        {label}
      </NavLink>
    </li>
  );
}