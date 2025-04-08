"use client";
import React from "react";
import { userQuery } from "@/shared/Query/userQuery";
import { TableComponent } from "./manager-table";

export const GetManagerComponent = () => {
  const { data:user, isLoading, isError } = userQuery("profile");
  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error found</p>;

  console.log("Data found", user)
  if (user) return (
        <TableComponent data={user}/>

  );
};
