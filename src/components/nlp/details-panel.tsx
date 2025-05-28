import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DetailsBreadcrumb } from './details-breadcrumb';
import { TabItemList } from './tab-item-list';

interface VersionDetail {
    transactionSets: string[];
    segments: string[];
    codeLists: string[];
}

interface DetailsPanelProps {
    selectedFormat: string;
    selectedVersion: string;
    versionDetail: VersionDetail;
}

const TAB_CONFIG = {
    'transaction-set': { label: 'Transaction Set', display: 'Select Transaction Set' },
    'segment': { label: 'Segment', display: 'Select Segment' },
    'code-list': { label: 'Code List', display: 'Select Code List' },
} as const;

type TabValue = keyof typeof TAB_CONFIG;

export function DetailsPanel({ selectedFormat, selectedVersion, versionDetail }: DetailsPanelProps) {
    const [activeTab, setActiveTab] = useState<TabValue>('transaction-set');

    const handleItemView = (item: string, index: number, type: string) => {
        // Handle item view logic here
        console.log(`Viewing ${type}:`, item, 'at index:', index);
    };

    return (
        <div className="col-span-6">
            <div className="space-y-4">
                <DetailsBreadcrumb
                    selectedFormat={selectedFormat}
                    selectedVersion={selectedVersion}
                    activeTabDisplay={TAB_CONFIG[activeTab].display}
                />

                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        {Object.entries(TAB_CONFIG).map(([key, config]) => (
                            <TabsTrigger key={key} value={key}>
                                {config.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value="transaction-set" className="mt-4">
                        <TabItemList
                            items={versionDetail.transactionSets}
                            onItemView={(item, index) => handleItemView(item, index, 'transaction-set')}
                        />
                    </TabsContent>

                    <TabsContent value="segment" className="mt-4">
                        <TabItemList
                            items={versionDetail.segments}
                            onItemView={(item, index) => handleItemView(item, index, 'segment')}
                        />
                    </TabsContent>

                    <TabsContent value="code-list" className="mt-4">
                        <TabItemList
                            items={versionDetail.codeLists}
                            onItemView={(item, index) => handleItemView(item, index, 'code-list')}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
} 