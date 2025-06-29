"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Upload } from 'lucide-react';

interface UploadImplementationGuideProps {
    onChangeChoice: () => void;
}

export function UploadImplementationGuide({ onChangeChoice }: UploadImplementationGuideProps) {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    // Load from localStorage on component mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const stored = localStorage.getItem('createRelationship_uploadedFile');
                if (stored) {
                    const fileData = JSON.parse(stored);
                    // Note: We can't restore the actual File object, just the metadata
                    console.log('Previously uploaded file:', fileData.name);
                }
            } catch (error) {
                console.warn('Failed to read from localStorage:', error);
            }
        }
    }, []);

    // Save to localStorage whenever uploadedFile changes
    useEffect(() => {
        if (typeof window !== 'undefined' && uploadedFile) {
            try {
                const fileData = {
                    name: uploadedFile.name,
                    size: uploadedFile.size,
                    type: uploadedFile.type,
                    lastModified: uploadedFile.lastModified
                };
                localStorage.setItem('createRelationship_uploadedFile', JSON.stringify(fileData));
            } catch (error) {
                console.warn('Failed to write to localStorage:', error);
            }
        }
    }, [uploadedFile]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                    Upload Implementation Guide
                </h2>
                <Button
                    variant="link"
                    onClick={onChangeChoice}
                    className="text-primary"
                >
                    Change Choice
                </Button>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <Label htmlFor="implementation-file" className="text-sm font-medium">
                            Implementation Guide File
                        </Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">
                                    PDF, DOC, DOCX (Max 10MB)
                                </p>
                            </div>
                            <Input
                                id="implementation-file"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileUpload}
                                className="mt-4"
                            />
                        </div>
                        {uploadedFile && (
                            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                                <p className="text-sm text-green-800">
                                    Uploaded: {uploadedFile.name}
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 