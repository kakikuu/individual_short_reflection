export const fetchReflectionTitle = async (userId: string) => {
  try {
    const response = await fetch(`http://localhost:3000/reflection`, {
      method: "GET",
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
