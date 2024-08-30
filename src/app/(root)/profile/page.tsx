import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ProfileForm from "@/components/users/profile-form";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit, UserCog } from "lucide-react";
import { auth } from "@/auth";
import Link from "next/link";

import { getUserById } from "@/app/actions/user";
import { getUserAppointments } from "@/app/actions/appointment";

export default async function ProfilePage() {
  // const [user, setUser] = useState<string | "">();
  // const [openDialog, setOpenDialog] = useState(false);
  // const [imageUrl, setImageUrl] = useState<string>("");

  const session = await auth();
  const id = session?.user?.id as any;
  const { user } = await getUserById(id);

  const appointments = await getUserAppointments(id);
  const totalAppointments = appointments?.appointments?.length;
  const newAppointments = appointments?.appointments?.filter(
    (appointment) => appointment.status === "new"
  ).length;
  const canceledAppointments = appointments?.appointments?.filter(
    (appointment) => appointment.status === "canceled"
  ).length;

  return (
    <div className="mt-20">
      <h1 className="text-2xl font-semibold">My Profile</h1>
      <div className=" flex gap-5">
        {user && (
          <Card
            className="my-5 w-full relative"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <TooltipProvider>
              <div className="absolute right-5 top-5">
                <Tooltip>
                  <Link href={`/profile/${user.id}`}>
                    <TooltipTrigger>
                      <UserCog className="text-primary w-6 h-6  cursor-pointer hover:text-violet-800" />
                    </TooltipTrigger>
                  </Link>
                  <TooltipContent>Profile Settings</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>

            <CardContent className="p-12 flex gap-10 items-center w-full">
              <div className="flex items-center w-full gap-10">
                <div className="bg-primary/50 p-2 rounded-full">
                  <Avatar className="w-[10rem] h-[10rem]">
                    <AvatarImage
                      src={user?.image || "/assets/avatar.png"}
                      className="object-cover"
                    />
                  </Avatar>
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <h1 className="text-2xl text-zinc-700 tracking-wide">
                    {
                      //@ts-ignore
                      user.name
                    }
                  </h1>
                  <p className="text-zinc-600">
                    {
                      //@ts-ignore
                      user?.email
                    }
                  </p>
                  <p className="text-sm flex gap-2 text-zinc-600">
                    <span>Age:</span>
                    <span>
                      {
                        //@ts-ignore
                        user?.age
                      }
                    </span>
                  </p>
                  <p className="text-sm flex gap-2 text-zinc-600">
                    <span>Address:</span>
                    <span>
                      {
                        //@ts-ignore
                        user?.address
                      }
                    </span>
                  </p>
                </div>
              </div>
              <div className="bg-zinc-500 h-32 w-[1px]" />
              <div className="w-full">
                <p className="text-zinc-500">Bio:</p>
                <p className="text-sm text-zinc-700">
                  {
                    //@ts-ignore
                    user?.bio
                  }
                </p>
              </div>
            </CardContent>
            <CardFooter className="px-12 flex gap-5">
              <Badge variant="outline" className="bg-primary text-white">
                New Appointments: {newAppointments}
              </Badge>
              <Badge variant="secondary" className="">
                Total Appointments: {totalAppointments}
              </Badge>
              <Badge variant="destructive" className="">
                Cancelled Appointments: {canceledAppointments}
              </Badge>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
