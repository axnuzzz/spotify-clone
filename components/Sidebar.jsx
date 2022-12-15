import { ChartBarIcon, HeartIcon, HomeIcon } from "@heroicons/react/solid";
import { RiCompassFill } from "react-icons/ri";
import { FaMicrophoneAlt } from "react-icons/fa";
import Image from "next/image";

function Sidebar() {
  return (
    <section className="top-0 h-screen fixed flex flex-col items-center p-4 space-y-16 z-40 w-[90px] bg-black">
      <Image
        src="/SpotifyLogo.png"
        width={48}
        height={48}
        objectFit="contain"
      />
      <div className="flex flex-col items-center space-y-16">
        <HomeIcon className="sidebarIcon text-gray-600" />
        <RiCompassFill className="sidebarIcon text-gray-600" />
        <FaMicrophoneAlt className="sidebarIcon text-gray-600" />
        <ChartBarIcon className="sidebarIcon text-gray-600" />
        <HeartIcon className="sidebarIcon text-gray-600" />
      </div>
    </section>
  );
}
export default Sidebar;
