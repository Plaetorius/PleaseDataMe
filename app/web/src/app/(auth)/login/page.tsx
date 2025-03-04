import { LoginForm } from "@/components/forms/login-form"
import { signIn } from "@/auth"

export default function LoginPage() {
  return (
    <form
    action={async () => {
      "use server"
      await signIn("github")
    }}
  >
    <button type="submit">Signin with GitHub</button>
  </form>
    // <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
    //   <div className="w-full max-w-sm md:max-w-3xl">
    //     <LoginForm />
    //   </div>
    // </div>
  )
}
