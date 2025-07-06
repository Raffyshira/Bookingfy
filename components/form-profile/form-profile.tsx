"use client";
import { useState, useEffect, useId } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import CalendarBirth from "./date-birth-picker";
import PhoneInputComp from "./phone-input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { CheckboxPolicy } from "./checkbox-policy";

export function FormProfile({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [gender, setGender] = useState("Male");
  const router = useRouter();
  const id = useId();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return router.replace("/auth/login");
      setUserId(data.user.id);
    });
  }, [router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const supabase = createClient();

    const formData = new FormData(e.target);
    const { error } = await supabase.from("profiles").insert({
      id: userId,
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      phone_number: formData.get("phone_number"),
      birth_date: formData.get("birth_date"),
      gender: formData.get("gender"),
    });

    if (error) setError(error.message);
    else router.replace("/");
  };

  if (!userId) return <p>Loading...</p>;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-background w-[32rem] mx-auto border-none">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>
            Complete Your Profile to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="last_name">First Name</Label>
                <Input id="first_name" name="first_name" type="text" required />
              </div>
              <div className="grid gap-3">
                <Label aria-required="true" htmlFor="last_name">
                  Last Name
                </Label>
                <Input id="last_name" name="last_name" type="text" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="gender">Gender</Label>
                <RadioGroup
                  className="flex items-center"
                  id="gender"
                  defaultValue="Male"
                  value={gender}
                  onValueChange={setGender}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="Male" id="r1" />
                    <Label htmlFor="r1">Male</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="Female" id="r2" />
                    <Label htmlFor="r2">Female</Label>
                  </div>
                </RadioGroup>
                <input type="hidden" name="gender" value={gender} />
              </div>
              <div className="grid gap-3">
                <PhoneInputComp />
              </div>
              <div className="grid gap-3">
                <CalendarBirth />
              </div>
              <Separator dir="horizontal" />
              <CheckboxPolicy />
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Simpan
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
