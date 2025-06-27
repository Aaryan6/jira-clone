import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createClient } from "@/utils/supabase/server";
import { signInSchema, signUpSchema } from "../schemas";

const app = new Hono()
  .get("/user", async (c) => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return c.json({ error: error.message, success: false }, 500);
    }
    return c.json({ data, success: true });
  })
  .post("/register", zValidator("json", signUpSchema), async (c) => {
    const { name, email, password } = c.req.valid("json");
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (error) {
      return c.json({ error: error.message, success: false }, 500);
    }
    if (!data.user) {
      return c.json({ error: "Invalid credentials", success: false }, 401);
    }

    return c.json({
      message: "Sign up successful",
      success: true,
      error: null,
    });
  })
  .post("/login", zValidator("json", signInSchema), async (c) => {
    const { email, password } = c.req.valid("json");
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return c.json({ error: error.message, success: false }, 500);
    }
    if (!data.user) {
      return c.json({ error: "Invalid credentials", success: false }, 401);
    }

    return c.json({
      message: "Sign in successful",
      success: true,
      error: null,
    });
  })
  .post("/logout", async (c) => {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      return c.json({ error: error.message, success: false }, 500);
    }
    return c.json({ message: "Sign out successful", success: true });
  });

export default app;
