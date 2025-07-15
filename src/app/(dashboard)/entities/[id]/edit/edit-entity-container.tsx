"use client"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { EditEntityForm } from "@/components/entities/edit-form";
import { EntityData } from "@/lib/types";

export default function EditEntityContainer({defaultValues, id}: {defaultValues: EntityData, id: string}) {
    const router = useRouter();
    const handleBackToData = () => {
        router.back();
      };
    return (
        <div className="flex flex-col gap-4 p-6">
    
        

          <div className="flex items-center justify-between mb-4">
            <div>
            <Button
              variant={'link'}
              className="pl-0!"
              onClick={handleBackToData}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Entities
            </Button>
              <h1 className="text-xl font-semibold">Edit Entity</h1>
            </div>

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="#"
                    className="text-primary cursor-pointer"
                    onClick={handleBackToData}
                  >
                    Entities
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-muted-foreground">
                 Edit
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-muted-foreground">
                  {defaultValues.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <EditEntityForm defaultValues={defaultValues} id={id} />
        </div>
    )
}