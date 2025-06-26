import { getComplianceRules } from "@/actions/compliance-rules";
import ComplianceRulesContainer from "@/components/compliance_rules/container";

export const dynamic = 'force-dynamic';

export default async function ComplianceRulesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const complianceRulesData = await getComplianceRules(id);
  console.log(complianceRulesData, "complianceRulesData");
  return (
    <div className="flex flex-col gap-6 p-6">
      <ComplianceRulesContainer
        complianceData={complianceRulesData}
        entityid_relationship_id={id}
      />
    </div>
  );
}
