import { ImHeadphones } from "react-icons/im";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackState, playState } from "../Atom/playerAtom";

function Track({ track, chooseTrack }) {
  const [hasLiked, setHasLiked] = useState(false);
  const [play, setPlay] = useRecoilState(playState);
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);

  const handlePlay = () => {
    chooseTrack(track);

    if (track.uri === currentTrack.uri) {
      setPlay(!play);
    }
  };

  const handleLike = () => {
    setHasLiked(!hasLiked);
  };

  return (
    <div className="flex justify-between space-x-8 cursor-default hover:bg-gray-600/20 p-2 rounded-lg group transition ease-out">
      <div className="flex items-center">
        <img
          src={track.coverUrl}
          alt=""
          className="rounded-xl h-12 w-12 object-cover mr-3"
        />
        <div>
          <h4 className="text-white text-sm font-semibold truncate-15 w-[450px] tracking-wide">
            {track.title}
          </h4>
          <p className="text-gray-500 text-[13px] font-semibold group-hover:text-white tracking-wide">
            {track.artist}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-1 m-auto ">
        <div className="text-white text-sm flex gap-2">
          <ImHeadphones size={18} />
          <h5 className="tracking-wide ">{track.popularity}</h5>
        </div>
        <div className="flex items-center border-2 border-gray-600/30 group-hover:border-white rounded-full w-[80px] h-9 ">
          <AiFillHeart
            className={`text-xl ml-3 icon ${
              hasLiked ? "text-purple-600" : "text-[#868686]"
            }`}
            onClick={handleLike}
          />
          {track.uri === currentTrack.uri && play ? (
            <>
              <div
                className="h-8 w-8 rounded-full border-purple-600 flex items-center justify-center bg-purple-600 icon hover:scale-110 ml-4 "
                onClick={handlePlay}
              >
                <BsFillPauseFill className="text-white shadow-xl text-xl" />
              </div>
            </>
          ) : (
            <>
              <div
                className="h-8 w-8 rounded-full  flex items-center justify-center hover:bg-purple-600 hover:border-purple-600 icon hover:scale-110 ml-4"
                onClick={handlePlay}
              >
                <BsFillPlayFill className="text-white shadow-xl text-xl ml-[1px]" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Track;
