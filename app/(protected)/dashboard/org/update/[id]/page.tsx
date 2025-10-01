import UpdateOrg from "@/components/org/update-org/page";

export default function UpdateOrgPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <UpdateOrg id={params.id} />
    </div>
  );
}