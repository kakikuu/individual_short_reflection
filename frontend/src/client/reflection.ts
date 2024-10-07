import type { Reflection } from "../types/reflection";

export const fetchReflectionContents = async (userId: string) => {
  try {
    const response = await fetch(`http://localhost:3000/reflection`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    });
    if (!response.ok) {
      const errorData = await response.text();
      return {
        success: false,
        message: errorData,
      };
    }

    const result = await response.json();
    console.log("result", result);
    return {
      success: true,
      data: result,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "ネットワークエラーです",
    };
  }
};

export const createReflection = async (contents: Reflection) => {
  try {
    const response = await fetch(`http://localhost:3000/reflection/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contents),
    });
    if (!response.ok) {
      const errorData = await response.text();
      console.log("errorData", errorData);
      return {
        success: false,
        message: errorData,
      };
    }
    const result = await response.json();
    console.log("result", result);
    return {
      success: true,
      data: result,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "ネットワークエラーです",
    };
  }
};