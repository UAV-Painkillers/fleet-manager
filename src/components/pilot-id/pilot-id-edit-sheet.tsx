"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent } from "../ui/card";
import {
  PhoneIcon,
  MailIcon,
  GlobeIcon,
  InstagramIcon,
  YoutubeIcon,
  LoaderIcon,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { PartialPilot } from "./pilot-id-card";
import { DialogProps } from "@radix-ui/react-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { usePilotAvatarPlaceholder } from "@/hooks/use-pilot-avatar-placeholder";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { FacebookIcon } from "../icons/facebook-icon";
import { TikTokIcon } from "../icons/tiktok-icon";
import { updatePilotIdAction } from "./pilot-id-edit-sheet.actions";

export type PilotIdEditSheetProps = Omit<React.FC<DialogProps>, "trigger"> & {
  trigger: React.ReactNode;
  pilot: PartialPilot;
  onPilotSaved?: (updatedPilot: PartialPilot) => void;
  reloadOnSave?: boolean;
};

export function PilotIdEditSheet(props: PilotIdEditSheetProps) {
  const {
    pilot: incomingPilot,
    onPilotSaved,
    trigger,
    reloadOnSave,
    ...dialogProps
  } = props;

  const [pilot, setPilot] = useState<PartialPilot>(incomingPilot);
  const [isSaving, setIsSaving] = useState(false);

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

  const onSubmit = useCallback(async () => {
    const { error, data } = await updatePilotIdAction({
      name: pilot.name,
      nickname: pilot.nickname,
      bio: pilot.bio,
      logoHref: pilot.logoHref,
      bannerHref: pilot.bannerHref,
      tiktok_handle: pilot.tiktok_handle,
      youtube_handle: pilot.youtube_handle,
      instagram_handle: pilot.instagram_handle,
      contact_phone: pilot.contact_phone,
      contact_email: pilot.contact_email,
      contact_website: pilot.contact_website,
      facebook_handle: pilot.facebook_handle,
    });

    if (error) {
      toast.error("Oh no! Something went wrong while saving your Pilot ID.");
      console.error(error);
      return;
    }

    if (typeof onPilotSaved === "function") {
      onPilotSaved(data);
    }

    if (reloadOnSave) {
      // navigate to same pagw with different cache-buster to force reload
      const url = new URL(window.location.href);
      url.searchParams.set("cache-buster", Date.now().toString());
      window.location.href = url.toString();
    }

    toast.success("Your Pilot ID has been updated!");
  }, [
    onPilotSaved,
    pilot.bannerHref,
    pilot.bio,
    pilot.contact_email,
    pilot.contact_phone,
    pilot.contact_website,
    pilot.facebook_handle,
    pilot.instagram_handle,
    pilot.logoHref,
    pilot.name,
    pilot.nickname,
    pilot.tiktok_handle,
    pilot.youtube_handle,
    reloadOnSave,
  ]);

  const socialMediaInputs = useMemo(() => {
    return [
      {
        field: "facebook_handle",
        icon: FacebookIcon,
        label: "Facebook",
      },
      {
        field: "tiktok_handle",
        icon: TikTokIcon,
        label: "TikTok",
      },
      {
        field: "instagram_handle",
        icon: InstagramIcon,
        label: "Instagram",
      },
      {
        field: "youtube_handle",
        icon: YoutubeIcon,
        label: "Youtube",
      },
    ] as Array<{
      field: keyof PartialPilot;
      icon: React.FC<React.SVGProps<SVGSVGElement>>;
      label: string;
    }>;
  }, []);

  return (
    <Sheet {...dialogProps}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side="bottom"
        className="max-w-4xl mx-auto max-h-screen overflow-auto"
      >
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Present yourself to the world. Click save when you&apos;re done.
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
              <Label htmlFor="email">Name</Label>
              <Input
                id="name"
                type="text"
                value={pilot.name ?? ""}
                onChange={(e) => setField("name", e.target.value)}
                required
              />

              <br />

              <Label htmlFor="email">Pilot-Name / Nickname</Label>
              <Input
                id="nickname"
                type="text"
                value={pilot.nickname ?? ""}
                onChange={(e) => setField("nickname", e.target.value)}
                required
              />

              <Separator className="my-6" />

              <small>
                <b>
                  <i>Be aware, this information is public.</i>
                </b>
              </small>

              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Info */}
                <Card>
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

                {/* Social Media */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        {socialMediaInputs.map((inputDefinition) => (
                          <div
                            key={`social-media-input--${inputDefinition.field}`}
                            className="flex items-center space-x-4"
                          >
                            <inputDefinition.icon className="w-5 h-5" />
                            <div>
                              <Label htmlFor={inputDefinition.field}>
                                {inputDefinition.label}
                              </Label>
                              <Input
                                id={inputDefinition.field}
                                type="text"
                                value={pilot[inputDefinition.field] ?? ""}
                                onChange={(e) =>
                                  setField(
                                    inputDefinition.field,
                                    e.target.value
                                  )
                                }
                                required
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        <SheetFooter className="mt-4">
          <Button type="button" onClick={onSubmit}>
            {isSaving && (
              <LoaderIcon
                className={cn(isSaving ? "animate-spin" : "", "w-6 h-6")}
              />
            )}
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
