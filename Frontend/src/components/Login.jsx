import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { MailIcon } from "./MailIcon.jsx";
import { LockIcon } from "./LockIcon.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/index.js";
import Swal from "sweetalert2";
const Login = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  const { login, error, message, resetMessage, resetError } = useAuthStore(
    (state) => state
  );

  const navigate = useNavigate();

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
      });
      resetError();
    }
    if (message) {
      Swal.fire({
        title: "Success",
        text: message,
        icon: "success",
      });
      resetMessage();
    }
  }, [error, message]);

  return (
    <>
      <Button
        onPress={onOpen}
        color="default"
        variant="flat"
        className="hover:bg-gray-300"
      >
        Login
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <form onSubmit={handleSubmit}>
                <ModalBody>
                  <Input
                    autoFocus
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Email"
                    placeholder="Enter your email"
                    variant="bordered"
                    type="email"
                    name="email"
                    onChange={handleForm}
                    value={formInput.email}
                  />
                  <Input
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                    name="password"
                    onChange={handleForm}
                    value={formInput.password}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="bordered"
                    onPress={onClose}
                    className="hover:bg-red-100"
                  >
                    Close
                  </Button>
                  <Button
                    color="primary"
                    variant="bordered"
                    className="hover:bg-blue-100"
                    type="submit"
                  >
                    Sign in
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;
