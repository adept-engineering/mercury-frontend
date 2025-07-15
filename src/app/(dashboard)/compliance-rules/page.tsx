import { getComplianceRules } from "@/actions/compliance-rules";
import { auth } from "@/auth";
import ComplianceRulesContainer from "@/components/compliance_rules/container";

export const dynamic = 'force-dynamic';

export default async function ComplianceRulesPage() {

  const session = await auth();
  const complianceRulesData = await getComplianceRules(session?.user?.token ?? "");
 
  return (
    <div className="flex flex-col gap-6 p-6">
      <ComplianceRulesContainer
        complianceData={complianceRulesData}
       
      />
    </div>
  );
}
