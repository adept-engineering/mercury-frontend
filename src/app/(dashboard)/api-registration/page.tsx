import { getApiRegistration } from "@/actions/api-registration";
import ApiRegistrationContainer from "@/components/api-registration/container";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function ApiRegistrationPage() {
  const session = await auth();
  const apisData = await getApiRegistration(session?.user?.token || "");
  console.log(apisData, "apisData");

  return (
    <div className="flex flex-col gap-6 p-6">
      <ApiRegistrationContainer apisData={apisData} />
    </div>
  );
}
