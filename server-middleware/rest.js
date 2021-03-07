import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import { createClient } from '@supabase/supabase-js';

const app = express();

const URL = process.env.NUXT_ENV_SUPABASE_URL;
const KEY = process.env.NUXT_ENV_SUPABASE_KEY;

const supabase = createClient(URL, KEY);

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/auth', async (req, res) => {
  console.log('New auth request');
  await supabase.auth.api.setAuthCookie(req, res);
});

app.post('/user', async (req, res) => {
  try {
    console.log('get user request');
    const user = await supabase.auth.api.getUserByCookie(req);
    res.json(user);
  } catch (error) {
    console.error('Error: ', error);
    res
      .status(500)
      .send('Failed to get user');
  }
});

module.exports = app;
