import { NLPConfigClient } from "./nlp-config-client";


export default function NLPConfigPage() {
    return (
        <div className="container mx-auto p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">NLP Config</h1>
                <p className="text-muted-foreground">Configure and manage NLP (Natural Language Processing) rules.</p>
            </div>
            <NLPConfigClient />
        </div>
    );
}
