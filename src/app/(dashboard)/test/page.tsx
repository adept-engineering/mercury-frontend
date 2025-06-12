import EntitiesContainer from "@/components/entities/container";
import { dummyEntities } from "@/components/entities/dummy-data";
import PerformTestContainer from "@/components/tests/container";

export default function PerformTestsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PerformTestContainer />
    </div>
  );
}
