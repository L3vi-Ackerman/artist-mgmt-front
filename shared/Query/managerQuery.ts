"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchManager} from "../api/fetch/fetchManager";
export const managerQuery = () => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchManager(),
  });
  return { data, isLoading, isError };
};
