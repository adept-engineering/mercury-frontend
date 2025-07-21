import { getTransformationMapRules } from "@/actions/transformationMaps";
import { auth } from "@/auth";
import { TransformationRuleContainer } from "@/components/transformation-map/rules/transformation-rule-container";

export default async function TransformationMapRulesPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ map_title: string }>;
}) {
  const session = await auth();
  const { id } = await params;
  const { map_title } = await searchParams;
  const transformationRules = await getTransformationMapRules(
    session?.user?.token ?? "",
    id
  );
  console.log(transformationRules);
  return (
    <TransformationRuleContainer
      transformationRules={transformationRules}
      map_title={map_title}
    />
  );
}
