import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://utfs.io/f/fe5906ea-2cdf-4f90-b45e-ce0595925bd9-17ncro.png",
  "https://utfs.io/f/592a0759-9e70-4297-b38a-ede200cc81f8-da1q3a.png",
  "https://utfs.io/f/4b798a0e-d034-42c5-8579-dce51187ac8c-tpk6wk.com_wallpaper.jpg",
];

// const mockImages = mockUrls.map((url, index) => ({
//   id: index + 1,
//   url,
// }));

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {[...images, ...images, ...images, ...images].map((img) => (
        <div key={img.id} className="flex w-48 flex-col">
          <Link href={`/img/${img.id}`}>
            <Image
              src={img.url}
              alt={img.url}
              style={{ objectFit: "contain" }}
              width={192}
              height={192}
            />
          </Link>
          <div className="truncate">{img.name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">Please sign in</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
