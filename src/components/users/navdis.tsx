import { auth } from "@/auth";

interface Props {
  userName: string;
}

export const NavUserDisplay = async ({ userName }: Props) => {
  const session = await auth();
  const loggedInUser = session?.user;
  const username = loggedInUser?.name;
  userName = username as string;

  return <span>{session?.user?.name && <span>{userName}</span>}</span>;
};
