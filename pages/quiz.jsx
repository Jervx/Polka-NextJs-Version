import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { genArray } from "../helpers";

import Layout from "../layout";
import QuizContainer from "../components/quiz/QuizContainer";
import Loading from "../components/loading";

import Character from "../components/Character";

export default function Quiz() {
  const router = useRouter();
  const [qid, setQid] = useState("");
  const [score, setScore] = useState(0);
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pntr, setPntr] = useState(0);
  const [finished, setFinished] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const { _qid, _qtitle } = router.query;
    if (!_qid) return;
    if (!router.isReady) return;
    setQid(_qid);
    setQuizTitle(_qtitle)
  }, [router]);

  const shuffle = () => {
    let genQuestions = genArray(questions.length);

    for (var x = 0; x < genQuestions.length; x++) {
      var QSTN = questions[genQuestions[x]];
      var genChoices = genArray(QSTN.choices.length);

      for (var y = 0; y < genChoices.length; y++)
        genChoices[y] = QSTN.choices[genChoices[y]];

      QSTN = { ...QSTN, choices: genChoices };
      genQuestions[x] = QSTN;
    }

    setQuestions(genQuestions);
  };

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

      let genQuestions = []
      // Shuffle
    //   let genQuestions = genArray(data.questions.length);

    //   for (var x = 0; x < genQuestions.length; x++) {
    //     var QSTN = data.questions[genQuestions[x]];
    //     var genChoices = genArray(QSTN.choices.length);

    //     for (var y = 0; y < genChoices.length; y++)
    //       genChoices[y] = QSTN.choices[genChoices[y]];

    //     QSTN = { ...QSTN, choices: genChoices };
    //     genQuestions[x] = QSTN;
    //   }

    // for (var x = 0; x < data.questions.length; x++) {
    //     var QSTN = data.questions[x];
    //     var genChoices = genArray(QSTN.choices.length);

    //     for (var y = 0; y < genChoices.length; y++)
    //       genChoices[y] = QSTN.choices[genChoices[y]];

    //     QSTN = { ...QSTN, choices: genChoices };
    //     genQuestions.push(QSTN);
    //   }

    //   setQuestions(genQuestions);
      setQuestions(data.questions);
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
      {qid.length === 0 && (
        <Head>
          <title>Polka Quiz</title>
          <meta name="description" content={`Try and answer reviewer - ${quizTitle}`} />
          <link rel="icon" href="/PolkaQuiz.ico" />

          <title>Polka Quiz</title>
          <link rel="icon" href="/PolkaQuiz.ico" />
          <meta name="description" content={`Try and answer reviewer - ${quizTitle}`} />

          <meta itemProp="name" content="Polka Quiz" />
          <meta
            itemProp="description"
            content={`Try and answer reviewer - ${quizTitle}`}
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
            content={`Try and answer reviewer - ${quizTitle}`}
          />
          <meta property="og:image" content="/metacover.png" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Polka Quiz" />
          <meta
            name="twitter:description"
            content={`Try and answer reviewer - ${quizTitle}`}
          />
          <meta name="twitter:image" content="/metacover.png" />
        </Head>
      )}

      <main
        onMouseMove={(e) => {
          setMouseX(e.clientX);
          setMouseY(e.clientY);
        }}
        className="flex justify-center mt-20 md:mt-24 min-h-screen relative"
      >
        <Loading loading={loading} />

        {questions.length > 0 && !loading && (
          <QuizContainer
            myScore={score}
            tryAgain={() => {
              shuffle();
              setScore(0);
              setPntr(0);
              setFinished(false);
            }}
            onFinish={() => {
              setFinished(true);
            }}
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
            <img
              alt="anya sad"
              className="absolute bottom-0 left-0 w-40"
              src="https://c.tenor.com/qGJ0OTouREEAAAAi/anya-spy-x-family-anime.gif"
            />
          </div>
        )}

        {finished && <Character mouseX={mouseX} mouseY={mouseY} />}
      </main>
    </>
  );
}

Quiz.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
