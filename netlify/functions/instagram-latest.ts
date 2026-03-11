import type { Handler } from '@netlify/functions';
import { fetchLatestInstagramPosts } from './_lib/instagram';
import { json, noContent } from './_lib/cors';

export const handler: Handler = async (event: { httpMethod: string; }) => {
  if (event.httpMethod === 'OPTIONS') {
    return noContent();
  }

  try {
    const posts = await fetchLatestInstagramPosts(3);
    return json(200, { posts });
  } catch (error) {
    return json(500, {
      error: error instanceof Error ? error.message : 'Unknown Instagram error',
    });
  }
};