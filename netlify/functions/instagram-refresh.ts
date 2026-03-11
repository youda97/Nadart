import type { Config, Handler } from '@netlify/functions';
import { refreshInstagramToken } from './_lib/instagram';
import { json } from './_lib/cors';

export const handler: Handler = async () => {
  try {
    const result = await refreshInstagramToken();

    return json(200, {
      message: 'Token refresh call succeeded. Copy the returned token into Netlify env vars if Meta returned a new token.',
      result,
    });
  } catch (error) {
    return json(500, {
      error: error instanceof Error ? error.message : 'Unknown refresh error',
    });
  }
};

export const config: Config = {
  schedule: '0 0 1 * *',
};