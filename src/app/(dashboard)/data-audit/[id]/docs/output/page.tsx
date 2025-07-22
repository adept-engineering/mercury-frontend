import { getEdiOutputDocumentById } from "@/actions/data-audits";
import { ComplianceReportCard, TransformationReportCard,OutputDataCard } from "@/components/data-audit/data-cards";
import { BackButton } from "@/components/ui/back-button";

export default async function OutputDocumentPage({
  searchParams,
}: {
  searchParams: Promise<{ ediDataId: string }>
}) {
  const { ediDataId } = await searchParams;
  const ediOutputDocument = await getEdiOutputDocumentById(ediDataId);
  console.log(ediOutputDocument);
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col items-start justify-between">
        <BackButton />
        <h1 className="text-2xl font-semibold">Output Document</h1>
      </div>
      <div className="flex items-start gap-4">
        <ComplianceReportCard complianceReport={ediOutputDocument.compliance_rpt} />
        <TransformationReportCard transformationReport={ediOutputDocument.transformation_rpt} />
        <OutputDataCard outputData={ediOutputDocument.out_nlp} />
      </div>
    </div>
  );
}