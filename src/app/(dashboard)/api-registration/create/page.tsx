import { ApiRegistrationForm } from "@/components/api-registration/create-form";
import { BackButton } from "@/components/ui/back-button";

export default function CreateApiRegistrationPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col items-start justify-between">
        <BackButton />
        <h1 className="text-2xl font-semibold">Register New API</h1>
      </div>
      <ApiRegistrationForm />
    </div>
  );
}
