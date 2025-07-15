import { getEntity } from "@/actions/entity";
import { EditEntityForm } from "@/components/entities/edit-form";
import { notFound } from "next/navigation";

interface EditEntityPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditEntityPage({ params }: EditEntityPageProps) {
    try {
        const { id } = await params;
        const entityData = await getEntity(id);

        if (!entityData) {
            notFound();
        }
        const referenceIDs = entityData.entityidtbl.map((item: any) => {
            if (item.reference_id_type === "EDI/X12" || item.reference_id_type === "EDI/EDIFACT") {
                return {
                    docType: item.reference_id_type,
                    interchangeNumber: item.reference_id,
                    // groupID: item.reference_id_extn,
                };
            } else {
                return {
                    docType: item.reference_id_type,
                    applicationID: item.reference_id,
                };
            }
        });

        const defaultValues = {
            entityName: entityData.name || "",
            email: entityData.email_address || "",
            addressLine1: entityData.address1 || "",
            addressLine2: entityData.address2 || "",
            city: entityData.city || "",
            country: entityData.country || "",
            state: entityData.state || "",
            zipCode: entityData.zipcode || "",
            organization_type: entityData.organization_type || "COMPANY",
            referenceIDs,
        };

        return <EditEntityForm defaultValues={defaultValues} id={id} />;
    } catch (error) {
        console.error("Error loading entity:", error);
        notFound();
    }
} 