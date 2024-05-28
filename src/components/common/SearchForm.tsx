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
          className="h-[40px] rounded-2xl border border-neutral-gray-50 px-3 py-2"
        />
      </form>
    </>
  );
});

SearchForm.displayName = "SearchForm";

export default SearchForm;
