import { Book } from "./Home/Home";

const BookList = ({ book }: { book: Book }) => {
  return (
    <div className="hover:bg-slate-50 flex items-center justify-between p-4 border-b border-gray-200 hover:shadow-xl rounded-xl transition-shadow duration-300">
      <div className="border mr-4 rounded-xl relative p-1">
        <img
          src={book.formats["image/jpeg"]}
          alt={book.title}
          className="w-48 border h-72 object-cover rounded-xl  hover:rotate-6 hover:transition-all hover:scroll-smooth hover:delay-75"
        />
        <img
          src={book.formats["image/jpeg"]}
          alt={book.title}
          className="w-48 hover:border h-72 object-cover rounded-xl absolute top-0 left-0 hover:rotate-6 hover:transition-all hover:scroll-smooth hover:delay-100 scroll-m-12"
        />
      </div>

      <div className="flex-1 border h-[19rem] p-2 rounded-xl">
        <h2 className="text-xl font-bold mb-2">{book.title}</h2>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Author:</span>{" "}
          {book.authors.map((author) => author.name).join(", ")}
        </p>
        <p className="text-sm text-gray-600 mb-2 line-clamp-5">
          <span className="font-semibold">Genre:</span>
          {book.subjects.join(", ")}
        </p>
        <p className="text-sm text-gray-600">
          {" "}
          <span className="font-semibold">Id:</span>
          {book.id}
        </p>
      </div>
    </div>
  );
};

export default BookList;
