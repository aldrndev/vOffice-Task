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
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useClientStore } from "../stores";

const BookNow = ({ room }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { bookRoom, message, error, resetMessage, resetError } = useClientStore(
    (state) => state
  );

  const [formInput, setFormInput] = useState({
    bookingDate: "",
    startTime: "",
    endTime: "",
    quotaUsed: "",
  });

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    bookRoom(
      formInput.bookingDate,
      formInput.startTime,
      formInput.endTime,
      formInput.quotaUsed,
      room.id
    );
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
        Book Now
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Book Now
              </ModalHeader>
              <form onSubmit={handleSubmit}>
                <ModalBody>
                  <Input
                    autoFocus
                    label="Booking Date"
                    type="date"
                    variant="bordered"
                    name="bookingDate"
                    value={formInput.bookingDate}
                    onChange={handleChangeForm}
                  />
                  <Input
                    autoFocus
                    label="Start Time"
                    type="time"
                    variant="bordered"
                    name="startTime"
                    value={formInput.startTime}
                    onChange={handleChangeForm}
                  />
                  <Input
                    autoFocus
                    label="End Time"
                    type="time"
                    variant="bordered"
                    name="endTime"
                    value={formInput.endTime}
                    onChange={handleChangeForm}
                  />
                  <Input
                    autoFocus
                    label="Total Room"
                    type="number"
                    variant="bordered"
                    name="quotaUsed"
                    value={formInput.quotaUsed}
                    onChange={handleChangeForm}
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
                    Book Now
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

export default BookNow;
