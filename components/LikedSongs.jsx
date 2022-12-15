import { PlayIcon, PauseIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackState, playState } from "../Atom/playerAtom";

function LikedSongs({ index, chooseTrack }) {
  const [play, setPlay] = useRecoilState(playState);
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);

  const handlePlay = () => {
    chooseTrack(index);

    if (index.uri === currentTrack.uri) {
      setPlay(!play);
    }
  };

  return (
    <div className="cursor-default relative rounded-md group transition ease-out duration-200 p-3">
      <div className="flex-shrink-0 cursor-pointer" onClick={handlePlay}>
        <img
          src={index.coverUrl}
          alt="/"
          className="h-45 w-45 object-cover rounded-md hover:scale-105 ease-out duration-300"
        ></img>
        {index.uri === currentTrack.uri && play ? (
          <PauseIcon className="absolute bottom-4 left-3 h-10 w-10 text-white group-hover:text-purple-500" />
        ) : (
          <PlayIcon className="absolute bottom-4 left-3 h-10 w-10 ml-[1px] text-white group-hover:text-purple-500" />
        )}
      </div>
    </div>
  );
}
export default LikedSongs;
