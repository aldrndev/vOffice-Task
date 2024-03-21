import { Divider } from "@nextui-org/react";

const Footer = () => {
  return (
    <>
      <div className="mt-20 p-5">
        <Divider className="my-4" />
      </div>
      <div className="flex justify-center items-center mb-7">
        <p className="text-sm">
          Copyright © 2024 VOFFICE. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
