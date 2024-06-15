import { Pilot as PilotDB } from "@/types/supabase-custom";
import {
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
  GlobeIcon,
  MailIcon,
  PhoneIcon,
  UploadIcon,
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

export type PartialPilot = Partial<PilotDB>;

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

export function PilotIdCard({ pilot }: { pilot: PartialPilot }) {
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
            <AvatarImage src={pilot.logoHref ?? fallbackAvatarHref} className="bg-gray-200" />
            <AvatarFallback>{pilotNameShorthand}</AvatarFallback>
          </Avatar>

          <div className="absolute top-4 right-4 space-x-2">
            <PilotShareButton shareHandle={pilot.share_handle ?? ""} />

            {/* buttin with pencil icon to edit profile */}
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
            />
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

              ID: {pilot.id}
            </div>

            <SocialMediaLinks pilot={pilot} />
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-1 sm:grid-cols-1 md-grid-cols-2 lg:grid-cols-9 gap-6">
            <Card className="col-span-1 lg:col-span-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
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

                  <div className="rounded-lg overflow-hidden">
                    <PilotShareQRCode
                      shareHandle={pilot.share_handle ?? ""}
                      width={100}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1 lg:col-span-5">
              <CardContent className="p-4 space-y-6">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">Documents</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Legal, Insurance and other Documents.
                    <br />
                    <small>(These are only visible to yourself)</small>
                  </p>

                  <div className="flex items-center space-x-4 pt-4">
                    <Button variant="outline">
                      <UploadIcon className="w-5 h-5 mr-2" />
                      Upload Document
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
