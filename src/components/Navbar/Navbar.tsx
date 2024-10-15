import { useEffect, useState } from "react";

interface Book {
  id: number;
  title: string;
}

const Navbar = () => {
  const [datas, setDatas] = useState<Book[]>([]);
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    try {
      fetchData({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
  // data handle change On search box
  const fetchData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    try {
      const response = await fetch(
        `https://gutendex.com/books?search=${value}`
      );
      const data = await response.json();
      setDatas(data.results as Book[]);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  return (
    <div>
      <nav className="flex justify-between items-center shadow-xl lg:mx-14 px-7 lg:py-3 py-1 rounded-md border">
        {/* Site Logo */}
        <div className="logo">Logo</div>
        <div className="flex gap-1 items-center mr-1">
          {/* Search box */}
          <input
            type="search"
            placeholder="Search..."
            onChange={fetchData}
            value={value}
            className="py-2 text-sm text-gray-700 w-full pr-3 pl-3 bg-slate-100 rounded-md"
          />
          <button className="bg-yellow-500 p-2 rounded-md text-white">
            Search
          </button>
        </div>
      </nav>
      {value &&
        datas
          .filter((item) => item?.title.startsWith(value))
          .map((item) => (
            <div className="mx-16 my-3 border-b" key={item.id}>
              {item.title}
            </div>
          ))}
    </div>
  );
};
export default Navbar;
