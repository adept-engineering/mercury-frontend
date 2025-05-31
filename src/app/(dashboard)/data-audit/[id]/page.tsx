import { getDataAuditLogDetails } from "@/actions/data-audits";
import { TypeBadge } from "@/components/data-audit/column";
import { TransactionInfoCard } from "@/components/data-audit/transaction-info-card";
import { InterchangeDetailsCard } from "@/components/data-audit/interchange-details-card";
import { PartnersCard } from "@/components/data-audit/partners-card";
import { EDIDataCard, NLPDataCard } from "@/components/data-audit/data-display-cards";
import { BackButton } from "@/components/ui/back-button";

export default async function DataAuditDetailsPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const dataAuditLog = await getDataAuditLogDetails(id);

    return (
        <div className="container mx-auto p-8 space-y-8">
                    <BackButton />
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold">Data Audit Details</h1>
                </div>
                <TypeBadge type={dataAuditLog.type} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <TransactionInfoCard
                    transactionName={dataAuditLog.transaction_name}
                    standardVersion={dataAuditLog.standard_version}
                    version={dataAuditLog.version}
                />

                <InterchangeDetailsCard
                    controlNumber={dataAuditLog.interchange_control_number}
                    dateTime={dataAuditLog.interchange_date_time}
                />

                <PartnersCard
                    clientIdFrom={dataAuditLog.client_id_from}
                    clientIdTo={dataAuditLog.client_id_to}
                    senderId={dataAuditLog.interchange_sender}
                    receiverId={dataAuditLog.interchange_receiver}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <EDIDataCard ediData={dataAuditLog.ediData} />
                <NLPDataCard nlpData={dataAuditLog.nlpData} />
            </div>
        </div>
    );
}
