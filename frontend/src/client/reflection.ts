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

export const fetchAReflection = async (
  userId: string,
  reflectionId: number
) => {
  try {
    const response = await fetch(
      `http://localhost:3000/user/${userId}/reflection/${reflectionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.text();
      console.log("errorData", errorData);
      return {
        success: false,
        message: errorData,
      };
    }

    const result = await response.json();
    const convertResult: Reflection = {
      id: result[0].id,
      userId: result[0].user_id,
      title: result[0].title,
      whatMiss: result[0].what_miss,
      whyMiss: result[0].why_miss,
      preventMiss: result[0].prevent_miss,
      createdAt: result[0].created_at,
    };
    return {
      success: true,
      data: convertResult,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "ネットワークエラーです",
    };
  }
};
