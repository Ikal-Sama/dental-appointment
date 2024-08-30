"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./back-button";
import { Header } from "./card-header";
import { Social } from "./social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerTitle: string;
  headerLabel: string;
  backButtonLabel: string;
  backButtonText: string;
  backButtonHref: string;
  // socialLabel: string;
  // showSocial?: boolean;
}
export const CardWrapper = ({
  children,
  headerTitle,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  backButtonText,
}: CardWrapperProps) => {
  return (
    <Card className=" w-[500px] ">
      <CardHeader className="text-teal-500">
        <Header title={headerTitle} label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {/* {showSocial && (
        <CardFooter>
          <Social label={socialLabel} />
        </CardFooter>
      )} */}
      <CardFooter>
        <BackButton
          text={backButtonText}
          href={backButtonHref}
          label={backButtonLabel}
        />
      </CardFooter>
    </Card>
  );
};
