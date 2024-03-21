import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { useAuthStore } from "../stores";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AvatarPage = () => {
  const { logout } = useAuthStore((state) => state);
  const navigate = useNavigate();

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  const handleLogout = (e) => {
    logout(navigate);
    Swal.fire({
      title: "Success",
      text: "Logout successfully",
      icon: "success",
    });
  };

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">{name}</p>
            <p className="font-semibold">{email}</p>
          </DropdownItem>
          <DropdownItem key="mybooking">
            <Link to="/booking">My Booking</Link>
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={handleLogout}>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default AvatarPage;
