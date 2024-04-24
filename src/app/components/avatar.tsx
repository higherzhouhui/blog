import { auth, signIn, signOut } from "@/auth"
 
export default async function UserAvatar() {
  const session = await auth()
  const handleSingOrOut = async () => {
    "use server"
    if (session?.user.image) {
      await signOut()
    } else {
      await signIn("github")
    }
  }
  return (
    <form
    action={handleSingOrOut}
  >
    <button type="submit">{
      session?.user.image ? 'signOut with GitHub' : 'signIn with GitHub'
    }</button>
    {/* <img src={session?.user?.image} alt="User Avatar" /> */}
  </form>
  )
}