"use client";
import React from "react";
import { UserInterface } from "@/types/interface";
import { userQuery } from "@/shared/Query/userQuery";

export const GetUserComponent = () => {
  const { user, isLoading, isError } = userQuery("user");
  console.log(user);
  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error found</p>;
  if (user) return <p>user data available</p>;
};
