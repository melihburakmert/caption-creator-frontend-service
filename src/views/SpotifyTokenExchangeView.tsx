import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { QueryFactory } from '@/utils/query/QueryFactory';

export const SpotifyTokenExchangeView = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const [stateError, setStateError] = useState<boolean>(false);

  const sessionId = localStorage.getItem('session_id');

  const {
    data: fetchedToken,
    status: tokenStatus,
    error: tokenError,
  } = useQuery({
    queryKey: ['getSpotifyToken', sessionId, code],
    queryFn: () => QueryFactory.getSpotifyToken(sessionId!!, code!!).queryFn(),
    enabled: !!code && !!state && !stateError,
  });

  useEffect(() => {
    if (fetchedToken) {
      localStorage.setItem('spotify_token', fetchedToken);
      navigate('/');
    }
  }, [fetchedToken]);

  useEffect(() => {
    if (state && state !== sessionId) {
      setStateError(true);
    }
  }, [state, sessionId]);

  if (stateError) return <p>Invalid state detected. Authentication failed.</p>;
  if (tokenStatus === 'pending') return <p>Loading...</p>;
  if (tokenStatus === 'error') return <p>Error fetching token: {tokenError.message}</p>;
};
