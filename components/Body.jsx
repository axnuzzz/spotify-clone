import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Search from "./Search";
import Cover from "./Cover";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Track from "./Track";
import LikedSongs from "./LikedSongs";
import Dropdown from "./Dropdown";
import Artists from "./Artists";

function Body({ spotifyApi, chooseTrack }) {
  const [search, setSearch] = useState("");
  const { data: session } = useSession();
  const { accessToken } = session;
  const [searchResults, setSearchResults] = useState([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [mySavedTracks, setMySavedTracks] = useState([]);
  const [followedArtists, setFollowedArtists] = useState([]);

  var slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 700;
  };
  var slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 700;
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  /* Searching for music */
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    spotifyApi.searchTracks(search).then((res) => {
      setSearchResults(
        res.body.tracks.items.map((track) => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            uri: track.uri,
            coverUrl: track.album.images[0].url,
            popularity: track.popularity,
          };
        })
      );
    });
  }, [search, accessToken]);
  console.log(searchResults);

  /* Default templates when no search is provided */
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getFeaturedPlaylists().then((res) => {
      setFeaturedPlaylists(
        res.body.playlists.items.map((track) => {
          return {
            id: track.id,
            title: track.name,
            uri: track.uri,
            description: track.description,
            coverUrl: track.images[0].url,
          };
        })
      );
    });
  }, [accessToken]);

  console.log(featuredPlaylists);

  /* New releases */

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getNewReleases().then((res) => {
      setNewReleases(
        res.body.albums.items.map((track) => {
          return {
            id: track.id,
            title: track.name,
            uri: track.uri,
            artist: track.artists[0].name,
            coverUrl: track.images[0].url,
            popularity: track.popularity,
          };
        })
      );
    });
  }, [accessToken]);

  console.log(newReleases);

  /* Saved tracks */
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getMySavedTracks().then((res) => {
      setMySavedTracks(
        res.body.items.map((index) => {
          return {
            id: index.track.id,
            title: index.track.name,
            artist: index.track.artists[0].name,
            uri: index.track.uri,
            coverUrl: index.track.album.images[0].url,
          };
        })
      );
    });
  }, [accessToken]);

  console.log(mySavedTracks);

  /* Followed Artists */

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getFollowedArtists().then((res) => {
      setFollowedArtists(
        res.body.artists.items.map((track) => {
          return {
            id: track.id,
            title: track.name,
            uri: track.uri,
            coverUrl: track.images[0].url,
          };
        })
      );
    });
  }, [accessToken]);

  console.log(followedArtists);

  return (
    <div className="ml-[110px] py-4 bg-gray">
      <div className="flex justify-between">
        <Search search={search} setSearch={setSearch} />
        <Dropdown className="p-4" />
      </div>
      <h1 className="text-white tracking-widest items-center mt-4 text-xl ml-2">
        Popular Playlists
      </h1>
      <div className="relative items-center cursor-pointer">
        <MdChevronLeft
          onClick={slideLeft}
          size={40}
          className="absolute z-40 left-2 top-[160px] bg-transparent text-purple-600"
        />
        <MdChevronRight
          onClick={slideRight}
          size={40}
          className="absolute z-40 right-7 top-[160px] bg-transparent text-purple-600"
        />
      </div>
      <div
        id="slider"
        className="grid grid-flow-col py-4 gap-6 overflow-x-hidden scrollbar-hide whitespace-nowrap scroll-smooth"
      >
        {searchResults.length === 0
          ? featuredPlaylists
              .slice(0, 10)
              .map((track) => (
                <Cover track={track} key={track.id} chooseTrack={chooseTrack} />
              ))
          : searchResults
              .slice(0, 10)
              .map((track) => (
                <Cover track={track} key={track.id} chooseTrack={chooseTrack} />
              ))}
      </div>
      {/* Bottom part of the body */}
      <div className="min-w-full flex ml-2 space-x-6 absolute md:relative">
        {/* Liked songs part */}
        <div className="md:block xl:block max-w-[450px]">
          <h2 className="text-white text-xl  tracking-widest py-2">
            Saved Tracks
          </h2>
          <div className="grid grid-cols-2 object-cover border-gray-900 rounded-md ease-in-out duration-300 bg-[#0D0D0D] overflow-y-scroll h-[370px] no-scrollbar w-[250px] ">
            {mySavedTracks.slice(0, 10).map((index) => (
              <LikedSongs
                chooseTrack={chooseTrack}
                index={index}
                key={index.id}
              />
            ))}
          </div>
        </div>
        {/* New releases/ Searched Tracks */}
        <div className="hidden lg:inline xl:inline max-w-[650px]">
          <h2 className="text-white text-xl tracking-widest py-2">
            {searchResults.length === 0 ? "New releases" : "Search Results "}
          </h2>
          <div className="space-y-3  rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll h-[370px] no-scrollbar  w-[650px]">
            {searchResults.length === 0
              ? newReleases
                  .slice(0, newReleases.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                    />
                  ))
              : searchResults
                  .slice(4, searchResults.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                    />
                  ))}
          </div>
        </div>

        {/* Followed artists */}
        <div className=" rounded-2xl ease-in-out duration-300 h-[1000px] md:h-96 w-[450px]  px-4 ">
          <h1 className=" bg-black text-xl py-2 tracking-widest text-white">
            Artists you follow
          </h1>
          <div className="grid grid-cols-2 gap-3 object-cover overflow-y-scroll no-scrollbar h-[370px] w-[500px] bg-[#0D0D0D] p-4 rounded-xl">
            {followedArtists.slice(0, 40).map((track) => (
              <Artists track={track} key={track.id} chooseTrack={chooseTrack} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Body;
