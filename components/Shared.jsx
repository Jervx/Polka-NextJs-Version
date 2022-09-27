import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { RiCheckboxMultipleFill } from "react-icons/ri";
import { BiGridVertical } from "react-icons/bi";

import Loading from "./loading";
import { dateToBeutify } from "../helpers";

const Shared = () => {

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
    <div className=" w-full md:w-7/12">
      <div className="flex w-full justify-center">
        <Loading loading={loading} />
      </div>
      <div className="flex justify-center mt-4">
        <BsFillJournalBookmarkFill className="text-2xl text-primary" />
      </div>
      <div className="my-4"></div>
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
                onClick={() =>
                  router.push(`/quiz?_qid=${q._id}&qtitle=${q.quizName}`)
                }
                className="rounded-md outline outline-1 outline-base-300/70 p-4 hover:cursor-pointer duration-150 ease-in shadow-sm hover:shadow-lg hover:scale-105 "
              >
                <div className="md:flex justify-between items-center drop-shadow-md">
                  {
                    q.authorInfo ? (
                        <div className="flex justify-start items-center gap-2">
                    <BiGridVertical className="text-sm" />
                    <p className="text-sm">
                      <span className="font-bold opacity-50">Author</span>
                      {` : ${q.authorInfo.name}`}
                    </p>
                    <div className="avatar ">
                      <div className="w-8 rounded-full">
                        <img
                          alt="creator profile"
                          src={q.authorInfo.picture}
                        />
                      </div>
                    </div>
                  </div>
                    ) : (
                        <div className="flex justify-start items-center gap-2">
                    <BiGridVertical className="text-sm" />
                    <p className="text-sm">
                      <span className="font-bold opacity-50 mr-2">Author</span> : &nbsp; 
                      Anya
                    </p>
                    <div className="avatar ">
                      <div className="w-8 rounded-full">
                        <img
                          alt="creator profile"
                          src="https://img1.ak.crunchyroll.com/i/spire2/f502d225e63d2dcf6ea9810c37048f971651090640_large.jpg"
                        />
                      </div>
                    </div>
                  </div>
                    )
                  }
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
  );
};

export default Shared;
