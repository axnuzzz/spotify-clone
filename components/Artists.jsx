import { PlayIcon, PauseIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackState, playState } from "../Atom/playerAtom";

function Artists({ track, chooseTrack }) {
  const [play, setPlay] = useRecoilState(playState);
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);

  const handlePlay = () => {
    chooseTrack(track);

    if (track.uri === currentTrack.uri) {
      setPlay(!play);
    }
  };
  return (
    <div
      className="flex justify-start items-center flex-shrink-0 cursor-pointer text-white tracking-wide hover:bg-gray-600/20 ease-in-out duration-200 rounded-full"
      onClick={handlePlay}
    >
      <img
        src={track.coverUrl}
        alt="/"
        className="h-20 w-20 object-cover rounded-[40px] hover:scale-105 ease-out duration-300"
      ></img>
      <h1 className="pl-4">{track.title}</h1>
    </div>
  );
}
export default Artists;
