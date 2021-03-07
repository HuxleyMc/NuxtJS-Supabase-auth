import { createClient } from '@supabase/supabase-js';

export default (context, inject) => {
  const URL = process.env.NUXT_ENV_SUPABASE_URL;
  const KEY = process.env.NUXT_ENV_SUPABASE_KEY;
  const supabase = createClient(URL, KEY);
  inject('supabase', supabase);
};
