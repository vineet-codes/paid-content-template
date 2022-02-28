import { supabase } from "../../utils/supabase"
import initStripe from "stripe"
import cookie from "cookie"

const handler = async (req, res) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if(!user) {
    return res.status(401).send('Unauthorized');
  }

  const token = cookie.parse(req.headers.cookie)["sb-access-token"];

  supabase.auth.session = () => ({
    access_token: token,
  })

  const {
    data: { stripe_customer },
  } = await supabase
    .from("profile")
    .select("stripe_customer")
    .eq("id", user.id)
    .single();


  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

  console.log(`Stripe Customer: ${stripe_customer}`);

  const session = await stripe.billingPortal.sessions.create({
    customer: stripe_customer,
    return_url: "http://localhost:3000/dashboard",
  });

  res.send({
    url: session.url,
  })
}

export default handler;