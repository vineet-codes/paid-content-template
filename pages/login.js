import { useEffect } from "react"
import { useUser } from "./../context/user"
import { supabase } from "../utils/supabase"

export default function Login() {

  const { login } = useUser();

  useEffect (login, []);

  return (
    <div>
      <p>Loggin in.......</p>
    </div>
  )
}