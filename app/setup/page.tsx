import Code from "@/components/Code/Code";

export default function SetupPage() {
  return (
    <section className="w-full max-w-4xl mx-auto p-6 text-stone-300 min-h-screen">

      <details open>
        <summary className="text-2xl font-bold mb-6 text-stone-100">
          Better-Auth Setup Guide For MongoDB
        </summary>
        <ol className="list-decimal list-inside space-y-6">
          <li>
            <span>Run <code className="highlight">npm install better-auth</code></span>
          </li>

          <li>
            <span>Run <code className="highlight">npm install mongodb</code></span>
          </li>

          <li>
            <span>Run <code className="highlight">npm install @better-auth/mongo-adapter</code></span>
          </li>

          <li>
            <span>Log in to MongoDB Atlas and get your database connection string. e.g.</span>
            <p> <code className="highlight"> {`mongodb+srv://<db_user>:<db_password>@cluster0.dnjek0m.mongodb.net/?appName=Cluster0`}</code></p>
          </li>

          <li>
            <span>Create a <code className="highlight">.env</code> file and add your environment variables:</span>
            <Code language="dotenv">
              {`BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_DB_URL=your_mongodb_connection_string`}
            </Code>
          </li>

          <li>
            <span>Create <code className="highlight">lib/auth.ts</code>:</span>
            <Code language="typescript">
              {`import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL!);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: { enabled: true },
});`}
            </Code>
          </li>

          <li>
            <span>Create <code className="highlight">app/api/auth/[...all]/route.ts</code>:</span>
            <Code language="typescript">
              {`import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);`}
            </Code>
          </li>

          <li>
            <span>Create <code className="highlight">lib/auth-client.ts</code>:</span>
            <Code language="typescript">
              {`import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

export const { signIn, signUp, useSession } = createAuthClient();`}
            </Code>
          </li>

          <li>
            <span>Call <code className="highlight">signUp.email()</code> or <code className="highlight">signIn.email()</code> in your UI components.</span>
          </li>
        </ol>

      </details>




    </section >
  );
}