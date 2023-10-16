"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const [passwordShown, setPasswordShown] = React.useState(false);

    return (
      <div className='relative'>
        <Input
          type={passwordShown ? "text" : "password"}
          placeholder='Enter your password'
          ref={ref}
          {...props}
        />
        <Button
          type='button'
          aria-label={passwordShown ? "Hide password" : "Show password"}
          onClick={() => setPasswordShown((state) => !state)}
          size='icon'
          variant='ghost'
          className='absolute top-1 right-1 h-7 w-7'
        >
          {passwordShown ? <EyeClosedIcon /> : <EyeOpenIcon />}
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
