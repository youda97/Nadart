export type InstagramPost = {
  id: string;
  caption: string;
  mediaType: string;
  imageUrl: string;
  permalink: string;
  timestamp: string;
};

export async function getLatestInstagramPosts(): Promise<InstagramPost[]> {
  const response = await fetch('/api/instagram-latest');

  if (!response.ok) {
    throw new Error('Failed to load Instagram posts');
  }

  const json = await response.json();
  return json.posts;
}