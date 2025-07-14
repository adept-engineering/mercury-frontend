import { getEntity } from "@/actions/entity";
import { MapEntityObjToArray } from "@/lib/utils";
import { EntityDetails } from "@/components/entities/entity-details";

export const dynamic = 'force-dynamic';

interface EntityPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EntityPage({ params }: EntityPageProps) {
    const { id } = await params;
    const entity = await getEntity(id);
    const entityDetails = MapEntityObjToArray(entity);
    console.log(entity)

    return (
        <EntityDetails
            entity={entity}
            entityDetails={entityDetails}
        />
    );
}