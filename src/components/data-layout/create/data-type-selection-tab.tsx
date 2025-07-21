"use client";

import { ReusableCombobox } from "@/components/ui/combobox";
import {
    useGetAllFormats,
    useGetVersionByFormat,
    useGetTransactionSetByVersion,
} from "@/hooks/use-nlp";

interface DataTypeSelectionTabProps {
    dataType: string;
    selectedVersion: string;
    setSelectedVersion: React.Dispatch<React.SetStateAction<string>>;
    selectedTransaction: string;
    setSelectedTransaction: React.Dispatch<React.SetStateAction<string>>;
}

export function DataTypeSelectionTab({
    dataType,
    selectedVersion,
    setSelectedVersion,
    selectedTransaction,
    setSelectedTransaction,
}: DataTypeSelectionTabProps) {
    const { data: formats } = useGetAllFormats();
    const myformat = dataType === "EDIFACT" ? "E" : "X";
    const { data: versions } = useGetVersionByFormat(myformat);
    const { data: transactionSets } = useGetTransactionSetByVersion(selectedVersion, myformat);

    const handleVersionSelect = (version: string) => {
        setSelectedVersion(version);
        setSelectedTransaction(""); // Reset transaction when version changes
    };

    const handleTransactionSelect = (transaction: string) => {
        setSelectedTransaction(transaction);
    };

    // Show different content based on data type
    if (dataType !== "EDI" && dataType !== "EDIFACT") {
        return (
            <div className="space-y-6">
                <div>
                    <h2 className="text-lg font-semibold mb-2">Data Type Configuration</h2>
                    <p className="text-muted-foreground mb-6">
                        {dataType} data type selected. No additional configuration required.
                    </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg border">
                    <div className="text-center text-muted-foreground">
                        <p className="text-sm">
                            The {dataType} data type doesn&apos;t require version or transaction configuration.
                        </p>
                        <p className="text-xs mt-2">
                            You can proceed to the next step to review your configuration.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold mb-2">Version & Transaction Configuration</h2>
                <p className="text-muted-foreground mb-6">
                    Select the version and transaction type for your {dataType} data layout
                </p>
            </div>

            <div className="flex gap-4 flex-wrap">
                {/* Version ComboBox */}
                <div className="min-w-[200px]">
                    <label className="text-sm font-medium mb-2 block">Version</label>
                    <ReusableCombobox
                        options={versions?.map((version: any) => ({
                            value: version.Version,
                            label: version.Version
                        })) || []}
                        value={selectedVersion}
                        onValueChange={handleVersionSelect}
                        placeholder="Select version..."
                        searchPlaceholder="Search version..."
                        emptyText="No version found."
                    />
                </div>

                {/* Transaction Set ComboBox */}
                {selectedVersion && (
                    <div className="min-w-[200px]">
                        <label className="text-sm font-medium mb-2 block">Transaction Set</label>
                        <ReusableCombobox
                            options={transactionSets?.map((transaction: any) => ({
                                value: transaction.TransactionSet,
                                label: transaction.TransactionSet
                            })) || []}
                            value={selectedTransaction}
                            onValueChange={handleTransactionSelect}
                            placeholder="Select transaction..."
                            searchPlaceholder="Search transaction..."
                            emptyText="No transaction found."
                        />
                    </div>
                )}
            </div>

          
        </div>
    );
} 