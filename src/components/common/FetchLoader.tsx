"use client";
import { useIsFetching } from "@tanstack/react-query";
import Loading from "./Loading";

const FetchLoader = () => {
  const isFetching = useIsFetching();

  if (!isFetching) return null;

  return <Loading />;
};

export default FetchLoader;
