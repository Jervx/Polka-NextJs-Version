import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { genArray } from "../helpers";

import Layout from "../layout";
import QuizContainer from "../components/quiz/QuizContainer";
import Loading from "../components/loading";

export default function Quiz() {
  const router = useRouter();
  const [qid, setQid] = useState("");
  const [score, setScore] = useState(0);
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pntr, setPntr] = useState(0);
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    const { _qid } = router.query;
    if (!_qid) return;
    if (!router.isReady) return;
    setQid(_qid);
  }, [router]);

  const loadQuiz = async () => {
    if (qid.length === 0) return;
    try {
      setLoading(true);
      const response = await fetch("/api/quiz", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: 0,
          quiz_id: qid,
        }),
      });

      if (!response.ok)
        throw new Error("Can't Retrieve Quiz", { cause: response });

      const data = await response.json();

      setQuizTitle(data.quizName);

      // Shuffle
      let genQuestions = genArray(data.questions.length);

      for (var x = 0; x < genQuestions.length; x++)
        genQuestions[x] = data.questions[genQuestions[x]];

      setQuestions(genQuestions);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadQuiz();
  }, [qid]);

  return (
    <>
      <Head>
        <title>Quiz</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center mt-20 md:mt-24 h-screen relative">
        <Loading loading={loading} />

        {questions.length > 0 && !loading && (
          <QuizContainer
            myScore={score}
            tryAgain={() => {
              setScore(0);
              setPntr(0);
              setFinished(false)
            }}
            onFinish={() => { setFinished(true) }}
            onCorrect={(val) => {
              if (val) setScore(score + 1);
            }}
            question={questions[pntr]}
            pntr={pntr}
            onNext={setPntr}
            total={questions.length}
            title={quizTitle}
          />
        )}

        {!loading && questions.length === 0 && (
          <div>
            <p className="text-center">No Question In This Quiz</p>
            <img className="absolute bottom-0 left-0" src="https://c.tenor.com/qGJ0OTouREEAAAAi/anya-spy-x-family-anime.gif" />
          </div>
        )}

        {
            finished && 
          <img className="absolute bottom-0 left-0" src="https://c.tenor.com/qGJ0OTouREEAAAAi/anya-spy-x-family-anime.gif" />

        }
      </main>
    </>
  );
}

Quiz.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
