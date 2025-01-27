import { SignupForm } from "../_components/Form";

type Props = {};

export default function SignUp({}: Props) {
  return (
  <div className="flex flex-col items-center justify-center w-screen h-screen">
    <SignupForm />
  </div>
  )
}
