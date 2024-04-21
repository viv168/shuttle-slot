import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Database, open } from "sqlite"
import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";
import { User } from "./common";

const secretKey = "shuttleslot";
const key = new TextEncoder().encode(secretKey);

export async function loadDB() {
  const db = await open({
    filename: "./data.db",
    driver: sqlite3.Database
  });
  return db;
}

export async function offLoadDB(db: Database<sqlite3.Database, sqlite3.Statement>) {
  db.run("COMMIT");
  db.close();
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30 days from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function signup(formData: FormData) {
  try {
    const email = formData.get("email")?.toString() ?? "";
    const first_name = formData.get("first_name")?.toString() ?? "";
    const last_name = formData.get("last_name")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    const saltRounds = 10;
    const pwd_hash = await bcrypt.hash(password, saltRounds);

    const db = await loadDB();

    const userInsertSql = `INSERT INTO user(email, pwd_hash, first_name, last_name) VALUES (?, ?, ?, ?)`;
    const userData = [email, pwd_hash, first_name, last_name];

    await db.run(userInsertSql, userData);
    console.log("User inserted successfully.");

    await db.close();

  } catch (error) {
    console.error("Error signing up:", error);
  }
}

export async function login(formData: FormData) {
  try {
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    const db = await loadDB();

    const user: User | undefined = await db.get("SELECT * FROM user WHERE email = ?", email);

    if (!user) {
      console.error("User not found.");
      return false;
    }

    const passwordMatch = await bcrypt.compare(password, user.pwd_hash);

    if (!passwordMatch) {
      console.error("Incorrect password.");
      return false;
    }

    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ user: { email: user.email, first_name: user.first_name, last_name: user.last_name }, expires });

    cookies().set("session", session, { expires, httpOnly: true });

    await db.close();

    return true;

  } catch (error) {
    console.error("Error logging in:", error);
    return false;
  }
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) {
    return null;
  }
  return await decrypt(session);
}
