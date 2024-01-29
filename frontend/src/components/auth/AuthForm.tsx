"use client";

import { FC } from "react";
import Input from "../shared/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/validator/RegisterSchema";
import styles from "@/components/styles/AuthForm.module.css";

interface FormData {
  name: string;
  email: string;
  confirmEmail?: string;
  instagram: string;
}

interface AuthFormProps {
  setSubmitError: (error: string) => void;
  agreeTerms: boolean;
}

const AuthForm: FC<AuthFormProps> = ({ setSubmitError, agreeTerms }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: FormData) => {
    delete data.confirmEmail;
    if (!agreeTerms) {
      setSubmitError("You must agree to the terms and conditions");
      return;
    }
    console.log(data);
  };

  return (
    <form
      aria-label="form"
      className={styles.container}
      onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="name"
        label="name"
        type="text"
        name="name"
        register={register}
        error={errors.name?.message}
        errorLabel="name-error"
      />
      <Input
        placeholder="email"
        label="Email Address"
        type="text"
        name="email"
        register={register}
        error={errors.email?.message}
        errorLabel="email-error"
      />
      <Input
        placeholder="confirm email"
        label="Confirm Email Address"
        type="text"
        name="confirmEmail"
        register={register}
        error={errors.confirmEmail?.message}
        errorLabel="confirm-email-error"
      />
      <Input
        placeholder="@instagram"
        label="instagram handle"
        type="text"
        name="instagram"
        register={register}
        error={errors.instagram?.message}
        errorLabel="instagram-error"
      />
      <div className={styles.buttonContainer}>
        <button type="submit">Book Now</button>
      </div>
    </form>
  );
};

export default AuthForm;
