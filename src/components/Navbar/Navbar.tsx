const Navbar = () => {
  return (
    <nav className="flex justify-between items-center shadow-xl lg:mx-14 px-7 lg:py-3 py-1 rounded-md border">
      {/* Site Logo */}
      <div className="logo">Logo</div>
      <div className=" flex gap-1 items-center mr-1">
        {/* Search box */}
        <input
          type="search"
          placeholder="Search..."
          className="py-2 text-sm text-gray-700 w-full pr-3 pl-3 bg-slate-100 rounded-md"
        />
        <button className=" bg-yellow-500 p-2 rounded-md text-white">
          Search
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
