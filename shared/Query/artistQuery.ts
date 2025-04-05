"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchArtist} from "../api/fetch/fetchArtist";
export const artistQuery = () => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchArtist(),
  });
  return { data, isLoading, isError };
};
