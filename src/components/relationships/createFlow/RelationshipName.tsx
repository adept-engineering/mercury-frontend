"use client";

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function RelationshipName() {
    const [relationshipName, setRelationshipName] = useState('');

    // Load from localStorage on component mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const stored = localStorage.getItem('createRelationship_name');
                if (stored) {
                    setRelationshipName(stored);
                }
            } catch (error) {
                console.warn('Failed to read from localStorage:', error);
            }
        }
    }, []);

    // Save to localStorage whenever relationshipName changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('createRelationship_name', relationshipName);
            } catch (error) {
                console.warn('Failed to write to localStorage:', error);
            }
        }
    }, [relationshipName]);

    return (
        <div className="space-y-6 ">
            

            <div className="space-y-2">
                <Label htmlFor="relationship-name" className="text-sm font-medium">
                    Relationship Name
                </Label>
                <Input
                    id="relationship-name"
                    type="text"
                    value={relationshipName}
                    onChange={(e) => setRelationshipName(e.target.value)}
                    placeholder="Enter relationship name"
                    className="w-full"
                />
            </div>
        </div>
    );
}
