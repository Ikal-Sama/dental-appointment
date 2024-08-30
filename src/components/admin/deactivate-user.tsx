import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { toggleUserStatus } from "@/app/actions/deactivate";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

function DeactivateUser({ id, active }: { id: string; active: string }) {
  console.log(active);

  const { toast } = useToast();
  const [isActive, setIsActive] = useState(active);

  const handleToggle = async (checked: boolean) => {
    try {
      const newStatus = checked ? "deactivate" : "active";
      const data = await toggleUserStatus(id, newStatus);

      if (data.success) {
        setIsActive(newStatus);
        toast({
          title: "Status updated",
          description: `User ${newStatus.toUpperCase()} successfully!`,
        });
      } else {
        // Handle error
        toast({
          title: "Something went wrong",
          description: `${data.error}`,
        });
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <div className="flex gap-2 items-center mt-4">
      <Switch
        checked={isActive === "deactivate"}
        onCheckedChange={handleToggle}
      />

      <Label htmlFor="airplane-mode" className="text-red-500">
        Deactivate User
      </Label>
    </div>
  );
}

export default DeactivateUser;
