import { EditRoleMobile } from "@/components/landingPage/EditRoleMobile";
import { getCurrentUser } from "@/lib/actions";

export default async function Home() {
  const user = await getCurrentUser();
  if (!user.mobile || !user.role || (!user.mobile && user.role === "user")) {
    return (
      <div className="w-full justify-center items-center flex h-screen">
        <EditRoleMobile />
      </div>
    );
  }

  return <div>hello</div>;
}
