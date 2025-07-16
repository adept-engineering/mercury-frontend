import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { TransformationRule } from "@/lib/types"

export const EditRuleDialogue = ({
    editRuleDialogOpen,
    setEditRuleDialogOpen,
    editingRule,
    setEditingRule,
    updateRule,
}: {
    editRuleDialogOpen: boolean;
    setEditRuleDialogOpen: (open: boolean) => void;
    editingRule: any | null;
    setEditingRule: React.Dispatch<React.SetStateAction<any | null>>;
    updateRule: (ruleId: string, updates: Partial<any>) => void;
}) => {
    return (
        <Dialog open={editRuleDialogOpen} onOpenChange={setEditRuleDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
              <DialogTitle>Edit Transformation Rule</DialogTitle>
              <DialogDescription>
                  Update the transformation rule
              </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
              <div className="space-y-2">
                  <Label htmlFor="editRuleTitle">Rule Title</Label>
                  <Input
                      id="editRuleTitle"
                      value={editingRule?.rule_title || ""}
                      onChange={(e) => setEditingRule({...editingRule, rule_title: e.target.value})}
                      placeholder="Enter rule title"
                      required
                  />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="editRule">Transformation Rule</Label>
                  <Textarea
                      id="editRule"
                      value={editingRule?.rule || ""}
                      onChange={(e) => setEditingRule({...editingRule, rule: e.target.value})}
                      placeholder="Enter transformation rule logic"
                      rows={4}
                      required
                  />
              </div>
          </div>
          <DialogFooter>
              <Button
                  variant="outline"
                  onClick={() => setEditRuleDialogOpen(false)}
              >
                  Cancel
              </Button>
              <Button
                  onClick={() => editingRule && updateRule(editingRule.id, {
                      rule_title: editingRule.rule_title,
                      rule: editingRule.rule
                  })}
                  disabled={!editingRule?.rule_title.trim() || !editingRule?.rule.trim()}
              >
                  Update Rule
              </Button>
          </DialogFooter>
      </DialogContent>
  </Dialog>
    )
}