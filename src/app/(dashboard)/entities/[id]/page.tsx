import { getEntity } from "@/actions/entity";
import { MapEntityObjToArray } from "@/lib/utils";
import { EntityCard } from "@/components/entities/entity-card";
import { CurrentPathBreadcrumbs } from "@/components/current-path-breadcrumbs";

export const dynamic = 'force-dynamic';

interface EntityPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EntityPage({ params }: EntityPageProps) {
    const { id } = await params;
    const entity = await getEntity(id);
    const { CompanyInfo, Address, Timestamps } = MapEntityObjToArray(entity);

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Entity Details</h1>
                <CurrentPathBreadcrumbs />
            </div>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2  mb-10">
                <EntityCard title="Company Information" details={CompanyInfo} />
                <EntityCard title="Timestamps" details={Timestamps} />
                <EntityCard title="Address" details={Address} />
            </div>
        </div>
    );
}