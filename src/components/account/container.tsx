"use client";
import { DataTable } from "@/components/account/data-table";
import columns from "./column";
import { User } from "@/lib/types";

export function AccountContainer({ data }: { data: User[] }) {

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Account Management</h1>
                    <p className="text-muted-foreground text-sm">Manage user accounts, profiles, roles, and access permissions.</p>
                </div>
            </div>
            <DataTable columns={columns} data={data} tableType="entities" onSwitch={() => { }} />
        </div>
    );
} 