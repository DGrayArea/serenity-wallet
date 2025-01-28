interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function DeleteDialog({ title, isOpen, onClose }: DialogProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-[#FFFFFF80] rounded-lg shadow-lg w-4/5 p-6 pt-2">
        <div className="w-full ">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 focus:outline-none flex  ml-auto"
          >
            &times;
          </button>
        </div>
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-2xl font-semibold font-semibold ">{title}</h2>
        </div>

        <div className="flex justify-center mt-4 gap-2 text-[#FFFFFF] font-semibold ">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#FFFFFF10] hover:bg-[#FFFFFF20] rounded w-full border rounded-full"
          >
            Back
          </button>
          <button
            // onClick={onClose}
            className="px-4 py-2 bg-[#FF4231] hover:bg-[#FF423190] rounded w-full rounded-full"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
