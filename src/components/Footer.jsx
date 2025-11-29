import React from "react";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content  sticky bottom-0  p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by ACME
          Anupam Boral
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
