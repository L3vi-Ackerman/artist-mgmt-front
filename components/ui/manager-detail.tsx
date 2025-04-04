"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { managerQuery } from "@/shared/Query/managerQuery";
import { ManagerForm } from "../manager-form";
export function ManagerDetail() {
  const {data:profile,isLoading,isError} = managerQuery();
  if (isLoading) {
    return <p>Loading</p>;
  }
  if (isError) {
    return <p>Error</p>;
  }

  if (profile) {
    console.log(profile);
    return (
      <Card className=" p-2 m-4">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid grid-cols-2 w-3/4 items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <p>{profile.first_name} {profile.last_name}</p>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Address</Label>
                <p>{profile.address}</p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Date of Birth (DOB)</Label>
                <p>{profile.dob}</p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Phone</Label>
                <p>{profile.phone}</p>
              </div>
             
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <ManagerForm
            flag={true}
            id={profile.id}
            email={profile.user?.email || ""}
            first_name={profile.first_name}
            last_name={profile.last_name}
            phone={profile.phone}
            dob={profile.dob}
            address={profile.address}
          />
                  </CardFooter>
      </Card>
    );
  }
}
