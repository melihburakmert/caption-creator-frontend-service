import { useEffect, useMemo, useState } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { SpotifyLoginButton } from '@/components/SpotifyLoginButton';
import { QueryFactory } from '@/utils/query/QueryFactory';

export const MainView = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const sessionId = useMemo(() => {
    const storedSessionId = localStorage.getItem('session_id');
    if (storedSessionId) return storedSessionId;

    const newSessionId = uuidv4();
    localStorage.setItem('session_id', newSessionId);
    return newSessionId;
  }, []);

  const [recentlyPlayedFetched, setRecentlyPlayedFetched] = useState(
    () => localStorage.getItem('recently_played_fetched') === 'true',
  );

  const spotifyToken = localStorage.getItem('spotify_token');

  const { status: recentlyPlayedStatus, error: recentlyPlayedError } = useQuery({
    ...QueryFactory.getRecentlyPlayed(sessionId),
    enabled: !!spotifyToken && !recentlyPlayedFetched,
    retry: false,
  });

  useEffect(() => {
    if (!recentlyPlayedError) return;

    if (recentlyPlayedError.message.includes('401')) {
      console.warn('Token expired. Removing and refetching...');
      localStorage.removeItem('spotify_token');
      queryClient.invalidateQueries({ queryKey: ['getRecentlyPlayed', sessionId] });
      navigate('/');
    } else if (recentlyPlayedError.message.includes('409')) {
      console.warn('Recently played songs are already fetched.');
      setRecentlyPlayedFetched(true);
    }
  }, [recentlyPlayedError]);

  useEffect(() => {
    if (recentlyPlayedStatus === 'success') {
      setRecentlyPlayedFetched(true);
    }
  }, [recentlyPlayedStatus]);

  useEffect(() => {
    localStorage.setItem('recently_played_fetched', recentlyPlayedFetched.toString());
  }, [recentlyPlayedFetched]);

  return (
    <div>
      <h1>Main View</h1>
      {!spotifyToken && <SpotifyLoginButton sessionId={sessionId} />}
      {spotifyToken && !recentlyPlayedFetched && recentlyPlayedStatus === 'pending' && (
        <p>Fetching recently played songs...</p>
      )}
      {recentlyPlayedFetched && recentlyPlayedStatus !== 'success' && <p>Recently played songs are already fetched.</p>}
      {recentlyPlayedFetched && recentlyPlayedStatus === 'success' && (
        <p>Recently played songs are successfully loaded!</p>
      )}
      {recentlyPlayedStatus === 'error' && <p>Error fetching recently played songs: {recentlyPlayedError?.message}</p>}
    </div>
  );
};
