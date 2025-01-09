import fs from 'fs';
import { DB_PATH } from '../utils/constants.js';

export const manageSubscription = (req, res) => {
  const { email, action } = req.body;
  if (!email || !['add', 'remove'].includes(action)) return res.status(400).send('Invalid data');

  const subscribers = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  if (action === 'add' && !subscribers.includes(email)) {
    subscribers.push(email);
  } else if (action === 'remove') {
    const index = subscribers.indexOf(email);
    if (index !== -1) subscribers.splice(index, 1);
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(subscribers, null, 2));
  res.send(`Email ${action === 'add' ? 'added' : 'removed'} successfully.`);
};
