import { DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"


export const AddTransformationRuleDialogue = ({
    addRuleDialogOpen,
    setAddRuleDialogOpen,
    newRule,
    setNewRule,
    addRule,
}: {
    addRuleDialogOpen: boolean;
    setAddRuleDialogOpen: (open: boolean) => void;
    newRule: { rule_title: string; rule: string };
    setNewRule: React.Dispatch<React.SetStateAction<{ rule_title: string; rule: string }>>;
    addRule: () => void;
}) => {
    return (
        <Dialog open={addRuleDialogOpen} onOpenChange={setAddRuleDialogOpen}>
        <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Rule
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle>Add Compliance Rule</DialogTitle>
                <DialogDescription>
                    Add a new compliance rule to your map
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="ruleTitle">Rule Title</Label>
                    <Input
                        id="ruleTitle"
                        value={newRule.rule_title}
                        onChange={(e) => setNewRule(prev => ({ ...prev, rule_title: e.target.value }))}
                        placeholder="Enter rule title"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="rule">Compliance Rule</Label>
                    <Textarea
                        id="rule"
                        value={newRule.rule}
                        onChange={(e) => setNewRule(prev => ({ ...prev, rule: e.target.value }))}
                        placeholder="Enter transformation rule logic"
                        rows={4}
                        required
                    />
                </div>
            </div>
            <DialogFooter>
                <Button
                    variant="outline"
                    onClick={() => setAddRuleDialogOpen(false)}
                >
                    Cancel
                </Button>
                <Button onClick={addRule}>
                    Add Rule
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    )
}