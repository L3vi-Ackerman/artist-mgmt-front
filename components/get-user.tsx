"use client";
import React from "react";
import { userQuery } from "@/shared/Query/userQuery";
import { TableComponent } from "./table-component";
import { DataTable } from "@/components/data-table";

export const GetUserComponent = () => {
  const { user, isLoading, isError } = userQuery("profile");
  console.log(user);
  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error found</p>;

  if (user) return <TableComponent data={user} />;
};
