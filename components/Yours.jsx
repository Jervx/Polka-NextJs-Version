import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

import { RiCheckboxMultipleFill } from "react-icons/ri";
import { BiGridVertical } from "react-icons/bi";
import { FaPenNib } from "react-icons/fa";

import Loading from "./loading";
import { dateToBeutify } from "../helpers";

const Shared = () => {
  const { data: session } = useSession();

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
        body: JSON.stringify({ mode: 5, uid: session.user.uid }),
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
    if (!session) return;
    loadQuizes();
  }, [session]);

  return (
    <>
      {session ? (
        <>
          <div className="w-full md:w-9/12 relative">
            <div className="absolute top-0 right-10">
                <button className="btn btn-sm btn-ghost ring-2 ring-base-100 hover:ring-accent">Create <span className="badge ml-2 badge-sm">soon..</span></button>
            </div>
            <div className="flex w-full justify-center">
              <Loading loading={loading} />
            </div>
            <div className="flex justify-start items-center gap-2 mx-4">
              <FaPenNib className="text-2xl text-accent " />
              <p className="text-2xl font-bold">Yours</p>
              <span className="badge ml-2 badge-md">{quizes.length}</span>
            </div>

            <div className="mt-8">
              {!loading &&
                quizes.map((q, idx) => (
                  <div key={idx} className="p-0 md:p-2 mx-1 mt-8 md:mx-4">
                    <div
                      // onClick={() => router.push(`/quiz?_qid=${q._id}&qtitle=${q.quizName}`) }
                      className="rounded-md outline outline-1 outline-base-300/70 p-4 duration-150 ease-in shadow-sm hover:shadow-lg hover:scale-100 "
                    >
                      <div className="md:flex justify-between items-center">
                        <div className="flex justify-start items-center gap-2">
                          <BiGridVertical className="text-sm" />
                          <p className="text-sm">
                            <span className="font-bold opacity-50">
                              Creator
                            </span>{" "}
                            : You
                          </p>
                          <div className="avatar ">
                            <div className="w-5 rounded-full">
                              <img
                                alt="creator profile"
                                src={session.user.image}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0 gap-2 flex items-center md:justify-end opacity-60">
                          <p className="text-sm font-bold ">
                            {q.quizType === 0 ? "multiple choice" : ""}{" "}
                            {q.quizType === 1 ? "Identification" : ""}{" "}
                            {q.quizType === 2 ? "Mixed" : ""}
                          </p>
                          <RiCheckboxMultipleFill className="ml-2 text-sm" />
                          <button className="btn btn-xs text-info">edit</button>
                          <button className="btn btn-xs text-error">delete</button>
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
        </>
      ) : (
        <>
          <p className="text-center text-2xl font-inter font-black">
            Oops! you're not signed in.
          </p>
          <div className="w-full flex justify-center mt-4">
            <img
              alt="anya sad"
              className="w-24 opacity-50"
              src="https://i.kym-cdn.com/photos/images/facebook/002/388/679/0c2.png"
            />
          </div>
        </>
      )}
    </>
  );
};

export default Shared;
