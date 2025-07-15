import { getComplianceRuleById } from "@/actions/compliance-rules";
import { auth } from "@/auth";
import { EditFormContainer } from "./edit-form-containter";

export default async function EditComplianceRulePage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const session = await auth();
    const complianceRule = await getComplianceRuleById(session?.user?.token ?? "", id);

    return (
        <EditFormContainer complianceRuleId={id} defaultValues={complianceRule} />
    )
}