import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-2xl">
                Thank you for signing up!
              </CardTitle>
              <CardDescription className="text-foreground">
                Check your email to confirm
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base text-foreground">
                You&apos;ve successfulmutedly signed up. Please check your email
                to confirm your account before signing in.
              </p>
              <Button asChild className="w-full mt-3.5">
                <Link className="font-semibold" href="/auth/login">
                  Halaman Login
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
