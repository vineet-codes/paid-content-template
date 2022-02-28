import initStripe from "stripe"
import { getServiceSupabase } from "../../utils/supabase"

const handler = async (req,res) => {

  if(req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET){
    return res.status(401).send("You are not authorised to call this API")
  }

  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

  const customer = await stripe.customers.create({
    email: req.body.record.email,
  });

  const supabase = getServiceSupabase();

  const resp = await supabase
    .from("profile")
    .update({
      stripe_customer: customer.id,
    })
    .eq("id", req.body.record.id);

  console.log("data: ",resp)

  res.send({ message: `stripe customer created: ${customer.id}` });
}

export default handler

// https://tvqgzdvlfdoysxrukyyb.supabase.co/rest/v1/profile?id=eq.7617bf83-c203-4b2b-860b-26baa264e9e4