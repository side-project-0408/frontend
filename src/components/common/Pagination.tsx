import { Dispatch, SetStateAction } from "react";

type Props = {
  page: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export default function Pagination({ totalPages, page, setPage }: Props) {
  return (
    <div className="mt-4 flex justify-center">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => setPage(index)}
          className={`mx-1 rounded px-4 py-2 ${index === page ? "bg-neutral-orange-500 text-white" : "bg-gray-300"}`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
        disabled={page === totalPages - 1}
        className="ml-2 rounded bg-gray-300 px-4 py-2"
      >
        다음
      </button>
    </div>
  );
}
