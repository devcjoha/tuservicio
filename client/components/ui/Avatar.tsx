import { useAuth } from "@/hooks/useAuth";
import { UserLock, UserRound } from "lucide-react";

function Avatar() {
  const { user } = useAuth();
  return (
    <> {user === null ?

      <div className="dashboard-avatar-container flex items-center justify-center w-10 h-10 border rounded-full border-gray-icon">
        <UserLock className="text-gray-icon" />
      </div>
      :
      <div className="dashboard-avatar-container flex items-center justify-center w-10 h-10 border rounded-full border-gray-icon">
        <UserRound  className="text-gray-icon" />
      </div>

    }
    </>
  )
}
export default Avatar;