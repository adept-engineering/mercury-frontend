import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface APIEndpoint {
  type: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
}

interface APIContainerProps {
  endpoints: APIEndpoint[];
}

export function APIContainer({ endpoints }: APIContainerProps) {
  return (
    <div className="space-y-4">
      {endpoints.map((endpoint, index) => (
        <Card
          key={index}
          className={`border-l-4 ${
            endpoint.type === "GET"
              ? "border-l-yellow-500"
              : endpoint.type === "POST"
              ? "border-l-blue-500"
              : endpoint.type === "PUT"
              ? "border-l-orange-500"
              : "border-l-red-500"
          }`}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between pt-2">
              <CardTitle className="text-lg font-mono">
                {endpoint.endpoint}
              </CardTitle>
              <Badge
                variant={
                  endpoint.type === "GET"
                    ? "default"
                    : endpoint.type === "POST"
                    ? "outline"
                    : endpoint.type === "PUT"
                    ? "secondary"
                    : "destructive"
                }
              >
                {endpoint.type}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <p>Request Type: {endpoint.type}</p>
              <p>Endpoint: {endpoint.endpoint}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
