"use client";

import Image from "next/image";
import { StaticImageData } from "next/image";
import { scientistsJson } from "@/public/content/scientists";
import { ChangeEvent, useState, useRef, useEffect } from "react";

import betweenLeftRightIcon1 from "@/public/icons/image-index-div-1.svg";
import betweenLeftRightIcon2 from "@/public/icons/image-index-div-2.svg";
import betweenLeftRightIcon3 from "@/public/icons/image-index-div-3.svg";
import leftIcon from "@/public/icons/leftIcon.svg";
import rightIcon from "@/public/icons/rightIcon.svg";
import upIcon from "@/public/icons/upIcon.svg";
import downIcon from "@/public/icons/downIcon.svg";

import hipparkosImage from "@/public/scientistsImage/hipparchus1.jpg";
import batlamyusImage from "@/public/scientistsImage/ptolemy1.jpg";
import aryabhataImage from "@/public/scientistsImage/aryabhata1.jpg";
import albattaniImage from "@/public/scientistsImage/albattani1.jpeg";
import tusiImage from "@/public/scientistsImage/nasi2.jpg";
import regiomontanusImage from "@/public/scientistsImage/regio2.jpg";

type PostResponse = ApiResponse | { error: string };
type MessageRole = "user" | "assistant";

interface Message {
  role: MessageRole;
  content: string;
}

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
    <div className="flex flex-col items-center font-outfit justify-center w-full m-4">
      <Image width={300} src={image_path} alt="scientist image" className="mb-4 mr-auto rounded-xl"/>
      <div className="flex flex-row text-rightpanel text-2xl mr-auto gap-2 ">
        <h1 className="text-rightpanel text-2xl mr-auto">{scientist_name}</h1>
        <h1>{scientistDetails?.date}</h1>
      </div>
      <h2 className="text-chatcolor">{scientistDetails?.history}</h2>
    </div>
  );
}

export default function MainComponent() {

  const [isAnimating, setIsAnimating] = useState(false);

  const handleScientistChange = (direction: "up" | "down") => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    setTimeout(() => {
      if (direction === "up") {
        setCurrentScientistIndex(prev => 
          prev === 0 ? scientistsJson.length - 1 : prev - 1
        );
      } else if (direction === "down") {
        setCurrentScientistIndex(prev => 
          prev === scientistsJson.length - 1 ? 0 : prev + 1
        );
      }
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 300);
  };

  //Storing chat messages in a single state
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //General state management
  const [InputChat, setInputChat] = useState<string>("");
  const [middleStatus, setMiddleStatus] = useState<slideIndex>("1");

  const [currentScientistIndex, setCurrentScientistIndex] = useState<number>(3); // Start with El-Battani (index 3)
  const getScientistImage = (name: string): StaticImageData => {
    const imageMap: Record<string, StaticImageData> = {
      "Hipparkos": hipparkosImage,
      "Klaudyos Batlamyus": batlamyusImage,
      "Aryabhata": aryabhataImage,
      "El-Battani": albattaniImage,
      "Nasirüddin Tusi": tusiImage,
      "Regiomontanus": regiomontanusImage
    };
  
    return imageMap[name] || albattaniImage; // Fallback to albattani if not found
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);

    setInput("")
    setIsLoading(true);

    try {
      const data = await postRequestHandler();
      
      if("error" in data) {
        throw new Error("Error in data.");
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.returned }]);
      }
    } catch {
      console.error("Error sending the message");
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Sorry, there was an error processing your request."
      }]);
    } finally {
      setIsLoading(false);
      console.log(messages);
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputChat(event.target.value);
    setInput(event.target.value);
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

  const postRequestHandler = async(): Promise<PostResponse> => {
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
      return data
    } catch (error) {
      console.error("handleGetRequest error: ", error);
      return { error: "Failed to fetch data." };
    }
  }

return (
  <div className="flex flex-row justify-between w-full h-screen p-8 gap-5">
    <div className="flex flex-col w-[60%] bg-leftpanel rounded-xl p-4 h-full overflow-auto items-center relative">
      {/* Adding a main content container with animation classes */}
      <div className={`w-full pr-12 transition-all duration-600 ${
        isAnimating ? 'opacity-0 transform translate-y-10' : 'opacity-100 transform translate-y-0'
      }`}>
        <ScientistCard 
          image_path={getScientistImage(scientistsJson[currentScientistIndex].name)} 
          scientist_name={scientistsJson[currentScientistIndex].name} 
          scientists_data={scientistsJson}
        />
      </div>
      
      {/* Fixed position navigation controls */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
        <Image 
          src={upIcon} 
          alt="upIcon" 
          onClick={() => !isAnimating && handleScientistChange("up")} 
          className={`hover:cursor-pointer ${isAnimating ? 'opacity-50' : 'opacity-100'}`} 
        />
        <Image 
          src={downIcon} 
          alt="downIcon" 
          onClick={() => !isAnimating && handleScientistChange("down")} 
          className={`hover:cursor-pointer ${isAnimating ? 'opacity-50' : 'opacity-100'}`} 
        />
      </div>
        
        {/* Keep the bottom navigation as is */}
        <div className="flex mt-auto gap-4">
          <Image 
            src={leftIcon} 
            alt="leftIcon" 
            onClick={() => handleStatusChange("left")} 
            className="hover:cursor-pointer" 
          />
          {renderMiddleStatusBar()}
          <Image 
            src={rightIcon} 
            alt="rightIcon" 
            onClick={() => handleStatusChange("right")} 
            className="hover:cursor-pointer" 
          />
        </div>
      </div>

      {/* Right Panel - Chat Interface */}
      <div className="flex flex-col w-[40%] bg-rightpanel rounded-xl p-4 h-full overflow-auto">
        {/* Messages display area */}
        <div className="flex-1 overflow-y-auto mb-4 flex flex-col gap-3">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>Mesaj gönderek konuşmaya başlayın</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div 
                  className={`inline-block p-3 rounded-lg max-w-[80%] ${
                    message.role === 'user' 
                      ? 'bg-chatcolor text-white rounded-br-none' 
                      : 'bg-leftpanel text-rightpanel rounded-bl-none'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))
          )}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="text-left mb-2">
              <div className="inline-block p-3 rounded-lg bg-leftpanel rounded-bl-none">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input area */}
        <div className="flex flex-col w-full bg-leftpanel rounded-xl">
          <form onSubmit={handleSend} className="flex flex-col w-full">
            <label htmlFor="conversation-input"></label>
            <input 
              id="conversation-input"
              type="text" 
              className="focus:outline-none w-full px-4 py-2 text-rightpanel bg-transparent"
              value={input}
              onChange={handleInputChange}
              autoComplete="off"
              placeholder="Mesaj girin..."
            />
            <button 
              type="submit"
              className="bg-rightpanel ml-auto rounded-xl px-4 py-2 m-2 hover:cursor-pointer"
              disabled={isLoading}
            >
              Gönder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
