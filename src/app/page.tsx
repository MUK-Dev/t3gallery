import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://utfs.io/f/fe5906ea-2cdf-4f90-b45e-ce0595925bd9-17ncro.png",
  "https://utfs.io/f/592a0759-9e70-4297-b38a-ede200cc81f8-da1q3a.png",
  "https://utfs.io/f/4b798a0e-d034-42c5-8579-dce51187ac8c-tpk6wk.com_wallpaper.jpg",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log(posts);

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {mockImages.map((img) => (
          <div key={img.id} className="w-48">
            <img src={img.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
