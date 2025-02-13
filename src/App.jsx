import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa6";

const App = () => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [name, setName] = useState("");
  const [showShareModal, setShowShareModal] = useState(false); // State for the share modal
  const [shareName, setShareName] = useState(""); // State for the name input in the share modal

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get("name");
    setName(nameParam);
  }, []);

  const handleNo = () => {
    setYesButtonSize((prev) => Math.min(prev * 1.5, 10));
  };

  const handleYes = () => {
    setShowCelebration(true);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleShareNameChange = (e) => {
    setShareName(e.target.value); // Update the share name state
  };

  const generateShareLink = () => {
    const baseUrl = window.location.origin; // Get the current origin (e.g., "http://localhost:3000")
    return `${baseUrl}?name=${encodeURIComponent(shareName)}`; // Generate the link with the name
  };

  if (!name) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
          <p className="text-gray-700">
            Please add a name to the URL like this: <br />
            <code className="bg-pink-100 px-2 py-1 rounded mt-2 inline-block">
              ?name=YourName
            </code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4 text-center relative">
      {" "}
      <div className="absolute right-4 bottom-4">
        {" "}
        <button className="bg-black px-3 py-2.5 text-white text-sm">
          Share page
        </button>{" "}
      </div>{" "}
      <div className="absolute bottom-4">
        <a className="text-sm font-medium">bodejr</a>{" "}
      </div>
      <FaHeart className="text-3xl md:text-6xl text-red-500" />
      <h1 className="text-3xl font-bold mb-8 text-pink-600">
        Will you be my Valentine, <span className="capitalize">{name}</span>? 💝
      </h1>
      <div className="space-x-4">
        <button
          onClick={handleYes}
          style={{ transform: `scale(${yesButtonSize})` }}
          className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-bold transition-transform duration-300"
        >
          Yes! 💖
        </button>

        <button
          onClick={handleNo}
          className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-full font-bold transition-colors duration-300"
        >
          No 💔
        </button>
      </div>
      {/* Share Button */}
      <div className="absolute right-4 bottom-4">
        <button
          onClick={handleShare}
          className="bg-black px-3 py-2.5 text-white text-sm"
        >
          Share page
        </button>
      </div>
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full animate-fade-in">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-pink-600 mb-4">
                Share this page
              </h2>
              <p className="text-lg mb-4">
                Enter a name to generate a shareable link:
              </p>
              <input
                type="text"
                value={shareName}
                onChange={handleShareNameChange}
                placeholder="Enter a name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
              />
              {shareName && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600">Share this link:</p>
                  <a
                    href={generateShareLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline break-all"
                  >
                    {generateShareLink()}
                  </a>
                </div>
              )}
              <button
                onClick={() => setShowShareModal(false)}
                className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full font-bold transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-pink-50 rounded-lg p-6 max-w-md w-full animate-fade-in">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-pink-600 mb-4">Yay! 🎉</h2>
              <p className="text-lg mb-4">
                Thank you for saying yes,{" "}
                <span className="capitalize">{name}</span>! 💖
              </p>
              <div className="animate-bounce text-4xl">❤️</div>
              <button
                onClick={handleShare}
                className="bg-black px-3 py-2.5 text-white text-sm"
              >
                Share page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
