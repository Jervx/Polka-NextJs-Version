import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";


import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { RiCheckboxMultipleFill } from "react-icons/ri";
import { BiGridVertical } from "react-icons/bi";
import { MdPublic } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";

import Layout from "../layout";
import Loading from "../components/loading";
import { dateToBeutify } from "../helpers";

export default function Home() {
  const router = useRouter();
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(false);


  const loadQuizes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/quiz", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mode: 3 }),
      });

      if (!response.ok)
        throw new Error("Can't Retrieve Quizes", { cause: response });

      const data = await response.json();

      setQuizes(data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadQuizes();
  }, []);

  return (
    <>
      <Head>
        <title>Polka Quiz</title>
        <meta name="description" content="A very simple quiz app site for students" />
        <link rel="icon" href="/PolkaQuiz.ico" />
        <meta
          name="google-site-verification"
          content="BMsOphT0waH2PjmDohyreInesLvtdqjT7l2NKibBZfA"
        />
      </Head>

      <main
        onClick={() => {}}
        className="m-5 font-andika text-2xl mt-20 sm:mt-24 flex gap-2 relative min-h-screen"
      >
        <div className="fixed h-screen  hidden md:block w-1/12 md:w-2/12">
          <div className="flex text-sm md:gap-2 items-center py-4 md:p-4 bg-base-200 hover:bg-base-200 cursor-pointer">
            <MdPublic className="text-accent " />
            <p className="hidden md:block">Shared</p>
          </div>
          <div className="flex text-sm md:gap-2 rounded-sm items-center py-4 md:p-4 hover:bg-base-200 cursor-pointer">
            <FaPenNib className="text-accent" />
            <p className="hidden md:block">Created By You </p>
            <span className="badge">soon..</span>
          </div>
        </div>
        <div className="sticky hidden md:block w-1/12 md:w-2/12"></div>

        <div className=" w-full md:w-7/12">
          <div className="flex w-full justify-center">
            <Loading loading={loading} />
          </div>
          <div className="flex justify-center mt-4">
            <BsFillJournalBookmarkFill className="text-2xl text-accent" />
          </div>
          <p className="text-center mt-2 text-sm font-bold">Reviewers</p>
          <p className="text-center justify-center text-sm opacity-75 mt-2">
            These are reviewers/questions that are created & shared <br /> by
            different students to practice for their exam.
          </p>

          <div className="mt-8">
            {!loading &&
              quizes.map((q, idx) => (
                <div key={idx} className="p-0 md:p-2 mx-1 mt-8 md:mx-4">
                  <div
                    onClick={() => router.push(`/quiz?_qid=${q._id}`)}
                    className="rounded-md outline outline-1 outline-base-300/70 p-4 hover:cursor-pointer duration-150 ease-in shadow-sm hover:shadow-lg hover:scale-105 "
                  >
                    <div className="md:flex justify-between items-center">
                      <div className="flex justify-start items-center gap-2">
                        <BiGridVertical className="text-sm" />
                        <p className="text-sm">
                          <span className="font-bold opacity-50">Creator</span>{" "}
                          : Anya
                        </p>
                        <div className="avatar ">
                          <div className="w-5 rounded-full">
                            <img src="https://img1.ak.crunchyroll.com/i/spire2/f502d225e63d2dcf6ea9810c37048f971651090640_large.jpg" />
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center md:justify-end opacity-60">
                        <p className="text-sm font-bold ">
                          {q.quizType === 0 ? "multiple choice" : ""}{" "}
                          {q.quizType === 1 ? "Identification" : ""}{" "}
                          {q.quizType === 2 ? "Mixed" : ""}
                        </p>
                        <RiCheckboxMultipleFill className="ml-2 text-sm" />
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="text-xl font-lato font-semibold">
                        {q.quizName}
                      </p>
                    </div>
                    <button className="btn gap-2 btn-sm mt-6">
                      <div className="badge badge-sm badge-secondary">
                        {q.questions.length}
                      </div>
                      questions
                    </button>
                    <div className="mt-6 flex justify-between">
                      <p className="mt-4 text-xs opacity-50">
                        {dateToBeutify(q.cat)}
                      </p>
                      <p className="mt-3 text-xs opacity-50">
                        Accessed by students {q.accessCount}x{" "}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
