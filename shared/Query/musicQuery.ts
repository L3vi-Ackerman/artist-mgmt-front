
"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchMusic} from "../api/fetch/fetchMusic"
export const musicQuery = () => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["music"],
    queryFn: () => fetchMusic(),
  });
  return { data, isLoading, isError };
};
