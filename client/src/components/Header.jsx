import React from 'react';
import { Link } from 'react-router-dom';

function Header({link,title}) {
  return (
    <>
      <nav className="bg-gray-500 flex items-center justify-between flex-wrap p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">Web Portal</span>
        </div>
        <Link to={link}>
        <div className="w-full flex justify-end lg:w-auto">
          <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-blue-400 mt-4 lg:mt-0">{title}</a>
        </div>
        </Link>
      </nav>
    </>
  );
}

export default Header;
