import { getApiRegistrationById } from "@/actions/api-registration";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Info, Globe, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { TableInfoContentDesktop } from "@/components/table-info-column-content";

export const dynamic = "force-dynamic";

interface ApiRegistrationPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Parameter {
  name: string;
  description: string;
}

export default async function ApiRegistrationPage({
  params,
}: ApiRegistrationPageProps) {
  const session = await auth();
  const { id } = await params;

  try {
    const apiData = await getApiRegistrationById(
      { id: id },
      session?.user?.token || ""
    );

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
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-6 flex flex-col items-start justify-between">
          <BackButton />
          <h1 className="text-xl font-semibold text-foreground">
            {formattedApiData?.name || "API Registration Details"}
          </h1>
        </div>

        {/* Tabs */}
        <Card className="rounded-lg border p-6 mt-3 mb-10">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="tabs_list dark:bg-input-dark">
              <TabsTrigger
                value="details"
                className="tabs_trigger data-[state=active]:bg-transparent data-[state=active]:text-primary">
                <Info className="h-4 w-4" />
                API Information
              </TabsTrigger>
              <TabsTrigger
                value="endpoints"
                className="tabs_trigger data-[state=active]:bg-transparent data-[state=active]:text-primary">
                <Globe className="h-4 w-4" />
                Endpoints
              </TabsTrigger>
              <TabsTrigger
                value="input-params"
                className="tabs_trigger data-[state=active]:bg-transparent data-[state=active]:text-primary">
                <ArrowDownToLine className="h-4 w-4" />
                Input Parameters
              </TabsTrigger>
              <TabsTrigger
                value="output-params"
                className="tabs_trigger data-[state=active]:bg-transparent data-[state=active]:text-primary">
                <ArrowUpFromLine className="h-4 w-4" />
                Output Parameters
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-7">
              <div className="mb-6">
               
                <TableInfoContentDesktop
                  details={[
                    { name: "Name", value: formattedApiData.name },
                    {
                      name: "Version",
                      value: formattedApiData.default_version,
                    },
                    {
                      name: "Description",
                      value: formattedApiData.description,
                    }
                  ]}
                />
              </div>
            </TabsContent>

            <TabsContent value="endpoints" className="mt-7">
              {formattedApiData.endpoints.map(
                (endpoint: any, index: number) => {
                  const endpointDetails = [
                    { name: "URL", value: endpoint.url },
                    { name: "Version", value: `v${endpoint.version}` },
                    {
                      name: "Status",
                      value: endpoint.is_default ? "Default" : "Active",
                    },
                  ];

                  return (
                    <div key={index} className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                       
                        <div className="flex items-center gap-2">
                          {endpoint.is_default && (
                            <Badge variant="default">Default</Badge>
                          )}
                        </div>
                      </div>
                      <TableInfoContentDesktop details={endpointDetails} />
                    </div>
                  );
                }
              )}
            </TabsContent>

            <TabsContent value="input-params" className="mt-7">
              {formattedApiData.endpoints.map(
                (endpoint: any, index: number) => (
                  <div
                    key={index}
                    className="text-xs bg-gray-50 p-4 rounded border overflow-auto">
                    <pre className="whitespace-pre-wrap">
                      {(() => {
                        try {
                          // First, try to parse as JSON
                          let parsed = JSON.parse(endpoint.input_parameters);

                          // If the parsed result is a string (with escaped characters), parse it again
                          if (typeof parsed === "string") {
                            parsed = JSON.parse(parsed);
                          }

                          return JSON.stringify(parsed, null, 2);
                        } catch (error) {
                          return endpoint.input_parameters;
                        }
                      })()}
                    </pre>
                  </div>
                )
              )}
            </TabsContent>

            <TabsContent value="output-params" className="mt-7">
              {formattedApiData.endpoints.map(
                (endpoint: any, index: number) => (
                  <div
                    key={index}
                    className="text-xs bg-gray-50 p-4 rounded border overflow-auto">
                    <pre className="whitespace-pre-wrap">
                      {(() => {
                        try {
                          // First, try to parse as JSON
                          let parsed = JSON.parse(endpoint.output_parameters);

                          // If the parsed result is a string (with escaped characters), parse it again
                          if (typeof parsed === "string") {
                            parsed = JSON.parse(parsed);
                          }

                          return JSON.stringify(parsed, null, 2);
                        } catch (error) {
                          return endpoint.output_parameters;
                        }
                      })()}
                    </pre>
                  </div>
                )
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    );
  } catch (error) {
    console.error("Error fetching API data:", error);
    notFound();
  }
}
