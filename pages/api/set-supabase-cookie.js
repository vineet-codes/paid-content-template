import { supabase } from "../../utils/supabase";

const handler = async (req, res) => {
  console.log('cookie set');
  await supabase.auth.api.setAuthCookie(req, res);
}

export default handler;