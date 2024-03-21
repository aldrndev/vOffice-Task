import { Card, CardBody, Image, CardFooter } from "@nextui-org/react";
import DetailCard from "./DetailCard";
import BookNow from "./BookNow";

const CardPage = ({ roomTypes }) => {
  return (
    <div className="gap-4 grid grid-cols-3">
      {roomTypes?.map((item, index) => (
        <Card shadow="sm" key={index} isPressable className="mb-5 shadow-lg">
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.roomName}
              className="w-full object-cover h-[140px]"
              src={item.roomImg}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.roomName}</b>
            <p className="text-default-500">{item.costPerHour}</p>
          </CardFooter>
          <CardFooter className="text-small justify-between">
            <DetailCard room={item} />
            <BookNow room={item} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CardPage;
