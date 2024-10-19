const DetailsModal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 w-80 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 font-bold"
        >
          View
        </button>
        {children}
      </div>
    </div>
  );
};

export default DetailsModal;
