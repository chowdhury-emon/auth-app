'use client'

import { signOut, useSession } from "@/lib/auth-client";
import { Button, toast } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { data, isPending } = useSession();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Log out successfully!");
                    router.push('/sign-in');
                }
            }
        })
    }

    return (
        <div className="font-bold py-4 flex justify-between ">
            <Link href={"/"}>
                <h1 className="text-2xl">Learn BetterAuth</h1>
            </Link>

            {
            // !isPending &&
                data ? (
                <>
                    <nav className="flex gap-2 text-sm">
                        <Link className="nav-btn" href={"/"}>Home</Link>
                        <Link className="nav-btn" href={"/setup"}>Setup</Link>
                    </nav>


                    <div className="flex items-center gap-2">
                        <h2 className="capitalize ">{data.user.name}</h2>

                        <Button variant="ghost" onPress={handleSignOut} > Sign Out </Button>
                    </div>
                </>
            ) : (
                <nav className={`${data ? 'hidden' : 'flex'} gap-2 text-sm`}>
                    <Link href={'/sign-up'}>
                        <Button variant="secondary" className="text-stone-50">Sign Up</Button>
                    </Link>
                    <Link href={'/sign-in'}>
                        <Button>Sign In</Button>
                    </Link>
                </nav>
            )
            }
        </div>
    )
}