import EditOrgClient from "./edit-org-client";

// For static export: generate a placeholder route
// All dynamic IDs will be handled client-side via this placeholder
export function generateStaticParams() {
  return [{ id: "placeholder" }];
}

export default async function EditOrgPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditOrgClient id={id} />;
}
