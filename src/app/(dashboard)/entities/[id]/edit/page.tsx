import { getEntity } from "@/actions/entity";
import { EditEntityForm } from "@/components/entities/edit-form";
import { EntityData } from "@/lib/types";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/ui/back-button";
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
        const {entityidtbl,tenant_id, ...rest} = entityData;
        const referenceIDs = entityidtbl.map((item: any) => {
            const extnObj = item.entityidtbl_extn.reduce((acc: any, extn: any) => {
                acc[extn.reference_name] = extn.reference_value;
                return acc;
              }, {});
           return {
            docType: item.reference_id_type,
            ...extnObj
           }
        });
        console.log(referenceIDs);
       
        const defaultValues: EntityData = {
            ...rest,
            referenceIDs
        }

     
        return(
            <EditEntityContainer defaultValues={defaultValues} id={id} />
            
        );
 
} 