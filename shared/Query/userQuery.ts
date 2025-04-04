"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/fetch/fetchUser";
export const userQuery = (endpoint: string) => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(endpoint),
  });
  return { data, isLoading, isError };
};
