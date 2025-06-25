// src/components/account/create-user-dialog.tsx
"use client"
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {  MultiSelectCombobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEntityIds } from "@/hooks/use-entityIds";
import { toast } from "@/hooks/use-toast";

// Dummy entity IDs, replace with your actual data fetching logic


export function CreateUserDialogue({ onCreate }: { onCreate: (email: string, entityIds: string[], firstName: string, lastName: string, role: string) => void }) {
    const [open, setOpen] = useState(false);
    const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("user");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (role === "user" && selectedEntities.length === 0) {
            toast({
                title: "Error",
                variant: "destructive",
                description: "Please select at least one entity",
            });
            return;
        }
        onCreate(email, selectedEntities, firstName, lastName, role);
        setOpen(false);
        setEmail("");
        setFirstName("");
        setLastName("");
        setRole("user");
        setSelectedEntities([]);
    };
    const { data: entityIds } = useEntityIds()
    const entityOptions = (entityIds ?? []).map((entity: any) => ({
        label: entity,
        value: entity,
    }));
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
                        <label className="block mb-1 text-sm font-medium">First Name</label>
                        <Input
                            type="text"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            placeholder="John"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Last Name</label>
                        <Input
                            type="text"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            placeholder="Doe"
                            required
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
                    <div>
                        <label className="block mb-1 text-sm font-medium">Role</label>
                        <Select value={role} onValueChange={setRole}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="system_admin">System Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {role === "user" && (
                        <div>
                            <label className="block mb-1 text-sm font-medium">Entities</label>
                            <MultiSelectCombobox
                                options={entityOptions}
                                values={selectedEntities}
                                onChange={setSelectedEntities}
                                placeholder="Select entities"
                            />
                        </div>)
                    }
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