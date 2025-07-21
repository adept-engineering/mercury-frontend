"use client";
import { DataTable } from "@/components/account/data-table";
import columns from "./column";
import { User } from "@/lib/types";

export function AccountContainer({ data }: { data: User[] }) {

    return (
        <div className="p-8">
           
            <DataTable columns={columns} data={data} tableType="entities" onSwitch={() => { }} />
        </div>
    );
} 