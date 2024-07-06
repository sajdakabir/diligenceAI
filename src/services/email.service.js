import { google } from 'googleapis';
import cheerio from 'cheerio';

export const listMessages = async (auth) => {
  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.messages.list({
    userId: 'me',
    q: 'label:pitches is:unread',
  });
  const messages = res.data.messages || [];
  return messages;
};

const findPlainTextPart = (parts) => {
  if (!parts) return null;
  for (const part of parts) {
    if (part.mimeType === 'text/plain') {
      return part.body.data;
    }
    if (part.parts) {
      const found = findPlainTextPart(part.parts);
      if (found) return found;
    }
  }
  return null;
};

export const getMessageContent = async (auth, messageId) => {
  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.messages.get({ userId: 'me', id: messageId });

  const payload = res.data.payload;
  const parts = payload.parts || [];
  const data = findPlainTextPart(parts);
  
  if (!data) {
    throw new Error('No plain text email body found');
  }
  
  const emailBody = Buffer.from(data, 'base64').toString('utf-8');
  const attachments = parts.filter(part => part.filename).map(part => part.filename);
  
  const fromHeader = payload.headers.find(header => header.name === 'From').value;
  const senderEmail = fromHeader.match(/<(.*?)>/)[1]; // Extract email within the angle brackets

  return { emailBody, attachments, senderEmail };
};


export const summarizeEmailContent = async (content) => {
  // Implement OpenAI API call to summarize email content
  console.log("i am working");
};

export const extractLinks = (content) => {
  const $ = cheerio.load(content);
  const links = [];
  $('a').each((i, link) => {
    links.push($(link).attr('href'));
  });
  return links;
};
