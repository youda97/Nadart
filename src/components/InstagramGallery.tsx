import { useEffect, useRef, useState } from "react";
import { Instagram } from "lucide-react";
import { getLatestInstagramPosts, type InstagramPost } from "../api/instagram";

function InstagramCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow-md">
      <div className="aspect-square w-full animate-pulse bg-stone-300/80" />

      {/* fake overlay content */}
      <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/55 via-black/10 to-transparent">
        <div className="w-full p-4">
          <div className="space-y-2">
            <div className="h-3 w-[85%] rounded bg-white/45" />
            <div className="h-3 w-[70%] rounded bg-white/35" />
          </div>
        </div>
      </div>

      {/* fake instagram icon */}
      <div className="absolute right-3 top-3 rounded-full bg-black/40 p-2">
        <div className="h-4 w-4 rounded-full bg-white/70" />
      </div>
    </div>
  );
}

function InstagramGallerySkeleton() {
  return (
    <>
      <div>
        <div className="mb-6 flex items-center gap-4">
          <span className="h-[3px] w-10 bg-[#b99a64]" />
          <div className="h-8 w-56 animate-pulse rounded bg-stone-300/80 md:h-10" />
        </div>

        <div className="space-y-3">
          <div className="h-8 w-28 animate-pulse rounded bg-stone-300/80" />
          <div className="h-6 w-32 animate-pulse rounded bg-stone-200/90" />
          <div className="max-w-sm space-y-3 pt-1">
            <div className="h-5 w-full animate-pulse rounded bg-stone-200/90" />
            <div className="h-5 w-[92%] animate-pulse rounded bg-stone-200/90" />
            <div className="h-5 w-[78%] animate-pulse rounded bg-stone-200/90" />
          </div>
        </div>

        <div className="mt-4 inline-flex items-center gap-3 bg-[#c9a56a] px-5 py-2 text-lg font-medium text-white">
          <Instagram className="h-5 w-5 opacity-70" />
          <div className="h-6 w-24 animate-pulse rounded bg-white/35" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <InstagramCardSkeleton />
        <InstagramCardSkeleton />
        <InstagramCardSkeleton />
      </div>
    </>
  );
}

export default function InstagramGallery() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || hasLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [hasLoaded]);

  useEffect(() => {
    if (!shouldLoad || hasLoaded) return;

    let cancelled = false;

    async function loadPosts() {
      try {
        setLoading(true);
        const data = await getLatestInstagramPosts();

        if (!cancelled) {
          setPosts(data);
          setHasLoaded(true);
        }
      } catch (error) {
        console.error("Failed to load Instagram posts:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadPosts();

    return () => {
      cancelled = true;
    };
  }, [shouldLoad, hasLoaded]);

  const showSkeleton = loading && posts.length === 0;

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[url('/textures/content-bg.webp')] bg-cover bg-center bg-fixed opacity-90" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[320px_1fr] lg:px-8">
        {showSkeleton ? (
          <InstagramGallerySkeleton />
        ) : (
          <>
            <div>
              <div className="mb-6 flex items-center gap-4">
                <span className="h-[3px] w-10 bg-[#b99a64]" />
                <h2 className="text-xl font-bold tracking-tight text-stone-900 md:text-3xl">
                  Instagram Gallery
                </h2>
              </div>

              <div className="space-y-1">
                <p className="text-xl font-bold text-stone-900">Nadart</p>
                <p className="text-md italic text-[#b99a64]">@nadart_815</p>
                <p className="max-w-sm text-md leading-8 text-stone-700">
                  Follow Nada’s Instagram for new paintings, work-in-progress
                  posts, and featured Islamic canvas pieces.
                </p>
              </div>

              <a
                href="https://www.instagram.com/nadart_815/"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-3 bg-[#c9a56a] px-5 py-2 text-lg font-medium text-white transition hover:bg-[#b89255]"
              >
                <Instagram className="h-5 w-5" />
                Follow us
              </a>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-xl"
                >
                  <img
                    src={post.imageUrl}
                    alt={post.caption || "Instagram post"}
                    loading="lazy"
                    className="aspect-square h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  {/* overlay */}
                  <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100 transition duration-300 md:opacity-0 md:group-hover:opacity-100">
                    <div className="p-4 text-white">
                      <p className="line-clamp-3 text-sm">{post.caption}</p>
                    </div>
                  </div>

                  {/* instagram icon */}
                  <div className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.25-2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
