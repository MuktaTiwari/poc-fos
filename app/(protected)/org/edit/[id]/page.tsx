
import OrgForm from "@/components/forms/org-form";

export default function EditOrgPage({ params }: { params: { id: string } }) {
  return <OrgForm isEdit={true} id={params.id} />;
}
