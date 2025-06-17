import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Suspense } from "react";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
    title: "Sign Up – MODEXVPN",
    description: "Create your MODEXVPN account and get early access to next-gen privacy. Join now to secure your digital freedom.",
    keywords: [
    "MODEXVPN signup",
    "VPN sign up",
    "secure VPN",
    "join MODEXVPN",
    "private internet access",
    "VPN early access",
    ],
    openGraph: {
        title: "Sign Up – MODEXVPN",
        description: "Create your MODEXVPN account and get early access to next-gen privacy.",
        url: "https://mode.com/sign-up",
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
        title: "Sign Up – MODEXVPN",
        description: "Join MODEXVPN today for faster, safer, and more private browsing.",
        images: ["https://modexvpn.com/mvpn.png"],
    },
};


export default async function SignUpPage() {
    const session = await auth.api.getSession({ headers: await headers()})

    if (session) {
        redirect("/dashboard") 
    }

    return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 text-black">
        <div className="w-full max-w-sm space-y-6">
            <div>
                <div className="flex justify-center mb-4">
                    <Image className="mb-4" src="/mvpn.png" alt="MODEXVPN Logo" width={75} height={60} />
                </div>
                <h1 className="text-2xl font-bold">Create your account</h1>
                <h2 className="text-sm text-gray-500">Get early access to MODEXVPN and reclaim your privacy.</h2>
            </div>
            <Suspense fallback={null}>
                <SignUpForm />
            </Suspense>
            <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/sign-in" className="underline">
                    Sign in
                </Link>
            </p>
        </div>
    </div>
    );
}