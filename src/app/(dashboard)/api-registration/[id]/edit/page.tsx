import { getApiRegistrationById } from "@/actions/api-registration";
import { EditApiRegistrationForm } from "@/components/api-registration/edit-form";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/ui/back-button";

export const dynamic = "force-dynamic";

interface EditApiRegistrationPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditApiRegistrationPage({
  params,
}: EditApiRegistrationPageProps) {
  const session = await auth();
  const { id } = await params;

  try {
    const apiData = await getApiRegistrationById(
      { id: id },
      session?.user?.token || ""
    );
    console.log(apiData);
    if (!apiData) {
      notFound();
    }
    const formattedApiData = {
      ...apiData,
      endpoints: apiData.endpoints.map((endpoint: any) => ({
        ...endpoint,
        url: endpoint.endpoint,
        version: parseInt(endpoint.version),
        is_default: true,
      })),
    };

    return (
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col items-start justify-between">
          <BackButton />
          <h1 className="text-2xl font-semibold">Edit API Registration</h1>
        </div>
        <EditApiRegistrationForm apiData={formattedApiData} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching API data:", error);
    notFound();
  }
  
}
