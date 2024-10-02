// api.js

export const checkIfUserHasBasicPlan = async (email: string) => {
  try {
    console.log("checking user plan");
    const response = await fetch(`${process.env.API}/checkPlan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Failed to check user plan");
    }

    const data = await response.json();
    console.log(data.hasBasicPlan + " has basic plan");
    return data.hasBasicPlan; // Adjust this based on your API response structure
  } catch (error: any) {
    console.error(`Error checking user's plan: ${error.message}`);
    return false;
  }
};

// api.js

export const updateUserPlan = async (email: string, plan: string) => {
  try {
    const response = await fetch(`${process.env.API}/updateUserPlan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, plan }),
    });

    if (!response.ok) {
      throw new Error("Failed to update plan");
    }

    const data = await response.json();
    console.log(data.success + " plan updated");
    return data.success; // Return the data to handle success outside the function
  } catch (error: any) {
    console.error(`Error updating plan: ${error.message}`);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
