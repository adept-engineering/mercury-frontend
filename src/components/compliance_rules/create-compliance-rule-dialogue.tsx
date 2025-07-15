"use client"
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useManageComplianceRules } from "@/hooks/use-manage-compliance-rules";
import { useToast } from "@/hooks/use-toast";
import { Plus,Ruler } from "lucide-react";


export function CreateComplianceRuleDialogue() {
    const [open, setOpen] = useState(false);
    const [ruleTitle, setRuleTitle] = useState("");
    const [rule, setRule] = useState("");

    const { createComplianceRuleMutation } = useManageComplianceRules();
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!ruleTitle.trim() || !rule.trim()) {
            toast({
                title: "Error",
                variant: "destructive",
                description: "Please fill in all fields",
            });
            return;
        }

        createComplianceRuleMutation({
            rule: rule.trim(),
            rule_title: ruleTitle.trim()
        }, {
            onSuccess: () => {
                toast({
                    title: "Success",
                    description: "Compliance rule created successfully",
                });
                setOpen(false);
                setRuleTitle("");
                setRule("");
            },
            onError: (error) => {
                toast({
                    title: "Error",
                    variant: "destructive",
                    description: "Failed to create compliance rule",
                });
                console.error("Error creating compliance rule:", error);
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                   <Plus className="h-4 w-4" /> Create Compliance Rule
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-lg text-foreground"> 
                         Create Compliance Rule
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Rule Title</label>
                        <Input
                            type="text"
                            value={ruleTitle}
                            onChange={e => setRuleTitle(e.target.value)}
                            placeholder="Enter rule title"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Rule</label>
                        <Textarea
                           
                            value={rule}
                            onChange={e => setRule(e.target.value)}
                            placeholder="Enter rule description"
                            required
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
