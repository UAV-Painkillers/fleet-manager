import { Pilot as PilotDB } from "@/types/supabase-custom";
import {
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
  GlobeIcon,
  MailIcon,
  PhoneIcon,
  PencilIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { Card, CardContent } from "../ui/card";
import { PilotShareButton } from "./pilot-share-button";
import { Button } from "../ui/button";
import { PilotShareQRCode } from "./pilot-share-qrcode";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PilotIdEditSheet } from "./pilot-id-edit-sheet";
import { usePilotAvatarPlaceholder } from "@/hooks/use-pilot-avatar-placeholder";
import { PilotIdDocumentsCard } from "./documents/pilot-id-documents-card";
import { FacebookIcon } from "../icons/facebook-icon";
import { TikTokIcon } from "../icons/tiktok-icon";

export type PartialPilot = Partial<PilotDB>;

function SocialMediaLinks({ pilot }: { pilot: PartialPilot }) {
  const handleWithAtSign = useCallback((handle: string | undefined | null) => {
    if (!handle) {
      return undefined;
    }

    return handle.startsWith("@") ? handle : "@" + handle;
  }, []);

  const socialMediaLinks = useMemo(() => {
    return [
      {
        prefix: "https://www.facebook.com/",
        handle: pilot.facebook_handle,
        icon: FacebookIcon,
        label: "Facebook",
      },
      {
        prefix: "https://www.tiktok.com/",
        handle: handleWithAtSign(pilot.tiktok_handle),
        icon: TikTokIcon,
        label: "TikTok",
      },
      {
        prefix: "https://www.instagram.com/",
        handle: pilot.instagram_handle,
        icon: InstagramIcon,
        label: "Instagram",
      },
      {
        prefix: "https://www.youtube.com/",
        handle: handleWithAtSign(pilot.youtube_handle),
        icon: YoutubeIcon,
        label: "Youtube",
      },
    ].filter((linkDefinition) => linkDefinition.handle) as Array<{
      prefix: string;
      handle: string;
      icon: React.FC<React.SVGProps<SVGSVGElement>>;
      label: string;
    }>;
  }, [
    pilot.facebook_handle,
    pilot.tiktok_handle,
    pilot.instagram_handle,
    pilot.youtube_handle,
    handleWithAtSign,
  ]);

  return (
    <div className="flex items-center space-x-4">
      {socialMediaLinks.map((linkDefinition) => (
        <Link
          key={`social-media-link--${linkDefinition.prefix}`}
          href={`${linkDefinition.prefix}${linkDefinition.handle}`}
          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          prefetch={false}
          target="_blank"
        >
          <linkDefinition.icon className="w-6 h-6" />
          <span className="sr-only">{linkDefinition.label}</span>
        </Link>
      ))}
    </div>
  );
}

export async function PilotIdCard(props: {
  pilot: PartialPilot;
  editMode: boolean;
}) {
  const { pilot, editMode } = props;

  const fallbackBannerHref = "/placeholder.svg";
  const fallbackAvatarHref = usePilotAvatarPlaceholder(pilot.id ?? 0);

  const pilotNameShorthand = useMemo(() => {
    return pilot.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }, [pilot.name]);

  return (
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
            <AvatarImage
              src={pilot.logoHref ?? fallbackAvatarHref}
              className="bg-gray-200"
            />
            <AvatarFallback>{pilotNameShorthand}</AvatarFallback>
          </Avatar>

          <div className="absolute top-4 right-4 space-x-2">
            <PilotShareButton shareHandle={pilot.share_handle ?? ""} />

            {/* buttin with pencil icon to edit profile */}
            {editMode && (
              <PilotIdEditSheet
                pilot={pilot}
                trigger={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 border-2 border-white dark:border-gray-900"
                  >
                    <PencilIcon className="w-6 h-6" />
                    <span className="sr-only">Edit</span>
                  </Button>
                }
                reloadOnSave
              />
            )}
          </div>
        </div>

        <CardContent className="p-4 sm:p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              {pilot.name && (
                <h1 className="text-2xl font-bold">{pilot.name}</h1>
              )}
              {pilot.nickname && (
                <p className="text-gray-500 dark:text-gray-400">
                  @{pilot.nickname}
                </p>
              )}
            </div>

            <SocialMediaLinks pilot={pilot} />
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-1 sm:grid-cols-1 md-grid-cols-2 lg:grid-cols-9 gap-6">
            <Card className="col-span-1 lg:col-span-4">
              <CardContent className="p-4">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold">Contact Information</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Get in touch with me.
                    <br />
                    <small>&nbsp;</small>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start justify-between space-y-4 sm:space-y-0">
                  <div className="space-y-2">
                    {pilot.contact_phone && (
                      <div className="flex items-center space-x-4">
                        <PhoneIcon className="w-5 h-5" />
                        <span>{pilot.contact_phone}</span>
                      </div>
                    )}
                    {pilot.contact_email && (
                      <div className="flex items-center space-x-4">
                        <MailIcon className="w-5 h-5" />
                        <span>{pilot.contact_email}</span>
                      </div>
                    )}
                    {pilot.contact_website && (
                      <div className="flex items-center space-x-4">
                        <GlobeIcon className="w-5 h-5" />
                        <span>{pilot.contact_website}</span>
                      </div>
                    )}
                  </div>

                  <div className="rounded-lg overflow-hidden self-center sm:self-auto">
                    <PilotShareQRCode
                      shareHandle={pilot.share_handle ?? ""}
                      width={200}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <PilotIdDocumentsCard />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
