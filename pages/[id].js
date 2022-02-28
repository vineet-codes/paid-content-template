import { useState, useEffect } from "react"
import Video from "react-player"

import { supabase } from "../utils/supabase"

const LessonDetails = ({lesson}) => {

  const [videoURL, setVideoURL] = useState() 

  const getPremiumContent = async () => {
    const {data, error} = await supabase.from("premium_content").select("video_url").eq("id", lesson.id).single();

    setVideoURL(data?.video_url);
  }

  useEffect(() => {
    getPremiumContent();
  }, []);

  console.log(lesson);
  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-2">
      <h1 className="text-3xl mb-4">{lesson.title}</h1>
      <p className="mb-8">{lesson.description}</p>
      {videoURL && <Video url={videoURL} width="100%"/>}
    </div>)
}

export const getStaticPaths = async () => {
  const { data: lessons, error } = await supabase.from('lesson').select('id')

  const paths = lessons.map(({id}) => ({
    params: {
      id: id.toString()
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({params: {id}}) => {
  const { data:lesson, error } = await supabase.from('lesson').select('*').eq('id', id).single();

  return {
    props: {
      lesson
    }
  }
}

export default LessonDetails;