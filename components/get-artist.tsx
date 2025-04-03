"use client";
import React from "react";
import { userQuery } from "@/shared/Query/userQuery";
import { TableComponent } from "./manager-table";

export const GetArtistComponent = () => {
  const { user, isLoading, isError } = userQuery("artist");
  console.log(user);
  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error found</p>;

  console.log("Data found", user.results)
  if (user) return (
    //<p>data found</p>
        <TableComponent data={user.results}/>

  );
};
