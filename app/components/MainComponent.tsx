"use client";

import { ApiResponse } from "../types/responseTypes";
import { useState } from "react";

export default function MainComponent() {

  const inputString = "hi there bitch how are you?";
  // state variables
  // const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);

  // event handler functions
  const getRequestHandler = async() => {
    setIsLoading(true);
    // setError(null);
    // setData(null);

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok) {
        const errorData = await response.json();
        return {
          error:
            errorData.error ||
            `API request failed with status ${response.status}`,
        };
      }

      console.log("Data fetched on server: ", data);
      return data as ApiResponse;
    } catch (error) {
      console.error("handleGetRequest error: ", error);
      return { error: error || "Failed to fetch data." };
    } finally {
      setIsLoading(false);
    }
  };

  const postRequestHandler = async() => {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: inputString,
      })

      if (!response.ok) {
        return {
          error: `API request failed with status ${response.status}`,
        };
      }

      const data = await response.json();
      console.log("Chat returned this: ", data);
      return data
    } catch (error) {
      console.error("handleGetRequest error: ", error);
      return { error: error || "Failed to fetch data." };
    }
  }

  return (
    <div className="flex flex-row justify-between w-full h-screen p-8 gap-5">
      <div className="flex flex-col w-2/3 bg-leftpanel rounded-xl p-4 h-full overflow-auto">
        <button
          className="bg-rightpanel w-1/5 text-center rounded-md p-4 hover:cursor-pointer" 
          onClick={getRequestHandler} disabled={isLoading}
        >
          { isLoading ? "Loading..." : "Fetch Post #1" }
        </button>
      </div>
      <div className="flex flex-col w-1/3 bg-rightpanel rounded-xl p-4 h-full overflow-auto">
        <button className="bg-leftpanel text-rightpanel rounded-xl p-4 hover:cursor-pointer" onClick={postRequestHandler}>Click Me: Simulate Chat Send Button</button>
      </div>
    </div>
  );
}
