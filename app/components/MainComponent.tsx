"use client";

import Image from "next/image";
import { StaticImageData } from "next/image";
import albattani from "@/public/scientistsImage/albattani1.jpeg";
import { scientistsJson } from "@/public/content/scientists";
import { ChangeEvent, useState } from "react";

import betweenLeftRightIcon1 from "@/public/icons/image-index-div-1.svg";
import betweenLeftRightIcon2 from "@/public/icons/image-index-div-2.svg";
import betweenLeftRightIcon3 from "@/public/icons/image-index-div-3.svg";
import leftIcon from "@/public/icons/leftIcon.svg";
import rightIcon from "@/public/icons/rightIcon.svg";
import upIcon from "@/public/icons/upIcon.svg";
import downIcon from "@/public/icons/downIcon.svg";

interface ApiResponse {
  returned: string;
  status: number;
}

type slideIndex = "1" | "2" | "3";

interface Scientist {
  name: string;
  date: string;
  history: string;
}

interface ScientistCardProp {
  image_path: string | StaticImageData;
  scientist_name: string;
  scientists_data: Scientist[];
}

const ScientistCard: React.FC<ScientistCardProp> = ({ image_path, scientist_name, scientists_data } ) => {
    const scientistDetails = scientists_data.find(
    (scientist) => scientist.name.toLowerCase() === scientist_name.toLowerCase()
  );
  return (
    <div>
      <Image width={50} src={image_path} alt="scientist image" />
      <h3>{scientist_name}</h3>
      <h2>{scientistDetails?.history}</h2>
    </div>
  );
}

export default function MainComponent() {
  const [InputChat, setInputChat] = useState<string>("");
  const [middleStatus, setMiddleStatus] = useState<slideIndex>("1");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputChat(event.target.value);
  }

  const handleStatusChange = (dir: "left" | "right") => {
    if (dir === "left") {
      setMiddleStatus((prev) => {
        if (prev === "1") return "3";
        if (prev === "2") return "1";
        return "2";
      });
    } else if (dir === "right") {
      setMiddleStatus((prev) => {
        if (prev === "3") return "1";
        if (prev === "2") return "3";
        return "2";
      });
    }
  };

  const renderMiddleStatusBar = () => {
    if (middleStatus === "1") {
      return <Image src={betweenLeftRightIcon1} alt="betweenLeftRightIcon"></Image>
    } else if (middleStatus === "2") {
      return <Image src={betweenLeftRightIcon2} alt="betweenLeftRightIcon"></Image>
    } else if (middleStatus === "3") {
      return <Image src={betweenLeftRightIcon3} alt="betweenLeftRightIcon"></Image>
    }
  };

  const postRequestHandler = async() => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: InputChat,
      })

      if (!response.ok) {
        return {
          error: `API request failed with status ${response.status}`,
        };
      }

      const data: ApiResponse = await response.json();
      console.log(data.returned);
      return data
    } catch (error) {
      console.error("handleGetRequest error: ", error);
      return { error: error || "Failed to fetch data." };
    }
  }

  return (
    <div className="flex flex-row justify-between w-full h-screen p-8 gap-5">
      <div className="flex flex-col w-1/2 bg-leftpanel rounded-xl p-4 h-full overflow-auto items-center">
        <ScientistCard image_path={albattani} scientist_name="albattani" scientists_data={scientistsJson}/>
        <div className="flex flex-col ml-auto mt-auto gap-4">
          <Image src={upIcon} alt="upIcon" className="hover:cursor-pointer"></Image>
          <Image src={downIcon} alt="downIcon" className="hover:cursor-pointer"></Image>
        </div>
        <div className="flex mt-auto gap-4">
          <Image src={leftIcon} alt="leftIcon" onClick={() => handleStatusChange("left")} className="hover:cursor-pointer"></Image>
          {renderMiddleStatusBar()}
          <Image src={rightIcon} alt="rightIcon" onClick={() => handleStatusChange("right")} className="hover:cursor-pointer"></Image>
        </div>
      </div>
      <div className="flex flex-col w-1/2 bg-rightpanel rounded-xl p-4 h-full overflow-auto justify-end">
        <div className="flex flex-col w-full h-25 bg-leftpanel rounded-md">
          <label htmlFor="conversation-input"></label>
          <input type="text" className="focus:outline-none w-full h-2/3 px-4 text-rightpanel" onChange={handleInputChange}/>
          <button className="bg-rightpanel ml-auto rounded-xl px-4 py-2 m-2 hover:cursor-pointer" onClick={postRequestHandler}>Gönder</button>
        </div>
      </div>
    </div>
  );
}
