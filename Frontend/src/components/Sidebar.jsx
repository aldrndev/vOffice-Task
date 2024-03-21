import {
  Input,
  CheckboxGroup,
  Checkbox,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon.jsx";
import CardPage from "./Card.jsx";
import PaginationPage from "./Pagination.jsx";
import { useClientStore } from "../stores";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const { fetchRooms, fetchRoomTypes, rooms, roomTypes, pagination } =
    useClientStore((state) => state);

  const [selectedFilter, setSelectedFilter] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const handleFilterChange = (selected) => {
    setSelectedFilter(selected);
  };

  console.log(sortBy);

  const handleSelectchange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePageChange = (page) => {
    setcurrentPage(page);
  };

  useEffect(() => {
    fetchRoomTypes(selectedFilter, searchQuery, sortBy, currentPage);
    fetchRooms();
  }, [selectedFilter, searchQuery, sortBy, currentPage]);

  useEffect(() => {
    const totalPages = pagination?.totalPages;
    setTotalPage(totalPages);
  }, [pagination]);

  return (
    <div className="w-[1100px] mx-auto mt-10">
      <div className="flex justify-between">
        <div className="w-[300px] min-h-screen bg-white">
          <div className="p-8">
            <CheckboxGroup
              label="Filter Room Type"
              value={selectedFilter}
              onChange={handleFilterChange}
            >
              {rooms.map((item, index) => (
                <div key={index}>
                  <Checkbox value={item.id}>{item.roomName}</Checkbox>
                </div>
              ))}
            </CheckboxGroup>
          </div>
        </div>
        <div className="flex flex-grow bg-white p-5 flex-col">
          <div className="flex justify-between">
            <div>
              <Input
                classNames={{
                  base: "max-w-full h-10",
                  mainWrapper: "h-full",
                  input: "text-small",
                  inputWrapper: "h-full font-normal text-default-500",
                }}
                placeholder="Search room..."
                size="lg"
                startContent={<SearchIcon size={18} />}
                type="search"
                variant="bordered"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target?.value)}
              />
            </div>
            <div>
              <div className="w-full flex flex-col">
                <div className="flex w-full flex-wrap mb-6">
                  <Select
                    selectedKeys={[sortBy]}
                    onChange={handleSelectchange}
                    variant="bordered"
                    label="Sort by"
                    className="w-48"
                  >
                    <SelectItem key={"lowest"} value="lowest">
                      Lowest Price
                    </SelectItem>
                    <SelectItem key={"highest"} value="highest">
                      Highest Price
                    </SelectItem>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div>
            <CardPage
              roomTypes={roomTypes}
              selectedFilter={selectedFilter}
              searchQuery={searchQuery}
              sortBy={sortBy}
            />
          </div>
          <div className="flex justify-center items-center mt-7">
            <PaginationPage
              currentPage={currentPage}
              totalPage={totalPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
