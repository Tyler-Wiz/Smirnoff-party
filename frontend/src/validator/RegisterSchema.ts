import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .matches(/^(?!.*@[^,]*,)/)
    .required(),
  confirmEmail: yup.string().oneOf([yup.ref("email")], "Email do not match"),
  instagram: yup.string().required(),
});
