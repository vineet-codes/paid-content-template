import { useEffect } from "react"
import { useUser } from "./../context/user"


export default function Logout() {

  const { logout } = useUser();

  useEffect (logout, []);

  return (
    <div>
      <p>Loggin out.......</p>
    </div>
  )
}