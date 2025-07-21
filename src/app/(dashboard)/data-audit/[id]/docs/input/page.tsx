import { getEdiInputDocumentById } from "@/actions/data-audits";
import { EDIDataCard , NLPDataCard} from "@/components/data-audit/data-cards";
import { BackButton } from "@/components/ui/back-button";

export default async function InputDocumentPage({
   searchParams,
}: {
    searchParams: Promise<{ ediDataId: string, nlpDataId: string }>
}) {
    const { ediDataId, nlpDataId } = await searchParams;
    const ediInputDocument = await getEdiInputDocumentById(ediDataId, nlpDataId);
    console.log(ediInputDocument);
    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col items-start justify-between">
                <BackButton />
                <h1 className="text-2xl font-semibold">Input Document</h1>
            </div>
            <div className="flex items-center  gap-4">
                <EDIDataCard ediData={ediInputDocument.ediInputDocument} />
                <NLPDataCard nlpData={ediInputDocument.nlpInputDocument} />
            </div>
        </div>
    )
}