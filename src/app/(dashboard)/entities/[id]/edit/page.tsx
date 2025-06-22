import { getEntity } from "@/actions/entity";
import { EditEntityForm } from "@/components/entities/edit-form";
import { notFound } from "next/navigation";

interface EditEntityPageProps {
    params: {
        id: string;
    };
}

export default async function EditEntityPage({ params }: EditEntityPageProps) {
    try {
        const { id } = await params;
        const entityData = await getEntity(id);

        if (!entityData) {
            notFound();
        }

        const defaultValues = {
            entityName: entityData.entityName || "",
            email: entityData.email || "",
            addressLine1: entityData.addressLine1 || "",
            addressLine2: entityData.addressLine2 || "",
            phoneNumber: entityData.phoneNumber || "",
            city: entityData.city || "",
            country: entityData.country || "",
            state: entityData.state || "",
            referenceIDs: entityData.referenceIDs || [],
        };

        return <EditEntityForm defaultValues={defaultValues} />;
    } catch (error) {
        console.error("Error loading entity:", error);
        notFound();
    }
} 