import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import clientPromise from "@/lib/mongodb";

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const name = body.name?.trim();
    const email = body.email
      ?.trim()
      .toLowerCase();
    const password = body.password;

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          message:
            "Name, email and password are required.",
        },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        {
          message:
            "Password must be at least 8 characters.",
        },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          message:
            "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;

    const db = client.db("fabrice");

    const users = db.collection("users");

    // Check if user already exists
    const existingUser =
      await users.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          message:
            "An account with this email already exists.",
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(password, 12);

    // Create user
    const result = await users.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      {
        message:
          "Account created successfully.",
        userId: result.insertedId.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Registration error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}