import { getDataAuditLogDetails } from "@/actions/data-audits";
import { TypeBadge } from "@/components/data-audit/column";
import { TransactionInfoCard, InterchangeDetailsCard, EDIDataCard, NLPDataCard, GroupDetailsCard, DocRefCard } from "@/components/data-audit/data-cards";
import { BackButton } from "@/components/ui/back-button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataInformation } from "@/components/data-audit/data-information";

export default async function DataAuditDetailsPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const dataAuditLog = await getDataAuditLogDetails(id);


    return (
        <div className="container mx-auto p-8 space-y-8">
            <BackButton />
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold">Data Audit Details for {dataAuditLog.client_id_from} to {dataAuditLog.client_id_to}</h1>
                </div>
                <TypeBadge type={dataAuditLog.type} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InterchangeDetailsCard
                    controlNumber={dataAuditLog.interchange_control_number}
                    dateTime={dataAuditLog.interchange_date_time}
                    sender={dataAuditLog.interchange_sender}
                    receiver={dataAuditLog.interchange_receiver}
                />
                <GroupDetailsCard
                    groupSender={dataAuditLog.group_sender}
                    groupReceiver={dataAuditLog.group_receiver}
                    groupControlNumber={dataAuditLog.group_control_number}
                    groupDateTime={dataAuditLog.group_date_time}
                />
                <TransactionInfoCard
                    transactionName={dataAuditLog.transaction_name}
                    standardVersion={dataAuditLog.standard_version}
                    version={dataAuditLog.version}
                />
                {dataAuditLog.docRefData && <DocRefCard docRefData={dataAuditLog.docRefData} />}
            </div>

            <DataInformation
                ediData={dataAuditLog.ediData}
                nlpData={dataAuditLog.nlpData}
            />
        </div>
    );
}
