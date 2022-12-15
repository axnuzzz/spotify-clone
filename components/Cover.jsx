import { PlayIcon, PauseIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackState, playState } from "../Atom/playerAtom";

function Cover({ track, chooseTrack }) {
  const [play, setPlay] = useRecoilState(playState);
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);

  const handlePlay = () => {
    chooseTrack(track);

    if (track.uri === currentTrack.uri) {
      setPlay(!play);
    }
  };

  return (
    <div className="h-[300px] w-[300px] text-grey-300 shadow-xl rounded-[50px] relative hover:scale-95 ease-out duration-200 hover:text-white group space-y-4 scrollbar-hide">
      <img
        src={track.coverUrl}
        alt="/"
        className="h-full w-full absolute object-cover rounded-[50px] opacity-90  group-hover:opacity-100"
        onClick={handlePlay}
      ></img>
      <div className="flex-shrink-0">
        <div className="bg-gradient-to-b">
          {track.uri === currentTrack.uri && play ? (
            <PauseIcon className="absolute bottom-5 left-5 h-13 w-13 text-white group-hover:text-purple-500" />
          ) : (
            <PlayIcon className="absolute bottom-5 left-5 h-[64px] w-[64px] ml-[1px] text-white bg-blend-color-burn rounded-full group-hover:text-purple-600" />
          )}
        </div>
      </div>
    </div>
  );
}
export default Cover;
