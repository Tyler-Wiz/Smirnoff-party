"use client";

import { FC, useState } from "react";
import Input from "../shared/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/validator/RegisterSchema";
import { useRouter } from "next/navigation";
import styles from "@/components/styles/AuthForm.module.css";
import axios from "axios";

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
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: FormData, e: any) => {
    delete data.confirmEmail;
    try {
      setLoading(true);
      if (!agreeTerms) {
        setSubmitError("You must agree to the terms and conditions");
        setLoading(false);
        return;
      } else {
        setSubmitError("");
      }
      const res = await axios.post(`http://localhost:4000/auth/register`, data);
      if (res.status === 200) {
        setLoading(false);
        router.push("/success");
        e.target.reset();
      }
    } catch (error: any) {
      setLoading(false);
      setServerError(error.response.data.errorMessage);
    }
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
      {serverError && <p className={styles.error}>{serverError}</p>}
      <div className={styles.buttonContainer}>
        <button type="submit">{loading ? "Loading..." : "Book Now"}</button>
      </div>
    </form>
  );
};

export default AuthForm;
