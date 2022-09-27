import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { MdPublic } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";

import Layout from "../layout";

import Shared from "../components/Shared";
import Yours from "../components/Yours";

export default function Home() {
  const router = useRouter();
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const { tab } = router.query;
    if (!router.isReady) return;
    if (!tab) return;
    setTab(Number.parseInt(tab));
  }, [router]);

  return (
    <>
      <Head>
        <title>Polka Quiz</title>
        <link rel="icon" href="/PolkaQuiz.ico" />
        <meta
          name="description"
          content="A very simple quiz app site for students"
        />
        <meta
          name="description"
          content="A very simple quiz app site for students"
        />

        <meta itemProp="name" content="Polka Quiz" />
        <meta
          itemProp="description"
          content="A very simple quiz app site for students"
        />
        <meta itemProp="image" content="/metacover.png" />
        <meta
          name="google-site-verification"
          content="BMsOphT0waH2PjmDohyreInesLvtdqjT7l2NKibBZfA"
        />

        <meta property="og:url" content="https://polka-quiz.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Polka Quiz" />
        <meta
          property="og:description"
          content="A very simple quiz app site for students"
        />
        <meta property="og:image" content="/metacover.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Polka Quiz" />
        <meta
          name="twitter:description"
          content="A very simple quiz app site for students"
        />
        <meta name="twitter:image" content="/metacover.png" />
      </Head>

      <main className="m-5 font-andika text-2xl mt-20 sm:mt-24 flex gap-2 relative min-h-screen">
        <div className="sticky hidden md:block w-1/12 md:w-2/12"></div>
        <div className="fixed h-screen  hidden md:block w-1/12 md:w-2/12">
          <div onClick={()=> router.push('/?tab=0')} className={`flex duration-150 ease-out text-sm md:gap-2 items-center py-4 md:p-4 hover:bg-base-200 cursor-pointer ${tab === 0? 'bg-base-200' : ''}`}>
            <MdPublic className="text-accent " />
            <p className="hidden md:block">Shared</p>
          </div>
          <div onClick={()=> router.push('/?tab=1')} className={`flex duration-150 ease-out text-sm md:gap-2 rounded-sm items-center py-4 md:p-4 hover:bg-base-200 cursor-pointer ${tab === 1? 'bg-base-200' : ''}`}>
            <FaPenNib className="text-accent" />
            <p className="hidden md:block">Yours </p>
          </div>
        </div>
        {tab === 0 && <Shared />}
        {tab === 1 && <Yours />}
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
