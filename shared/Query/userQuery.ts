"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/fetchUser";
export const userQuery = (endpoint: string) => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(endpoint),
  });
  return { user, isLoading, isError };
};
