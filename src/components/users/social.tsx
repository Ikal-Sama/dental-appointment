import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";
import { doSocialLogin } from "@/app/actions/user";

interface SocialProps {
  label: string;
}
export const Social = ({ label }: SocialProps) => {
  return (
    <div className="w-full flex flex-col ">
      <p className="mb-3 text-center">{label}</p>
      <form className="flex items-center w-full gap-x-2" action={doSocialLogin}>
        <Button
          type="submit"
          name="action"
          value="google"
          className="w-full"
          size="lg"
          variant="outline"
        >
          <FcGoogle className="h-5 w-5" />
        </Button>
        <Button
          type="submit"
          name="action"
          value="github"
          className="w-full"
          size="lg"
          variant="outline"
        >
          <FaGithub className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};
