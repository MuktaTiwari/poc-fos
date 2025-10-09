import OrgForm from "@/components/forms/org-form";

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const base = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  if (!base) return [];

  try {
    const res = await fetch(`${base}/business?type=ORGANIZATION`);
    const { data = [] } = await res.json();
    return data
      .filter((o: any) => o?.id)
      .map((o: any) => ({ id: String(o.id) }));
  } catch {
    return [];
  }
}

export default function EditOrgPage({ params }: { params: { id: string } }) {
  return <OrgForm isEdit={true} id={params.id} />;
}