import { useEffect } from "react";
import NavbarPage from "../components/Navbar";
import TableBooking from "../components/TableBooking";
import { useClientStore } from "../stores";

const MyBooking = () => {
  const { fetchMyBooking, myBooking } = useClientStore((state) => state);

  useEffect(() => {
    fetchMyBooking();
  }, []);
  return (
    <>
      <div>
        <NavbarPage />
      </div>
      <div className="w-[1100px] mx-auto mt-10">
        <div className="flex justify-center items-center mb-5">
          <h1 className="text-2xl font-semibold">My Booking</h1>
        </div>
        <div>
          <TableBooking myBooking={myBooking} />
        </div>
      </div>
    </>
  );
};

export default MyBooking;
