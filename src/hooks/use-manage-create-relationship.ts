import { useCallback } from 'react';

interface RelationshipData {
    name: string;
    senderInfo: {
        entityType: string;
        senderEntity: string;
        interChangeId: string;
        groupId: string;
        transactionName: string;
        standardVersion: string;
        accepterAliasLookup: string;
    };
    receiverInfo: {
        entityType: string;
        receiverEntity: string;
        interChangeId: string;
        groupId: string;
        transactionName: string;
        standardVersion: string;
        accepterAliasLookup: string;
    };
    implementationGuide: {
        choice: 'upload' | 'generate' | null;
        uploadedFile?: {
            name: string;
            size: number;
            type: string;
            lastModified: number;
        };
        generateGuide?: {
            selectedFormat: string;
            selectedVersion: string;
            selectedTransactionSet: string;
            selectedSegments: string[];
        };
    };
}

export function useManageCreateRelationship() {
    const getCreateRelationshipData = useCallback((): Partial<RelationshipData> => {
        if (typeof window === 'undefined') {
            return {};
        }

        try {
            // Get relationship name
            const nameData = localStorage.getItem('Relationship_name');
            const name = nameData || '';

            // Get sender information
            const senderData = localStorage.getItem('createRelationship_senderInfo');
            const senderInfo = senderData ? JSON.parse(senderData) : {
                entityType: '',
                senderEntity: '',
                interChangeId: '',
                groupId: '',
                transactionName: '',
                standardVersion: '',
                accepterAliasLookup: ''
            };

            // Get receiver information
            const receiverData = localStorage.getItem('createRelationship_receiverInfo');
            const receiverInfo = receiverData ? JSON.parse(receiverData) : {
                entityType: '',
                receiverEntity: '',
                interChangeId: '',
                groupId: '',
                transactionName: '',
                standardVersion: '',
                accepterAliasLookup: ''
            };

            // Get implementation guide choice
            const choiceData = localStorage.getItem('createRelationship_choice');
            const choice = choiceData ? JSON.parse(choiceData) : { implementationChoice: null };

            // Get uploaded file data
            const uploadedFileData = localStorage.getItem('createRelationship_uploadedFile');
            const uploadedFile = uploadedFileData ? JSON.parse(uploadedFileData) : undefined;

            // Get generate guide data
            const generateGuideData = localStorage.getItem('createRelationship_generateGuide');
            const generateGuide = generateGuideData ? JSON.parse(generateGuideData) : {
                selectedFormat: '',
                selectedVersion: '',
                selectedTransactionSet: '',
                selectedSegments: []
            };

            return {
                name,
                senderInfo,
                receiverInfo,
                implementationGuide: {
                    choice: choice.implementationChoice,
                    uploadedFile,
                    generateGuide
                }
            };
        } catch (error) {
            console.warn('Failed to get create relationship data from localStorage:', error);
            return {};
        }
    }, []);

    const resetCreateRelationshipData = useCallback(() => {
        if (typeof window === 'undefined') {
            return;
        }

        try {
            // List of all localStorage keys used in create relationship flow
            const keysToRemove = [
                'Relationship_name',
                'createRelationship_senderInfo',
                'createRelationship_receiverInfo',
                'createRelationship_choice',
                'createRelationship_uploadedFile',
                'createRelationship_generateGuide'
            ];

            // Remove all keys
            keysToRemove.forEach(key => {
                localStorage.removeItem(key);
            });

            console.log('Create relationship data reset successfully');
        } catch (error) {
            console.warn('Failed to reset create relationship data:', error);
        }
    }, []);

    const isDataComplete = useCallback((): boolean => {
        const data = getCreateRelationshipData();

        // Check if basic info is complete
        const hasName = !!data.name;
        const hasSenderInfo = !!(data.senderInfo && Object.values(data.senderInfo).some(value => !!value));
        const hasReceiverInfo = !!(data.receiverInfo && Object.values(data.receiverInfo).some(value => !!value));

        // Check if implementation guide is configured
        const hasImplementationGuide = data.implementationGuide?.choice === 'upload'
            ? !!data.implementationGuide.uploadedFile
            : data.implementationGuide?.choice === 'generate'
                ? !!(data.implementationGuide.generateGuide?.selectedSegments?.length || 0)
                : false;

        return hasName && hasSenderInfo && hasReceiverInfo && hasImplementationGuide;
    }, [getCreateRelationshipData]);

    return {
        getCreateRelationshipData,
        resetCreateRelationshipData,
        isDataComplete
    };
}
