"use client";

import { useEffect, useState } from "react";
import { Box } from "@/types/box";
import toast from "react-hot-toast";
import "./flip.css";

export default function GamePage() {
  const [noOfBoxes, setNoOfBoxes] = useState<number>(0);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [isFirstBoxFlipped, setIsFirstBoxFlipped] = useState<boolean>(false);
  const [firstBoxFlipped, setFirstBoxFlipped] = useState<Box | null>(null);
  const [noOfBoxesFlipped, setNoOfBoxesFlipped] = useState<number>(0);

  useEffect(() => {
    const images = [
      { imageId: "img1", src: "/image1.png" },
      { imageId: "img2", src: "/image2.png" },
      { imageId: "img3", src: "/image3.png" },
      { imageId: "img4", src: "/image4.png" },
    ];

    const duplicated = [...images, ...images];

    const shuffled = duplicated
      .map((item) => ({ ...item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((item, index) => ({
        boxId: `box-${index + 1}`,
        imageId: item.imageId,
        src: item.src,
        isFlipped: false,
      }));

    setBoxes(shuffled as any);
    setNoOfBoxes(shuffled.length);
  }, []);

  const resetBoxes = () => {
    setBoxes((prev) => prev.map((box) => ({ ...box, isFlipped: false })));
    setNoOfBoxesFlipped(0);
    setIsFirstBoxFlipped(false);
    setFirstBoxFlipped(null);
  };

  const flipBox = (id: string) => {
    const clickedBox = boxes.find((b) => b.boxId === id);
    if (!clickedBox) return;

    if (clickedBox.isFlipped) {
      toast.error("Already Flipped");
      return;
    }

    if (isFirstBoxFlipped) {
      setBoxes((prev) =>
        prev.map((box) =>
          box.boxId === id ? { ...box, isFlipped: true } : box
        )
      );

      if (firstBoxFlipped?.imageId === clickedBox.imageId) {
        const updatedCount = noOfBoxesFlipped + 2;
        setNoOfBoxesFlipped(updatedCount);

        if (updatedCount === noOfBoxes) {
          toast.success("🎉 You flipped all boxes correctly!");
          setTimeout(() => {
            resetBoxes();
          }, 2000);
        } else {
          toast.success("✅ Correct guess");
        }
      } else {
        toast.error("❌ Incorrect guess");
        setTimeout(() => {
          setBoxes((prev) =>
            prev.map((box) =>
              box.boxId === id || box.boxId === firstBoxFlipped?.boxId
                ? { ...box, isFlipped: false }
                : box
            )
          );
        }, 1000);
      }

      setIsFirstBoxFlipped(false);
      setFirstBoxFlipped(null);
      return;
    }

    setIsFirstBoxFlipped(true);
    setFirstBoxFlipped(clickedBox);
    setBoxes((prev) =>
      prev.map((box) =>
        box.boxId === id ? { ...box, isFlipped: true } : box
      )
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center p-6">
      {/* Game Header */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6 text-white">
        <h1 className="text-3xl font-bold tracking-wide">Flip Game 🎮</h1>
        <div className="flex items-center space-x-4">
          <div className="bg-gray-700 px-4 py-2 rounded shadow">Flipped: {noOfBoxesFlipped}/{noOfBoxes}</div>
          <button
            onClick={resetBoxes}
            className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded shadow transition"
          >
            Reset Game
          </button>
        </div>
      </div>

      {/* Game Board */}
      <div className="bg-gray-900 p-4 rounded-xl shadow-lg w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-4">
        {boxes.map((box: Box) => (
          <div
            key={box.boxId}
            className="w-full aspect-square cursor-pointer perspective"
            onClick={() => flipBox(box.boxId)}
          >
            <div
              className={`flip-card transition-transform duration-500 ${
                box.isFlipped ? "flipped" : ""
              }`}
            >
              {/* BACK */}
              <div className="flip-card-back bg-gray-700 flex items-center justify-center rounded-lg shadow-md text-white text-lg font-semibold">
                ?
              </div>
              {/* FRONT */}
              <div className="flip-card-front rounded-lg overflow-hidden shadow-md">
                <img
                  src={box.src}
                  alt={box.imageId}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
