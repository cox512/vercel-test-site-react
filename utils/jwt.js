/**
 * Fetch a JWT token from the serverless function
 * @param {Object} userData - User data to include in the JWT payload
 * @param {string} userData.user_id - Required user ID
 * @param {string} [userData.email] - Optional email
 * @param {Object} [userData.otherAttributes] - Other sensitive attributes
 * @returns {Promise<string|null>} JWT token or null if failed
 */
export async function fetchJWT(userData) {
  try {
    const response = await fetch("/api/generate-jwt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("JWT generation failed:", errorData.error);
      return null;
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Error fetching JWT:", error);
    return null;
  }
}

/**
 * Add JWT to boot/update data if user_id is present
 * @param {Object} bootData - The boot/update data object
 * @returns {Promise<Object>} Updated boot data with JWT
 */
export async function addJWTToBootData(bootData) {
  // Only generate JWT if user_id is present
  if (!bootData.user_id) {
    console.warn("No user_id found, skipping JWT generation");
    return bootData;
  }

  const userData = {
    user_id: bootData.user_id,
    ...(bootData.email && { email: bootData.email }),
    // Add any other sensitive attributes here if needed
  };

  const jwt = await fetchJWT(userData);

  if (jwt) {
    return {
      ...bootData,
      intercom_user_jwt: jwt,
    };
  } else {
    console.warn("JWT generation failed, proceeding without JWT");
    return bootData;
  }
}

/**
 * Add JWT to update data if there's a currently authenticated user
 * For update calls, we need to try to get the current user data from Intercom
 * @param {Object} updateData - The update data object
 * @param {Object} [currentUserData] - Current user data if available
 * @returns {Promise<Object>} Updated data with JWT if possible
 */
export async function addJWTToUpdateData(updateData, currentUserData = null) {
  // If no current user data and no user_id in update data, proceed without JWT
  if (!currentUserData && !updateData.user_id) {
    console.warn("No user data available for JWT generation in update call");
    return updateData;
  }

  // Use user data from current user or update data
  const userData = currentUserData || {
    user_id: updateData.user_id,
    ...(updateData.email && { email: updateData.email }),
  };

  // Only proceed if we have a user_id
  if (!userData.user_id) {
    console.warn("No user_id available, skipping JWT generation for update");
    return updateData;
  }

  const jwt = await fetchJWT(userData);

  if (jwt) {
    return {
      ...updateData,
      intercom_user_jwt: jwt,
    };
  } else {
    console.warn("JWT generation failed for update, proceeding without JWT");
    return updateData;
  }
}
