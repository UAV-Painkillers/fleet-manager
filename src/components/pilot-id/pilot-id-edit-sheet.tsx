"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent } from "../ui/card";
import {
  PencilIcon,
  PhoneIcon,
  MailIcon,
  GlobeIcon,
  UploadIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import Image from "next/image";
import { FormEventHandler, useCallback, useMemo, useState } from "react";
import { PartialPilot } from "./pilot-id-card";
import Link from "next/link";
import { DialogProps } from "@radix-ui/react-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cloneDeep, merge } from "lodash-es";
import { usePilotAvatarPlaceholder } from "@/hooks/use-pilot-avatar-placeholder";

function SocialMediaLinks({ pilot }: { pilot: PartialPilot }) {
  return (
    <div className="flex items-center space-x-4">
      <Link
        href="#"
        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        prefetch={false}
      >
        <TwitterIcon className="w-6 h-6" />
        <span className="sr-only">Twitter</span>
      </Link>
      <Link
        href="#"
        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        prefetch={false}
      >
        <InstagramIcon className="w-6 h-6" />
        <span className="sr-only">Instagram</span>
      </Link>
      <Link
        href="#"
        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        prefetch={false}
      >
        <YoutubeIcon className="w-6 h-6" />
        <span className="sr-only">Youtube</span>
      </Link>
    </div>
  );
}

export type PilotIdEditSheetProps = Omit<React.FC<DialogProps>, "trigger"> & {
  trigger: React.ReactNode;
  pilot: PartialPilot;
};

export function PilotIdEditSheet(props: PilotIdEditSheetProps) {
  const { pilot: incomingPilot } = props;

  const [pilot, setPilot] = useState<PartialPilot>(incomingPilot);

  const setField: <T extends keyof PartialPilot>(
    field: T,
    value: PartialPilot[T]
  ) => void = useCallback((field, value) => {
    setPilot((currentPilot) => ({
      ...currentPilot,
      [field]: value,
    }));
  }, []);

  const fallbackBannerHref = "/placeholder.svg";
  const fallbackAvatarHref = usePilotAvatarPlaceholder(pilot.id ?? 0);

  const pilotNameShorthand = useMemo(() => {
    return pilot.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }, [pilot.name]);

  const onSubmit = useCallback(() => {
    console.log(cloneDeep(pilot));
  }, [pilot]);

  return (
    <Sheet>
      <SheetTrigger asChild>{props.trigger}</SheetTrigger>
      <SheetContent side="bottom" className="max-w-4xl mx-auto">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden col-span-1 md:col-span-3">
            <div className="relative h-48 sm:h-64 md:h-80 bg-gray-100 dark:bg-gray-800">
              <Image
                src={pilot.bannerHref ?? fallbackBannerHref}
                alt="Profile banner"
                className="w-full h-full object-cover"
                width="1000"
                height="800"
              />
              <Avatar className="absolute top-4 left-4 border-4 border-white dark:border-gray-900 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
                <AvatarImage src={pilot.logoHref ?? fallbackAvatarHref} />
                <AvatarFallback>{pilotNameShorthand}</AvatarFallback>
              </Avatar>
            </div>

            <CardContent className="p-4 sm:p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="email">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={pilot.name ?? ""}
                    onChange={(e) => setField("name", e.target.value)}
                    required
                  />

                  <Label htmlFor="email">Nickname</Label>
                  <Input
                    id="nickname"
                    type="text"
                    value={pilot.nickname ?? ""}
                    onChange={(e) => setField("nickname", e.target.value)}
                    required
                  />
                </div>

                <SocialMediaLinks pilot={pilot} />
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 sm:grid-cols-1 md-grid-cols-2 lg:grid-cols-9 gap-6">
                {/* Contact Info */}
                <Card className="col-span-1 lg:col-span-4">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-4">
                          <PhoneIcon className="w-5 h-5" />
                          <div>
                            <Label htmlFor="contact_phone">Phone</Label>
                            <Input
                              id="contact_phone"
                              type="tel"
                              value={pilot.contact_phone ?? ""}
                              onChange={(e) =>
                                setField("contact_phone", e.target.value)
                              }
                              required
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <MailIcon className="w-5 h-5" />
                          <div>
                            <Label htmlFor="contact_email">E-Mail</Label>
                            <Input
                              id="contact_email"
                              type="mail"
                              value={pilot.contact_email ?? ""}
                              onChange={(e) =>
                                setField("contact_email", e.target.value)
                              }
                              required
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <GlobeIcon className="w-5 h-5" />
                          <div>
                            <Label htmlFor="contact_website">Website</Label>
                            <Input
                              id="contact_website"
                              type="url"
                              value={pilot.contact_website ?? ""}
                              onChange={(e) =>
                                setField("contact_website", e.target.value)
                              }
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        <SheetFooter>
          <Button type="button" onClick={onSubmit}>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
