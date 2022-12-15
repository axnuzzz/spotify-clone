import Image from "next/image";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Loader } from "../../components/Loader";

function signin({ providers }) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <div className="w-full h-screen space-y-4 pt-40">
      <div className="flex flex-row items-center justify-center gap-3">
        <div className="text-transparent bg-clip-text text-4xl bg-gradient-to-r from-pink-600 to-purple-400">
          Spotify
        </div>
        <p className="text-transparent bg-clip-text text-4xl bg-gradient-to-r from-purple-400 to-pink-600">
          Clone
        </p>
        <Image
          src="/SpotifyLogo.png"
          objectFit="contain"
          width={70}
          height={70}
          alt="/"
        />
      </div>
      {Object.values(providers).map((provider) => (
        <div key={provider.id} className="flex justify-center py-4 px-8">
          <button
            className="text-white rounded-full bg-gradient-to-r from-purple-600 to-pink-400 py-4 px-8"
            onClick={() => signIn(provider.id)}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}
export default signin;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
