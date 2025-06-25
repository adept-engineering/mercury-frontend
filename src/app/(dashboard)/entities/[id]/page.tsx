import { getEntity } from "@/actions/entity";
import { MapEntityObjToArray } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableInfoContentDesktop, TableInfoContentMobile } from "@/components/table-info-content";
import { CurrentPathBreadcrumbs } from "@/components/current-path-breadcrumbs";

export default async function EntityPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const entity = await getEntity(id);
    const entityArray = MapEntityObjToArray(entity);
    console.log(entityArray);

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mt-4">Entity Details</h1>
                <CurrentPathBreadcrumbs />
            </div>
            <section className="page_section">
                <div className="max-lg:hidden">
                    <TableInfoContentDesktop details={entityArray} />
                </div>

                <div className="hidden max-lg:block">
                    <TableInfoContentMobile details={entityArray} />
                </div>
            </section>
        </div>
    );
}