// src/components/account/create-user-dialog.tsx
"use client"
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Combobox, MultiSelectCombobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { getEntityIds } from "@/actions/entity";
import { useEntityIds } from "@/hooks/use-entityIds";

// Dummy entity IDs, replace with your actual data fetching logic


export function CreateUserDialogue({ onCreate }: { onCreate: (email: string, entityIds: string[]) => void }) {
    const [open, setOpen] = useState(false);
    const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate(email, selectedEntities);
        setOpen(false);
        setEmail("");
        setSelectedEntities([]);
    };
    const { data: entityIds, isLoading } = useEntityIds()
    console.log(entityIds)
    const entityOptions = (entityIds ?? []).map((entity: any) => ({
        label: entity,
        value: entity,
    }));
   console.log(entityOptions,"entityop")
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                    Create User
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create User</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Entities</label>
                        <MultiSelectCombobox
                            options={entityOptions}
                            values={selectedEntities}
                            onChange={setSelectedEntities}
                            placeholder="Select entities"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Email</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="user@example.com"
                            required
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white">
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}