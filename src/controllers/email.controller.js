import { authenticateGmail } from '../loaders/google.loader.js';
import { listMessages, getMessageContent, summarizeEmailContent, extractLinks } from '../services/email.service.js';

export const getEmails = (req, res) => {
  authenticateGmail(async (auth) => {

    try {
      const messages = await listMessages(auth);
      if (messages.length === 0) {
        return res.status(200).json({ message: 'No unread pitch emails found.' });
      }

      const emailDetails = [];
      for (let message of messages) {
        const { emailBody, attachments, senderEmail } = await getMessageContent(auth, message.id);
        const summary = await summarizeEmailContent(emailBody);
        const links = extractLinks(emailBody);
        emailDetails.push({ senderEmail, summary, attachments, links, emailBody });
      }

      res.status(200).json(emailDetails);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
