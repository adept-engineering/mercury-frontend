"use client"
import { EditComplianceRuleForm } from "@/components/compliance_rules/edit-form"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export const EditFormContainer = ({complianceRuleId,defaultValues}: {complianceRuleId: string,defaultValues:{rule: string,rule_title: string}}) => {
    const router = useRouter();
    const handleBackToData = () => {
        router.push("/compliance-rules");
    }
    return (
        <div className="p-6">
        {/* Back Button */}
        <div className="flex items-center gap-4 mb-4">
            <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={handleBackToData}
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Compliance Rules
            </Button>
        </div>

        <div className="flex items-center justify-between mb-4">
            <div>
                <h1 className="text-2xl font-semibold">
                    Edit Compliance Rule
                </h1>
                <p className="text-muted-foreground font-sm">
                    Use this form to edit the rule
                </p>
            </div>

            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            href="#"
                            className="text-primary cursor-pointer"
                            onClick={handleBackToData}
                        >
                            Compliance Rules
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-muted-foreground">
                            Create
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>

        <EditComplianceRuleForm complianceRuleId={complianceRuleId} defaultValues={defaultValues} />
    </div>
    )
}