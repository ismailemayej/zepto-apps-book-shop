import { useContext, useState } from "react";
import { Context } from "../../App";

const Navbar = () => {
  const datas = useContext(Context);
  const [value, setValue] = useState<string>("");
  // data handle change On search box
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <nav className="flex justify-between items-center shadow-xl lg:mx-14 px-7 lg:py-3 py-1 rounded-md border">
        {/* Site Logo */}
        <div className="logo">Logo</div>
        <div className="flex gap-1 items-center mr-1">
          {/* Search box */}
          <form>
            <input
              type="text"
              placeholder="Search..."
              value={value}
              onChange={handleInputChange}
              className="py-2 text-sm text-gray-700 w-full pr-3 pl-3 bg-slate-100 rounded-md"
            />
          </form>
        </div>
      </nav>
      {/* filter and maping for data show in UI */}
      {value &&
        datas
          .filter((item) =>
            item?.title?.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, 7)
          .map((item) => (
            <div className="mx-16 my-3 border-b" key={item.id}>
              <p>{item?.title}</p>
            </div>
          ))}
      {value &&
        datas.filter((item) =>
          item?.title?.toLowerCase().includes(value.toLowerCase())
        ).length === 0 && (
          <div className="text-red-500 text-2xl text-center">
            No Search Data
          </div>
        )}
    </div>
  );
};
export default Navbar;
