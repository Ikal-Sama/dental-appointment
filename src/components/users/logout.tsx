import { doLogout } from "@/app/actions/user";
import { Button } from "../ui/button";

const Logout = () => {
  return (
    <form action={doLogout}>
      <Button variant="destructive" type="submit" className="w-full" size="sm">
        Logout
      </Button>
    </form>
  );
};

export default Logout;
