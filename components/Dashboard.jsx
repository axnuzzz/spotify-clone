import SideBar from "./Sidebar";
import Body from "./Body.jsx";
import SpotifyWebApi from "spotify-web-api-node";
import { useRecoilState } from "recoil";
import { currentTrackState } from "../Atom/playerAtom";
import Player from "./Player";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

function Dashboard() {
  const { data: session } = useSession();
  const { accessToken } = session;

  const [showPlayer, setShowPlayer] = useState(false);
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);

  useEffect(() => {
    setShowPlayer(true);
  }, []);

  const chooseTrack = (track) => {
    setCurrentTrack(track);
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <div className="min-h-screen bg-black pb-24">
      <SideBar />
      <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <Player accessToken={accessToken} trackUri={currentTrack.uri} />
      </div>
    </div>
  );
}
export default Dashboard;
