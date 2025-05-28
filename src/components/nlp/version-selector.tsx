import { ListItem } from './list-item';

interface VersionSelectorProps {
    versions: string[];
    selectedFormat: string | null;
    onVersionSelect: (version: string) => void;
}

export function VersionSelector({ versions, selectedFormat, onVersionSelect }: VersionSelectorProps) {
    return (
        <div className="col-span-3">
            <div className="space-y-4">
                <div>
                    <h2 className="font-semibold text-lg mb-4">VERSIONS</h2>
                    {selectedFormat ? (
                        <div className="space-y-2">
                            {versions.map((version) => (
                                <ListItem
                                    key={version}
                                    label={version}
                                    onView={() => onVersionSelect(version)}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-sm">Select a format to view versions</p>
                    )}
                </div>
            </div>
        </div>
    );
} 