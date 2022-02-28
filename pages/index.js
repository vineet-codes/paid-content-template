import Link from "next/link";
import { supabase } from "../utils/supabase"

import { useUser } from "../context/user";


export default function Home ({lessons }) { 
  const { user } = useUser();
  console.log('user: ',user)
  
  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-2">
      {lessons.map(lesson => (
        <Link key={lesson.id} href={`/${lesson.id}`}>
          <a className="p-8 h-40 mb-8 rounded shadow text-xl flex">{lesson.title}</a>
        </Link>
      ))}
    </div>
  )
}

export const getStaticProps = async () => {
  const { data: lessons, error } = await supabase.from('lesson').select('*')

  return {
    props : {
      lessons
    }
  }
}