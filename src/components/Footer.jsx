import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white text-center py-3">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
