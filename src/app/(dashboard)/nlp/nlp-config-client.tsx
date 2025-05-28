'use client';

import { useQueryState } from 'nuqs';
import { FormatSelector, VersionSelector, DetailsPanel } from '@/components/nlp';

interface Format {
    name: string;
    versions: string[];
}

interface FormatsData {
    [key: string]: Format;
}

interface VersionDetail {
    transactionSets: string[];
    segments: string[];
    codeLists: string[];
}

interface VersionDetails {
    [key: string]: VersionDetail;
}

interface NLPConfigClientProps {
    formatsData: FormatsData;
    versionDetails: VersionDetails;
}

export function NLPConfigClient({ formatsData, versionDetails }: NLPConfigClientProps) {
    const [selectedFormat, setSelectedFormat] = useQueryState('format');
    const [selectedVersion, setSelectedVersion] = useQueryState('version');

    const formats = Object.keys(formatsData);
    const versions = selectedFormat ? formatsData[selectedFormat]?.versions || [] : [];
    const currentVersionDetail = selectedVersion ? versionDetails[selectedVersion] : null;

    const handleFormatSelect = (format: string) => {
        setSelectedFormat(format);
        setSelectedVersion(null); // Reset version when format changes
    };

    const handleVersionSelect = (version: string) => {
        setSelectedVersion(version);
    };

    return (
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
            <FormatSelector
                formats={formats}
                selectedFormat={selectedFormat}
                onFormatSelect={handleFormatSelect}
            />

            <VersionSelector
                versions={versions}
                selectedFormat={selectedFormat}
                onVersionSelect={handleVersionSelect}
            />

            {selectedVersion && currentVersionDetail ? (
                <DetailsPanel
                    selectedFormat={selectedFormat!}
                    selectedVersion={selectedVersion}
                    versionDetail={currentVersionDetail}
                />
            ) : (
                <div className="col-span-6 flex items-center justify-center h-full">
                    <p className="text-muted-foreground">
                        {!selectedFormat ? 'Select a format and version to view details' : 'Select a version to view details'}
                    </p>
                </div>
            )}
        </div>
    );
} 