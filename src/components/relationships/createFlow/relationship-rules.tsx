"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { UploadImplementationGuide } from './upload-implementation-guide';
import { GenerateImplementationGuide } from './generate-implementation-guide';

interface RelationshipRulesData {
    implementationChoice: 'upload' | 'generate' | null;
}

export function RelationshipRules() {
    const [formData, setFormData] = useState<RelationshipRulesData>({
        implementationChoice: null
    });

    // Load from localStorage on component mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const stored = localStorage.getItem('createRelationship_choice');
                if (stored) {
                    const parsedData = JSON.parse(stored);
                    setFormData(parsedData);
                }
            } catch (error) {
                console.warn('Failed to read from localStorage:', error);
            }
        }
    }, []);

    // Save to localStorage whenever formData changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('createRelationship_choice', JSON.stringify(formData));
            } catch (error) {
                console.warn('Failed to write to localStorage:', error);
            }
        }
    }, [formData]);

    const handleChoiceSelect = (choice: 'upload' | 'generate' | null) => {
        setFormData({ implementationChoice: choice });
    };

    if (formData.implementationChoice === null) {
        return (
            <div className="space-y-6">
                <div className="text-center space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        Implementation Guide
                    </h2>
                    <p className="text-muted-foreground">
                        Do you want to upload an implementation guide or generate one?
                    </p>
                </div>

                <div className="flex justify-center gap-4">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => handleChoiceSelect('upload')}
                        className="px-8 py-4 h-auto flex flex-col gap-2"
                    >
                        <Upload className="w-6 h-6" />
                        Upload Implementation Guide
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => handleChoiceSelect('generate')}
                        className="px-8 py-4 h-auto flex flex-col gap-2"
                    >
                        <span className="text-lg">⚙️</span>
                        Generate Implementation Guide
                    </Button>
                </div>
            </div>
        );
    }

    if (formData.implementationChoice === 'upload') {
        return (
            <UploadImplementationGuide
                onChangeChoice={() => handleChoiceSelect(null)}
            />
        );
    }

    if (formData.implementationChoice === 'generate') {
        return (
            <GenerateImplementationGuide
                onChangeChoice={() => handleChoiceSelect(null)}
            />
        );
    }

    return null;
}
