import { auth } from "@/auth";
import Link from "next/link";

export default async function Home() {
  let session = await auth();

  return (
    <div>
      <pre>
        <code>{JSON.stringify(session, null, 4)}</code>
      </pre>

      {session ? (
        <Link href="/api/auth/signout">Sign Out</Link>
      ) : (
        <Link href="/api/auth/signin">Sign In</Link>
      )}
    </div>
  );
}
