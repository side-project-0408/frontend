"use client";
import { forwardRef } from "react";

type Props = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const SearchForm = forwardRef<HTMLInputElement, Props>(({ onSubmit }, ref) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          ref={ref}
          name="search"
          type="search"
          placeholder="검색창"
          className="border-neutral-gray-50 h-[40px] rounded-2xl border px-3 py-2"
        />
      </form>
    </>
  );
});

export default SearchForm;
