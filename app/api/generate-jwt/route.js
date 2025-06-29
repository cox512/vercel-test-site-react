import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const { user_id, email, ...otherAttributes } = await request.json();

    // Validate required fields
    if (!user_id) {
      return Response.json({ error: "user_id is required" }, { status: 400 });
    }

    // Get the API secret from environment variables
    const apiSecret = process.env.INTERCOM_JSON_SECRET;
    if (!apiSecret) {
      return Response.json(
        { error: "INTERCOM_JSON_SECRET not configured" },
        { status: 500 }
      );
    }

    // Create the JWT payload
    const payload = {
      user_id: user_id,
      ...(email && { email }),
      ...otherAttributes, // Include any other sensitive attributes passed in
    };

    // Generate the JWT token
    const token = jwt.sign(payload, apiSecret, { expiresIn: "1h" });

    return Response.json({
      token,
      expires_in: 3600, // 1 hour in seconds
    });
  } catch (error) {
    console.error("Error generating JWT:", error);
    return Response.json(
      { error: "Failed to generate JWT token" },
      { status: 500 }
    );
  }
}
