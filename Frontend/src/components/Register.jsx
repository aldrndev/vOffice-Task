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
import { MdAccountCircle } from "react-icons/md";
import { MdAddIcCall } from "react-icons/md";
import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/index.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const { register, error, message, resetError, resetMessage } = useAuthStore(
    (state) => state
  );

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(
      formInput.name,
      formInput.email,
      formInput.password,
      formInput.phone,
      navigate
    );
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
        Register
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Register
              </ModalHeader>
              <form onSubmit={handleSubmit}>
                <ModalBody>
                  <Input
                    autoFocus
                    endContent={
                      <MdAccountCircle className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Name"
                    placeholder="Enter your name"
                    variant="bordered"
                    onChange={handleForm}
                    name="name"
                    value={formInput.name}
                  />
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
                    name="password"
                    value={formInput.password}
                    onChange={handleForm}
                  />
                  <Input
                    autoFocus
                    endContent={
                      <MdAddIcCall className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Phone"
                    placeholder="Enter your phone"
                    variant="bordered"
                    name="phone"
                    value={formInput.phone}
                    onChange={handleForm}
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
                    Register
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

export default Register;
