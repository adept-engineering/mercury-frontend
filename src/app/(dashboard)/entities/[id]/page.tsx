import { getEntity } from "@/actions/entity";
import { MapEntityObjToArray } from "@/lib/utils";
import { EntityCard } from "@/components/entities/entity-card";
import { CurrentPathBreadcrumbs } from "@/components/current-path-breadcrumbs";
import { ChevronDown } from "lucide-react";

// Dummy data
const dummyCompanyInfo = [
    { name: "Name", value: "Agoil LLC" },
    { name: "Organization Type", value: "Agoil Company" },
    { name: "Entity ID", value: "Agoil LLC" },
    { name: "Tenant ID", value: "6b291244-34f3-4b75-a2b8-33de2ee62cce" },
    { name: "Email", value: "agoil@gmail.com" }
];

const dummyAddress = [
    { name: "Address 1", value: "12, Main Street" },
    { name: "Address 2", value: "24, Ex Street" },
    { name: "City", value: "Agoil City" },
    { name: "State", value: "California" },
    { name: "Zip Code", value: "234987" },
    { name: "Country", value: "USA" }
];

const dummyTimestamps = [
    { name: "Date Created", value: "2024-06-21T15:30:45.000Z" },
    { name: "Updated by", value: "2024-06-23T09:56:56.416Z" },
    { name: "Updated by", value: "1" }
];

export default async function EntityPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const entity = await getEntity(id);
    console.log(entity);
    const { CompanyInfo, Address, Timestamps } = MapEntityObjToArray(entity);
    // console.log(CompanyInfo, Address, Timestamps);

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Entity Details</h1>
                <CurrentPathBreadcrumbs />
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 ">
                <EntityCard title="Company Information" details={CompanyInfo} />
                <EntityCard title="Address" details={Address} />
                <EntityCard title="Timestamps" details={Timestamps} />
            </div>
        </div>
    );
}