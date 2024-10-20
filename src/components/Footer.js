import React from "react";

const Footer = () => {
  return (
    <div className="w-full h-16 mt-3 flex justify-center items-center py-10">
      <p className="text-foreground/30">
        GoldMov &copy; {new Date().getFullYear()}. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
