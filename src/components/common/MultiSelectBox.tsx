"use client";
import { SELECT_OPTION } from "@/constants";
import dynamic from "next/dynamic";
import { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";

type Props = {
  defaultValues: { label: string; value: string }[];
  selectKey: number;
  multiSelectHandler: (
    selectedOption: MultiValue<{
      label: string;
      value: string;
    }>,
  ) => void;
};

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function MultiSelectBox({
  defaultValues,
  selectKey,
  multiSelectHandler,
}: Props) {
  return (
    <Select
      instanceId="techStack"
      key={selectKey}
      defaultValue={defaultValues}
      options={SELECT_OPTION}
      components={makeAnimated()}
      isMulti
      onChange={() => multiSelectHandler}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          width: "400px",
          maxWidth: "400px",
          minHeight: "55px",
          display: "flex",
          flexWrap: "nowrap",
        }),
      }}
    />
  );
}
