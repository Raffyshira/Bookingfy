"use client";

import { useId } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export function CheckboxPolicy() {
  const id = useId();
  return (
    <>
      <div className="grid gap-4">
        <div className="flex items-start gap-3">
          <Checkbox id={id} />
          <Label className="leading-relaxed -mt-1" htmlFor={id}>
            Saya telah membaca dan menyetujui
            <a
              className="underline mx-0.5 text-blue-600 hover:text-blue-800"
              href="https://originui.com"
              target="_blank"
            >
              Syarat dan Ketentuan
            </a>
            dan
            <a
              className="underline mx-0.5 text-blue-600 hover:text-blue-800"
              href="https://originui.com"
              target="_blank"
            >
              Kebijakan Privasi
            </a>
            di Bookingfy
          </Label>
        </div>
        <div className="grid gap-3">
          <div className="flex items-start  gap-3">
            <Checkbox id={id} />
            <Label htmlFor={id} className="leading-relaxed -mt-1">
              Saya telah membaca dan memberikan persetujuan kepada Bookingfy
              untuk memproses data pribadi saya sesuai dengan
              <a
                className="underline mx-0.5 text-blue-600 hover:text-blue-800"
                href="https://originui.com"
                target="_blank"
              >
                Pemrosesan Data Pribadi
              </a>
            </Label>
          </div>
        </div>
        <div className="grid gap-3">
          <div className="flex items-center gap-3">
            <Checkbox defaultChecked id={id} />
            <Label htmlFor={id} className="leading-relaxed -mt-1">
              Saya bersedia menerima informasi terkini terkait event dan promosi
              di Bookingfy
            </Label>
          </div>
        </div>
      </div>
    </>
  );
}
