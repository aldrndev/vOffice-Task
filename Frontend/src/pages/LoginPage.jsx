import { Button, Image, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { MailIcon } from "../components/MailIcon";
import { LockIcon } from "../components/LockIcon";
import { useAuthStore } from "../stores";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { login, error, message, resetMessage, resetError } = useAuthStore(
    (state) => state
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formInput.email, formInput.password, navigate);
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
      }).then(() => {
        resetError();
      });
    }

    if (message) {
      Swal.fire({
        title: "Success",
        text: message,
        icon: "success",
      }).then(() => {
        resetMessage();
      });
    }
  }, [error, message]);

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="flex flex-col items-center bg-white shadow-lg">
        <div className="flex gap-5">
          <div className="w-[650px]">
            <Image
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={650}
              height={450}
            />
          </div>
          <div className="flex flex-col w-[350px] p-5">
            <div className="flex justify-center items-center mb-5">
              <p className="text-gray-600 mb-5">Login to your Account</p>
            </div>
            <form onSubmit={handleSubmit}>
              <Input
                autoFocus
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
                className="mb-4"
                name="email"
                type="email"
                value={formInput.email}
                onChange={handleForm}
              />
              <Input
                endContent={
                  <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Password"
                placeholder="Enter your password"
                type="password"
                variant="bordered"
                className="mb-4"
                name="password"
                value={formInput.password}
                onChange={handleForm}
              />
              <div className="flex justify-center items-center mt-5">
                <Button
                  color="primary"
                  variant="bordered"
                  size="lg"
                  className="w-48 hover:bg-blue-100"
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
