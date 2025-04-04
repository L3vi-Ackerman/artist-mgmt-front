"use client";
import React from "react";
import { userQuery } from "@/shared/Query/userQuery";
import { TableComponent } from "./manager-table";
import { ArtistTable } from "./artist-table";

export const GetArtistComponent = () => {
  const { data, isLoading, isError } = userQuery("artist");
  console.log(data);
  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error found</p>;

  console.log("Data found", data.results)
  if (data) return (
    <ArtistTable data={data.results} />
  );
};
