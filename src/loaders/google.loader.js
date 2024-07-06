import { google } from 'googleapis';
import { OAuth2 } from google.auth;
import { environment } from './environment.loder.js';

const oAuth2Client = new OAuth2(environment.GOOGLE_CLIENT_ID, environment.GOOGLE_CLIENT_SECRET, environment.GOOGLE_REDIRECT_URL);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

async function listMessages() {
  const res = await gmail.users.messages.list({ userId: 'me', maxResults: 10 });
  const messages = res.data.messages;
  return messages;
}
