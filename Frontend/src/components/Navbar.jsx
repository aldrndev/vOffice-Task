import { Link } from "react-router-dom";
import AvatarPage from "./Avatar";
import Login from "./Login";
import Register from "./Register";

const NavbarPage = () => {
  const isLogin = localStorage.getItem("isLogin") === "true";

  return (
    <div className="bg-white shadow-md">
      <div className="w-[1100px] mx-auto flex justify-between items-center p-4">
        <div>
          <Link to="/">
            <p className="text-xl font-bold">VOFFICE</p>
          </Link>
        </div>
        <div className="flex justify-end gap-3">
          {!isLogin ? (
            <>
              <div>
                <Login />
              </div>
              <div>
                <Register />
              </div>
            </>
          ) : (
            <div>
              <AvatarPage />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarPage;
