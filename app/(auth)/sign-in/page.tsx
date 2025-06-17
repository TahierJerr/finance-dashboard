import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { SignInForm } from "@/components/auth/sign-in-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Sign In – MODEXVPN",
    description: "Access your MODEXVPN account and take control of your online privacy. Fast, secure, and simple login.",
    keywords: [
    "MODEXVPN login",
    "VPN sign in",
    "secure VPN access",
    "login to VPN",
    "private internet access",
    "VPN dashboard",
    ],
    openGraph: {
        title: "Sign In – MODEXVPN",
        description: "Access your MODEXVPN account and stay protected online.",
        url: "https://modexvpn.com/sign-in",
        siteName: "MODEXVPN",
        images: [
        {
            url: "https://modexvpn.com/mvpn.png",
            width: 1200,
            height: 630,
            alt: "MODEXVPN",
        },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Sign In – MODEXVPN",
        description: "Log in to your MODEXVPN account and stay in control of your digital freedom.",
        images: ["https://modexvpn.com/mvpn.png"],
    },
};


export default async function SignInPage() {
    const session = await auth.api.getSession({ headers: await headers()})

    if (session) {
        redirect("/dashboard") 
    }

    return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 text-black">
        <div className="w-full max-w-sm space-y-6">
            <div className="flex justify-center mb-4">
                <Image className="mb-4" src="/mvpn.png" alt="MODEXVPN Logo" width={75} height={60} />
            </div>
            <div>
                <h1 className="text-2xl font-bold">Welcome back</h1>
            </div>
            <SignInForm />
            <p className="text-center text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="underline">
                    Sign up
                </Link>
            </p>
        </div>
    </div>
    );
}