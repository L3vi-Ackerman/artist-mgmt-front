"use client";
import React from "react";
import { userQuery } from "@/shared/Query/userQuery";
import { TableComponent } from "./manager-table";

export const GetManagerComponent = () => {
  const { user, isLoading, isError } = userQuery("profile");
  console.log(user);
  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error found</p>;

  console.log("Data found", user)
  if (user) return (
        <TableComponent data={user}/>

  );
};
