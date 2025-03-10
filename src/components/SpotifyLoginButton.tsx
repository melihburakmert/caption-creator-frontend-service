const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const SPOTIFY_AUTH_ENDPOINT = import.meta.env.VITE_SPOTIFY_AUTH_ENDPOINT;

const scopes = ['user-read-private', 'user-read-email', 'user-read-recently-played'].join(' ');

const SpotifyLoginButton = ({ sessionId }: { sessionId: string }) => {
  const getAuthUrl = () => {
    return (
      `${SPOTIFY_AUTH_ENDPOINT}` +
      `?client_id=${SPOTIFY_CLIENT_ID}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}` +
      `&scope=${encodeURIComponent(scopes)}` +
      `&state=${sessionId}`
    );
  };

  return (
    <div>
      <a href={getAuthUrl()}>Login with Spotify</a>
    </div>
  );
};

export default SpotifyLoginButton;
