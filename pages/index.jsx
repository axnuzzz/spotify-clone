import Dashboard from "../components/Dashboard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import Head from "next/head";

const Home = () => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });

  if (status === "loading") {
    return <Loader />;
  }

  console.log(session);
  return (
    <div className="h-screen overflow-hidden">
      <Head>
        <title>Spotify - Clone</title>
        <link rel="icon" href="/SpotifyLogo.png" />
      </Head>
      <main>
        <Dashboard />
        {/* Main screen */}
      </main>
      <div>{/* Bottom Player */}</div>
    </div>
  );
};

export default Home;
