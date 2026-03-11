const GRAPH_BASE = 'https://graph.instagram.com';

type InstagramMedia = {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

type MediaResponse = {
  data: InstagramMedia[];
};

export async function fetchLatestInstagramPosts(limit = 3) {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    throw new Error('Missing INSTAGRAM_ACCESS_TOKEN');
  }

  const params = new URLSearchParams({
    fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp',
    access_token: token,
  });

  const response = await fetch(`${GRAPH_BASE}/me/media?${params.toString()}`);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Instagram API error: ${response.status} ${text}`);
  }

  const json = (await response.json()) as MediaResponse;

  return json.data
    .filter((item) => item.media_url || item.thumbnail_url)
    .slice(0, limit)
    .map((item) => ({
      id: item.id,
      caption: item.caption ?? '',
      mediaType: item.media_type,
      imageUrl: item.media_type === 'VIDEO' ? item.thumbnail_url ?? '' : item.media_url ?? item.thumbnail_url ?? '',
      permalink: item.permalink,
      timestamp: item.timestamp,
    }));
}

export async function refreshInstagramToken() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    throw new Error('Missing INSTAGRAM_ACCESS_TOKEN');
  }

  const params = new URLSearchParams({
    grant_type: 'ig_refresh_token',
    access_token: token,
  });

  const response = await fetch(`${GRAPH_BASE}/refresh_access_token?${params.toString()}`);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Instagram refresh error: ${response.status} ${text}`);
  }

  return response.json();
}