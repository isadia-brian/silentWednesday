import { Cormorant } from "next/font/google";
import { useState, useRef } from "react";

const cormorant = Cormorant({
  subsets: ["cyrillic"],
  weight: ["300", "400", "600", "700"],
});

const Review = () => {
  const [val, setVal] = useState(null);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [activeLabel, setActiveLabel] = useState(null);
  const [placeholder, setPlaceholder] = useState("");
  const [showReview, setShowReview] = useState(true);

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);

  const handleEmojiClicked = (inputRef) => {
    setActiveLabel(inputRef.current.id);
    setShow(true);
    const inputValue = inputRef.current.value;
    const numericalValue = parseInt(inputValue);
    setVal(numericalValue);

    if (numericalValue <= 3) {
      setPlaceholder("What can we do to improve ?");
    } else {
      setPlaceholder(`How was the experience at Silent Palms Villa ?`);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (name && message === "") {
      alert("Please fill all fields");
    } else {
      alert(`${name}, ${message}, ${val}`);
      setName("");
      setMessage("");
      setShow(false);
      setActiveLabel(null);
      setShowReview(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full items-center  mb-20">
      <h4
        className={`${cormorant.className} text-[20px] md:text-[40px] font-bold text-green-800`}
      >
        Leave us a review
      </h4>
      {showReview ? (
        <>
          <p className="mb-5">
            Enjoyed your stay ? Leave a feedback below to help us improve our
            services.
          </p>
          <div>
            <form className="flex flex-col" onSubmit={handleFormSubmit}>
              <div className="flex space-x-3 mb-4">
                <div>
                  <input
                    type="radio"
                    id="extraHappy"
                    value={5}
                    ref={inputRef1}
                    className="hidden"
                  />
                  <label
                    htmlFor="extraHappy"
                    onClick={() => handleEmojiClicked(inputRef1)}
                  >
                    <p
                      className={`text-5xl grayscale cursor-pointer opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300 ease-in-out hover:scale-110 hover:-translate-y-1 ${
                        activeLabel === "extraHappy"
                          ? "grayscale-0 opacity-100"
                          : "grayscale opacity-50"
                      }`}
                    >
                      &#129321;
                    </p>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    value={4}
                    className="hidden"
                    ref={inputRef2}
                    id="grining"
                  />
                  <label
                    htmlFor="grining"
                    onClick={() => handleEmojiClicked(inputRef2)}
                  >
                    <p
                      className={`text-5xl grayscale cursor-pointer opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300 ease-in-out hover:scale-110 hover:-translate-y-1 ${
                        activeLabel === "grining"
                          ? "grayscale-0 opacity-100"
                          : "grayscale opacity-50"
                      }`}
                    >
                      &#128522;
                    </p>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    value={3}
                    className="hidden"
                    ref={inputRef3}
                    id="expressionless"
                  />
                  <label
                    htmlFor="expressionless"
                    onClick={() => handleEmojiClicked(inputRef3)}
                  >
                    <p
                      className={`text-5xl grayscale cursor-pointer opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300 ease-in-out hover:scale-110 hover:-translate-y-1 ${
                        activeLabel === "expressionless"
                          ? "grayscale-0 opacity-100"
                          : "grayscale opacity-50"
                      }`}
                    >
                      &#128529;
                    </p>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    value={2}
                    className="hidden"
                    ref={inputRef4}
                    id="dissapointed"
                  />
                  <label
                    htmlFor="dissapointed"
                    onClick={() => handleEmojiClicked(inputRef4)}
                  >
                    <p
                      className={`text-5xl grayscale cursor-pointer opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300 ease-in-out hover:scale-110 hover:-translate-y-1 ${
                        activeLabel === "dissapointed"
                          ? "grayscale-0 opacity-100"
                          : "grayscale opacity-50"
                      }`}
                    >
                      &#128543;
                    </p>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    value={1}
                    className="hidden"
                    ref={inputRef5}
                    id="angry"
                  />
                  <label
                    htmlFor="angry"
                    onClick={() => handleEmojiClicked(inputRef5)}
                  >
                    <p
                      className={`text-5xl grayscale cursor-pointer opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300 ease-in-out hover:scale-110 hover:-translate-y-1 ${
                        activeLabel === "angry"
                          ? "grayscale-0 opacity-100"
                          : "grayscale opacity-50"
                      }`}
                    >
                      &#128547;
                    </p>
                  </label>
                </div>
              </div>
              <div className="transition duration-300 ease-in">
                {show && (
                  <div>
                    <div className="flex flex-col my-3">
                      <label htmlFor="name" className="text-sm">
                        Name
                      </label>
                      <input
                        type="text"
                        className="px-2 py-2 outline-none border border-gray-200 w-[400px]"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mb-5">
                      <label htmlFor="message" className="text-sm">
                        Message
                      </label>
                      <textarea
                        type="text"
                        className="px-2 py-2 outline-none border border-gray-200 w-[400px] h-[100px]"
                        placeholder={placeholder}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-2 py-2 bg-green-700 w-[400px] text-white"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className="border border-gray-300  py-7 mt-6 shadow-2xl">
          <div className="px-4 flex flex-col  justify-center items-center space-y-10">
            <h4 className="font-bold text-2xl">
              Thank you for submitting your feedback
            </h4>
            <p className="text-5xl">🎉</p>
            <button
              type="button"
              className="px-2 py-2 bg-green-700 w-[100px] text-white cursor-pointer"
              onClick={() => setShowReview(true)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
