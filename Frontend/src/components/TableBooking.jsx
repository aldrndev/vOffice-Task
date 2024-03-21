import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const TableBooking = ({ myBooking }) => {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NO</TableColumn>
        <TableColumn>ROOM NAME</TableColumn>
        <TableColumn>BOOKING DATE</TableColumn>
        <TableColumn>START TIME</TableColumn>
        <TableColumn>END TIME</TableColumn>
      </TableHeader>
      <TableBody>
        {myBooking?.map((booking, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{booking.RoomType?.roomName}</TableCell>
            <TableCell>{booking.bookingDate.split("T")[0]}</TableCell>
            <TableCell>{booking.startTime}</TableCell>
            <TableCell>{booking.endTime}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableBooking;
