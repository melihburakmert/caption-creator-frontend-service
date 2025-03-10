import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { ParentBox, SpotifyLoginButton } from '@/components/.';
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

  // Recently played songs
  const spotifyToken = localStorage.getItem('spotify_token');

  const [recentlyPlayedFetched, setRecentlyPlayedFetched] = useState(
    () => localStorage.getItem('recently_played_fetched') === 'true',
  );

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

  // Image
  const [image, setImage] = useState<string | null>(() => {
    return localStorage.getItem('uploadedImage');
  });

  const { mutate: getImageDescription } = useMutation({
    mutationFn: (form: FormData) => QueryFactory.getImageDescription(sessionId).mutationFn(form),
    onSuccess: () => {},
    onError: error => {
      console.error('Error uploading the image: ', error);
    },
  });

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setImage(base64Image);
        localStorage.setItem('uploadedImage', base64Image);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('image', file);

      getImageDescription(formData);
    }
  };

  useEffect(() => {
    const storedImage = localStorage.getItem('uploadedImage');
    if (storedImage) {
      setImage(storedImage);
    }
  }, []);

  // Caption
  const [caption, setCaption] = useState<string>('');

  return (
    <div>
      <ParentBox image={image} caption={caption} handleImageUpload={handleImageUpload} />
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
