import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);

  const uploaderInfo = await clerkClient.users.getUser(image.userId);
  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink items-center justify-center">
        <img src={image.url} alt={image.url} className="object-contain" />
      </div>

      <div className="flex w-64 flex-shrink-0 flex-col gap-2 px-2">
        <div className="break-words border-b p-2 text-center text-lg">
          {image.name}
        </div>

        <div className="flex flex-col">
          <span>Uploaded By</span>
          <span>{uploaderInfo.fullName}</span>
        </div>

        <div className="flex flex-col">
          <span>Created On</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
