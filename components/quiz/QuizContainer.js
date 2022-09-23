import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { TiArrowRightThick } from "react-icons/ti";
import { useState } from "react";
import { checkMyAnswer } from "../../helpers";
const QuizContainer = ({
  title,
  pntr,
  total,
  question,
  myScore,
  onCorrect,
  tryAgain,
  onNext,
  onFinish,
}) => {
  const [chosen, setChosen] = useState(-1);
  const [answer, setAnswer] = useState("");

  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [finished, setFinished] = useState(false);

  const getRing = (idx) => {
    if (checked)
      if (
        checkMyAnswer(
          question.type === 1 ? answer : question.choices[idx],
          question.answers
        )
      ) {
        return "ring-success from-base-100 to-accent";
      } else {
        return "ring-error from-base-100 to-error opacity-50";
      }

    if (chosen === idx) return "ring-accent from-base-100 to-primary";

    return "ring-base-100 hover:ring-accent hover:ring-accent hover:from-base-100 hover:to-primary";
  };

  const verifyAnswer = () => {
    var soundCorrect = new Audio("/sounds/correct.mp3");
    var soundWrong = new Audio("/sounds/wrong.mp3");
    if (
      checkMyAnswer(
        question.type === 1 ? answer : question.choices[chosen],
        question.answers
      )
    ) {
      soundCorrect.play();
      setChecked(true);
      setIsCorrect(true);
      onCorrect(true);
    } else soundWrong.play();
    setChecked(true);
  }

  return (
    <div className="w-full sm:w-full md:w-9/12 lg:w-7/12 rounded-lg  px-8 md:px-24 relative">
      <div className="flex justify-center md:my-16">
        <div className="items-center flex font-andika tracking-wide text-2xl">
          <BsFillJournalBookmarkFill className="mr-4" />
          <p className="text-sm">{title}</p>
        </div>
      </div>
      {finished && (
        <>
          <p className="text-center w-full mt-16 text-xl">You&apos;ve got</p>
          <div className="flex justify-center mt-4 mb-16">
            <p className={`text-4xl ${ myScore / total * 100 > 75 ? 'text-success' : 'text-warning' }`}>
              {myScore} : {total}
            </p>
          </div>
        </>
      )}
      {!finished && (
        <>
          <div className="sm:flex items-center justify-between">
            <div className="mt-4 sm:mt-0 flex items-center text-purple-700">
              <p className="mr-3 text-sm md:text-lg font-lato font-bold">
                {" "}
                Question {pntr + 1} <span className="">/ {total}</span>{" "}
              </p>
              <progress
                className="progress progress-primary w-24"
                value={pntr + 1}
                max={total}
              />
            </div>
          </div>
          <div className="my-4">
            {question.isCode ? (
              <div className="mockup-code">
                {question.question.split("\n").map((code, i) => (
                  <pre data-prefix={i + 1} key={i + 1}>
                    <code>{code}</code>
                  </pre>
                ))}
              </div>
            ) : (
              <p className="mt-4 font-lato font-bold text-xl md:text-2xl">
                {question.question}
              </p>
            )}

            {question.type === 0 && (
              <div className="mt-8 mx-2 md:mx-8">
                {question.choices.map((choice, idx) => (
                  <div key={idx} className="form-control">
                    <label
                      className={`cursor-pointer label duration-500 ease-in-out flex justify-between bg-gradient-to-r ${getRing(
                        idx
                      )} ring-2 p-4 px-4 mb-5 rounded-xl`}
                    >
                      <span className="font-lato tracking-wider text-lg md:text-xl font-bold flex">
                        {choice}{" "}
                        {checkMyAnswer(
                          question.type === 1
                            ? answer
                            : chosen > -1
                            ? question.choices[idx]
                            : "",
                          question.answers
                        ) && checked ? (
                          <AiFillLike className="ml-3 text-success text-2xl" />
                        ) : (
                          <></>
                        )}
                      </span>
                      <input
                        type="checkbox"
                        checked={chosen === idx}
                        onChange={() => {
                          if (checked) return;
                          setChosen(idx);
                        }}
                        className="checkbox"
                      />
                    </label>
                  </div>
                ))}
              </div>
            )}

            {question.type === 1 && (
              <>
                <div className="form-control mt-12 w-full">
                  <input
                    type="text"
                    onChange={(e) => {
                      if (checked) return;
                      setAnswer(e.target.value);
                    }}
                    onKeyDown={(e)=>{
                        if (e.key === "Enter") {
                            e.preventDefault();
                            verifyAnswer()
                        }
                    }}
                    value={answer}
                    placeholder="Your answer here"
                    className={`input input-bordered w-full ${
                      checked && isCorrect
                        ? "input-success ring ring-success"
                        : !checked
                        ? ""
                        : "input-error ring ring-error"
                    }`}
                  ></input>
                  <label className="label">
                    <span className="label-text-alt">
                      {checked && isCorrect && (
                        <div className="flex items-center justify-start gap-2 text-success mt-4 text-lg">
                          <AiFillLike className="ml-3 text-success text-2xl" />
                          Hooray!
                        </div>
                      )}
                    </span>
                    <span className="label-text-alt">
                      {checked && !isCorrect && (
                        <div className="flex items-center justify-start gap-2 text-success mt-4 text-lg">
                          <TiArrowRightThick className="ml-3 text-success text-2xl" />
                          {question.answers[0]}
                        </div>
                      )}
                    </span>
                  </label>
                </div>
              </>
            )}
          </div>
        </>
      )}
      <div className="flex items-center flex-wrap justify-end mt-4">
        {!finished && (
          <>
            <button
              disabled={(chosen === -1 && answer.length === 0) || checked}
              onClick={() => verifyAnswer()}
              className="btn btn-active mr-2"
            >
              Check Answer
            </button>
            <button
              onClick={() => {
                if (pntr + 1 === total) {
                  onFinish();
                  setFinished(true);
                  setAnswer("");
                  setIsCorrect(false);
                  setChecked(false);
                  var soundFinish = new Audio("/sounds/finish.mp3");
                  soundFinish.play();
                  return;
                }
                onNext(pntr + 1);
                setChecked(false);
                setIsCorrect(false);
                setAnswer("");
                setChosen(-1);
              }}
              disabled={!checked || finished}
              className="btn btn-active"
            >
              {pntr + 1 === total ? "Finish" : "Next"}
            </button>
          </>
        )}
        {finished && (
          <button
            onClick={() => {
              setChecked(false);
              setChosen(-1);
              setAnswer("");
              setIsCorrect(false);
              setFinished(false);
              tryAgain();
            }}
            className="ml-2 btn btn-active"
          >
            try again
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizContainer;
