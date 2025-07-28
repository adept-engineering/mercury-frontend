import { getRelationshipById } from "@/actions/relationships";
import { RelationshipDetails } from "@/components/relationships/relationship-details";
import { auth } from "@/actions/auth";

export const dynamic = "force-dynamic";

export default async function RelationshipDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  const relationship = await getRelationshipById(id, session?.user?.token || "");

  return <RelationshipDetails relationship={relationship} />;
}
