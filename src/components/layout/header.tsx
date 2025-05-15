import { SignInButton } from "@clerk/nextjs";
import { SignUpButton } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";


export function Header() {

    return (
        <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
                <SignInButton />
                <SignUpButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </header>
    )
}