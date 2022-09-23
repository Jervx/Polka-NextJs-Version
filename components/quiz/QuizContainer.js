import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
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
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);

  const getRing = (idx) => {
    if (checked)
      if (checkMyAnswer(question.choices[idx], question.answers)) {
        return "ring-success from-base-100 to-accent";
      } else {
        return "ring-error from-base-100 to-error opacity-50";
      }

    if (chosen === idx) return "ring-accent from-base-100 to-primary";

    return "ring-base-100 hover:ring-accent hover:ring-accent hover:from-base-100 hover:to-primary";
  };

  return (
    <div className="w-full sm:w-full md:w-9/12 lg:w-7/12 card rounded-lg  px-8 md:px-24 relative">
      {finished && (
        <>
          <div className="flex justify-center">
            <div className="items-center flex font-andika tracking-wide text-2xl">
              <BsFillJournalBookmarkFill className="mr-4" />
              <p className="">{title}</p>
            </div>
          </div>
          <p className="text-center w-full mt-16"></p>
          <div className="flex justify-center mt-4 mb-16">
            <p className="text-4xl ">
              You got {myScore} / {total}
            </p>
          </div>
        </>
      )}
      {!finished && (
        <>
          <div className="sm:flex items-center justify-between">
            <div className="items-center flex font-andika font-bold tracking-wide text-xs md:text-xl">
              <BsFillJournalBookmarkFill className=" mr-2 text-lg" />
              <p className="">{title}</p>
            </div>
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
            <p className="mt-4 font-lato font-bold text-xl md:text-2xl">
              {question.question}
            </p>
            {question.type === 0 && (
              <div className="mt-8 mx-2 md:mx-8">
                {question.choices.map((choice, idx) => (
                  <div key={idx} className="form-control">
                    <label
                      className={`cursor-pointer label duration-500 ease-in-out flex justify-between bg-gradient-to-r ${getRing(
                        idx
                      )} ring-2 p-2 px-4 mb-5 rounded-xl`}
                    >
                      <span className="font-lato tracking-wider text-lg md:text-xl font-bold flex">
                        {choice}{" "}
                        {checkMyAnswer(
                          chosen > -1 ? question.choices[idx] : "",
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
          </div>
        </>
      )}
      <div className="flex items-center justify-end mt-4">
        <button
          disabled={chosen === -1 || checked}
          onClick={() => {
            var soundCorrect = new Audio("/sounds/correct.mp3");
            var soundWrong = new Audio("/sounds/wrong.mp3");
            if (checkMyAnswer(question.choices[chosen], question.answers)) {
              soundCorrect.play();
              onCorrect(true);
            }else soundWrong.play();
            setChecked(true);
          }}
          className="btn btn-active mr-2"
        >
          Check Answer
        </button>
        <button
          onClick={() => {
            if (pntr + 1 === total) {
              onFinish();
              setFinished(true);
              var soundFinish = new Audio("/sounds/finish.mp3");
              soundFinish.play();
              return;
            }
            onNext(pntr + 1);
            setChecked(false);
            setChosen(-1);
          }}
          disabled={!checked || finished}
          className="btn btn-active"
        >
          {pntr + 1 === total ? "Finish" : "Next"}
        </button>
        {finished && (
          <button
            onClick={() => {
              setChecked(false);
              setChosen(-1);
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