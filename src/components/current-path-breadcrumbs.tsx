"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function CurrentPathBreadcrumbs() {
    const pathname = usePathname();

    // Split the pathname and filter out empty strings
    const pathSegments = pathname.split('/').filter(Boolean);

    // Create breadcrumb items
    const breadcrumbItems = pathSegments.map((segment, index) => {
        // Build the href for this segment
        const href = '/' + pathSegments.slice(0, index + 1).join('/');

        // Format the segment name (capitalize and replace hyphens)
        const segmentName = segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        const isLast = index === pathSegments.length - 1;

        return {
            name: segmentName,
            href,
            isLast
        };
    });

    // Add a home/dashboard item at the beginning
    const allBreadcrumbs = [
      
        ...breadcrumbItems.map((item, index) => ({
            ...item,
            isLast: index === breadcrumbItems.length - 1
        }))
    ];

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {allBreadcrumbs.map((breadcrumb, index) => (
                    <div key={breadcrumb.href} className="flex items-center">
                        <BreadcrumbItem className="text-sm text-primary">
                            {breadcrumb.isLast ? (
                                <BreadcrumbPage className="text-sm text-primary">{breadcrumb.name}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink asChild>
                                    <Link href={breadcrumb.href}>{breadcrumb.name}</Link>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {!breadcrumb.isLast && <BreadcrumbSeparator />}
                    </div>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
