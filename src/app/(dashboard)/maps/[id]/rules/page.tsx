import { getMapRules } from "@/actions/maps";
import { auth } from "@/auth";
import { TransformationRuleContainer } from "@/components/transformation-map/rules/transformation-rule-container";

export default async function TransformationMapRulesPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ map_title: string; map_id: string }>;
}) {
  const session = await auth();
  const { id } = await params;
  const { map_title, map_id } = await searchParams;
  const mapRules = await getMapRules(session?.user?.token ?? "", map_id);
  console.log(mapRules);
  return (
    <TransformationRuleContainer
      transformationRules={mapRules}
      map_title={map_title}
      map_id={map_id}
      mapId={id}
    />
  );
}
