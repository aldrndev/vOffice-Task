import { Image } from "@nextui-org/react";
import React from "react";

const Hero = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <Image
        src="https://static.vecteezy.com/system/resources/previews/036/149/230/non_2x/cartoon-illustration-of-cozy-modern-bedroom-living-room-with-double-bed-plants-pictures-armchair-carpet-interior-inside-colorful-background-contemporary-apartment-concept-with-furniture-free-vector.jpg"
        width={1100}
        height={300}
        objectfit="contain" // To make sure the image covers the entire container
      />
    </div>
  );
};

export default Hero;
