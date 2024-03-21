import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
} from "@nextui-org/react";

const DetailCard = ({ room }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} variant="flat" className="hover:bg-gray-300">
        Detail
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Detail Room
              </ModalHeader>
              <ModalBody>
                <div>
                  <Image src={room.roomImg} />
                </div>
                <p>Name: {room.roomName}</p>
                <p>Type: {room.Room?.roomName}</p>
                <p>Cost Per Hour: {room.costPerHour}</p>
                <p>Room Available: {room.capacity}</p>
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
                  onPress={onClose}
                  className="hover:bg-blue-100"
                >
                  Ok
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DetailCard;
