"use client";

import { columns } from "@/app/(admin)/users/columns";
import { Card } from "../ui/card";
import { DataTable } from "../ui/data-table";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AllUser() {
  const [allUsers, setAllUsers] = useState({});
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("/api/user");
      const users = response.data.user;
      setAllUsers(users.filter((user: any) => user.role === "user"));
    };
    fetchUsers();
  }, []);
  return (
    <Card className="p-5">
      <DataTable columns={columns} data={allUsers as any} />
    </Card>
  );
}
