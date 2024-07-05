"use client"

import Image from "next/image";
import Table from "@/components/Table";

import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="m-10">
     <h1 className="dark:text-white font-semibold text-5xl">Records</h1>
     <p className="text-2xl dark:text-white">View all Records</p>

     <Table/>
     </div>
   
  );
}
