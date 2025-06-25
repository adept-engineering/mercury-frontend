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

        const defaultValues = {
            entityName: entityData.name || "",
            email: entityData.email_address || "",
            addressLine1: entityData.address1 || "",
            addressLine2: entityData.address2 || "",
            // phoneNumber: entityData.phone_number || "",
            city: entityData.city || "",
            country: entityData.country || "",
            state: entityData.state || "",
            zipCode: entityData.zip_code || "",
            referenceIDs: entityData.referenceIDs || [],
        };

        return <EditEntityForm defaultValues={defaultValues} id={id} />;
    } catch (error) {
        console.error("Error loading entity:", error);
        notFound();
    }
} 