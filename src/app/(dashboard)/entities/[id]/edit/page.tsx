import { getEntity } from "@/actions/entity";
import { EntityData } from "@/lib/types";
import { notFound } from "next/navigation";
import EditEntityContainer from "./edit-entity-container";

interface EditEntityPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditEntityPage({ params }: EditEntityPageProps) {
    
        const { id } = await params;
        const entityData = await getEntity(id);

        if (!entityData) {
            notFound();
        }
        const {references,tenant_id, ...rest} = entityData;
        const referenceIDs = references.map((item: any) => {
            const extnObj = item.extn.reduce((acc: any, extn: any) => {
                acc[extn.name] = extn.value;
                return acc;
              }, {});
           return {
            docType: item.reference_id_type,
            ...extnObj
           }
        });
        console.log(referenceIDs,tenant_id);
       
        const defaultValues: EntityData = {
            ...rest,
            referenceIDs
        }

     
        return(
            <EditEntityContainer defaultValues={defaultValues} id={id} />
            
        );
 
} 