import { config } from '../config/env.js';

async function subscribeMailchimp(email) {
  const { apiKey, listId, serverPrefix } = config.mailchimp;
  if (!apiKey || !listId) return null;

  const dc = serverPrefix || apiKey.split('-').pop();
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `apikey ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: email,
      status: 'subscribed',
    }),
  });

  if (response.ok) return { provider: 'mailchimp' };

  const body = await response.json().catch(() => ({}));
  if (response.status === 400 && body.title === 'Member Exists') {
    return { provider: 'mailchimp', alreadySubscribed: true };
  }

  throw new Error(body.detail || body.title || 'Mailchimp subscription failed');
}

async function subscribeButtondown(email) {
  const { apiKey } = config.buttondown;
  if (!apiKey) return null;

  const response = await fetch('https://api.buttondown.email/v1/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Token ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email_address: email }),
  });

  if (response.ok) return { provider: 'buttondown' };

  const body = await response.json().catch(() => ({}));
  if (response.status === 409) {
    return { provider: 'buttondown', alreadySubscribed: true };
  }

  throw new Error(body.detail || 'Buttondown subscription failed');
}

export async function subscribeToExternalProvider(email) {
  if (config.buttondown.apiKey) {
    return subscribeButtondown(email);
  }
  if (config.mailchimp.apiKey && config.mailchimp.listId) {
    return subscribeMailchimp(email);
  }
  return null;
}
