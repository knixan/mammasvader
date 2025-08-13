import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-purple-900 rounded-t-lg shadow-sm mt-auto w-full backdrop-blur-sm">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-50 sm:text-center">
          © {new Date().getFullYear()} Josefine Eriksson. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-50 sm:mt-0">
          <li>
            <a href="https//kodochdesign.se" className="hover:underline">
              www.kodochdesign.se
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
