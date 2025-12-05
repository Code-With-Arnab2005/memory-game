"use client";

import { useEffect, useState } from "react";
import { Box } from "@/types/box";
import "./flip.css";
import toast from 'react-hot-toast';
import { setFlagsFromString } from "v8";

export default function Page() {
    const [noOfBoxes, setNoOfBoxes] = useState<number>(0);
    const [boxes, setBoxes] = useState<Box[]>([]);
    const [isFirstBoxFlipped, setIsFirstBoxFlipped] = useState<Boolean>(false);
    const [firstBoxFlipped, setFirstBoxFlipped] = useState<Box | null>(null);//the first flipped box
    const [noOfBoxesFlipped, setNoOfBoxesFlipped] = useState<number>(0);

    useEffect(() => {
        const images = [
            { imageId: "img1", src: "/globe.svg" },
            { imageId: "img2", src: "/window.svg" },
            { imageId: "img3", src: "/next.svg" },
            { imageId: "img4", src: "/vercle.svg" },
        ];

        const duplicated = [...images, ...images];

        const shuffled = duplicated
            .map((item) => ({ ...item, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map((item, index) => ({
                boxId: `box-${index + 1}`,
                imageId: item.imageId,
                src: item.src,
                isFlipped: false, // <-- initially face down
            }));

        setBoxes(shuffled as any);
        setNoOfBoxes(shuffled.length);
    }, []);

    const resetBoxes = () => {
        setBoxes((prev) =>
            prev.map((box) =>
                ({ ...box, isFlipped: false })
            )
        );
        setNoOfBoxesFlipped(0);
        setIsFirstBoxFlipped(false);
        setFirstBoxFlipped(null);
    }

    const flipBox = (id: string) => {
        const clickedBox = boxes.find((b) => b.boxId === id);

        //it no clickbox just return
        if (!clickedBox) return;

        //if it is already flipped, user have to choose another box
        if (clickedBox.isFlipped) {
            toast.error("Already Flipped");
            return;
        }

        //this is the second box, so check for equality
        if (isFirstBoxFlipped) {
            //first flip the second box
            setBoxes((prev) =>
                prev.map((box) =>
                    box.boxId === id ? { ...box, isFlipped: true } : box
                )
            );

            //now check for equality
            if (firstBoxFlipped?.imageId === clickedBox.imageId) {//then correct flip, stay as flipped
                //increase the number boxes flipped by 2
                const updatedCount = noOfBoxesFlipped + 2;
                setNoOfBoxesFlipped(updatedCount);

                //check if all the boxes finished or not, if finished the game is over
                if (updatedCount == noOfBoxes) {//all boxes are flipped
                    toast.success("Congratulations! You flipped all boxes correctly...");
                    setTimeout(() => {
                        resetBoxes();
                    }, 2000);
                } else {
                    toast.success("Correct guess");
                }
            } else {//wrong flip, unflip both boxes
                toast.error("Incorrect guess");
                setTimeout(() => {
                    setBoxes((prev) =>
                        prev.map((box) =>
                            box.boxId === id || box.boxId === firstBoxFlipped?.boxId ? { ...box, isFlipped: false } : box
                        )
                    );
                }, 1000);
            }
            //clear the states for next 2 moves
            setIsFirstBoxFlipped(false);
            setFirstBoxFlipped(null);
            return;
        }

        //this is the first box
        setIsFirstBoxFlipped(true);
        setFirstBoxFlipped(clickedBox);
        setBoxes((prev) =>
            prev.map((box) =>
                box.boxId === id ? { ...box, isFlipped: true } : box
            )
        );
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-8">
            <div className="bg-gray-800 shadow-lg rounded-xl p-6 max-w-4xl w-full">
                <div className="w-full text-2xl font-semibold mb-5 flex justify-center items-center">Start Flipping Boxes</div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {boxes.map((box: Box) => (
                        <div
                            key={box.boxId}
                            className="w-full aspect-[3/2] cursor-pointer" // aspect ratio 3:2
                            onClick={() => flipBox(box.boxId)}
                        >
                            <div className={`flip-card ${box.isFlipped ? "flipped" : ""}`}>
                                {/* BACK SIDE - face down */}
                                <div className="flip-card-back">
                                    <div className="w-full h-full flex items-center justify-center bg-gray-600 text-white text-lg rounded-lg">
                                        Flip
                                    </div>
                                </div>

                                {/* FRONT SIDE (image) */}
                                <div className="flip-card-front">
                                    <img
                                        src={box.src}
                                        alt={box.imageId}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
