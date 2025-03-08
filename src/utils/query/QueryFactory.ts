import { QueryKey } from '@tanstack/react-query';

import { axiosClient } from './AxiosClient';

export const QueryFactory = {
  getSpotifyToken: (sessionId: string, code: string) => ({
    queryKey: ['getSpotifyToken', sessionId, code] as QueryKey,
    queryFn: () =>
      axiosClient
        .get<{ access_token: string }>(`playback/auth/token`, {
          params: { code },
          headers: {
            'X-Session-Id': sessionId,
            'Content-type': 'application/json',
          },
        })
        .then(res => res.data.access_token),
  }),

  getRecentlyPlayed: (sessionId: string) => ({
    queryKey: ['getRecentlyPlayed', sessionId] as QueryKey,
    queryFn: () => {
      const spotifyToken = localStorage.getItem('spotify_token');
      return axiosClient
        .get<VoidFunction>(`playback/recently-played`, {
          headers: {
            'X-Session-Id': sessionId,
            'Content-type': 'application/json',
            ...(spotifyToken && { Authorization: `Bearer ${spotifyToken}` }),
          },
        })
        .then(res => null);
    },
  }),

  getCaption: (sessionId: string) => ({
    queryKey: ['getCaption', sessionId] as QueryKey,
    queryFn: () =>
      axiosClient
        .get<string>(`genai/caption`, {
          headers: {
            'X-Session-Id': sessionId,
            'Content-type': 'application/json',
          },
        })
        .then(res => res.data),
  }),

  postImageDescription: (sessionId: string, image: FormData) => ({
    queryKey: ['postImageDescription', sessionId] as QueryKey,
    queryFn: () =>
      axiosClient
        .post<void>(`genai/image-description`, image, {
          headers: {
            'X-Session-Id': sessionId,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => null),
  }),
};
