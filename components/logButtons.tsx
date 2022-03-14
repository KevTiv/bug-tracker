import { useRouter } from 'next/router'
import supabase from '../supabaseLib'
import fnt from '../styles/Fonts.module.scss'
const Login = () => {
  const handleGitHubLogin = async () => { 
    try {
      let { user, error } = await supabase.auth.signIn({
        provider: 'github'
      });
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <button onClick={()=>handleGitHubLogin()}>Sign In with GitHub</button>
    </>
  )
}

const Logout = () => {
  const router = useRouter();
  const handleSignOut = async()=>{
    await supabase.auth.signOut()
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const body = JSON.stringify({ event, session })
        const headers = new Headers({ 'Content-Type': 'application/json' })
        fetch('/api/auth', {
          method: 'post',
          body,
          headers,
          credentials: 'same-origin',
        }).finally(() => router.push('/'))
      }
    )
    return () => {authListener!.unsubscribe()}
  }
  const LogoutSVG=()=>{return <svg className='mx-1' xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2rem" height="2rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8c-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9a353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8c47.9 0 94.3 9.3 137.9 27.8c42.2 17.8 80.1 43.4 112.7 75.9c7.9 7.9 15.3 16.1 22.4 24.5c3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82C271.7 82.6 79.6 277.1 82 516.4C84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7c3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z"/></svg>}

  return (
    <>
      <button className={`${fnt.title__font} mx-2 px-2 flex `} onClick={()=> handleSignOut() }> <LogoutSVG/>Sign Out</button>
    </>
  )
}
export { Login, Logout }