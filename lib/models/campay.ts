// Campay SDK — prêt pour quand vous aurez les identifiants

const BASE_URL = process.env.CAMPAY_BASE_URL || 'https://campay.net/api';
const USERNAME = process.env.CAMPAY_USERNAME || '';
const PASSWORD = process.env.CAMPAY_PASSWORD || '';

let tokenCache: { token: string; expires: number } | null = null;

export async function getCampayToken(): Promise<string> {
  if (tokenCache && tokenCache.expires > Date.now()) {
    return tokenCache.token;
  }

  if (!USERNAME || !PASSWORD) {
    throw new Error('CAMPAY_USERNAME et CAMPAY_PASSWORD ne sont pas configurés');
  }

  const res = await fetch(`${BASE_URL}/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: USERNAME, password: PASSWORD }),
  });

  const data = await res.json();
  
  if (!data.token) {
    throw new Error('Erreur d\'authentification Campay: ' + JSON.stringify(data));
  }

  tokenCache = { token: data.token, expires: Date.now() + 3600000 }; // 1h
  return data.token;
}

export async function initiatePayment({
  amount,
  phone,
  description,
  externalReference,
}: {
  amount: number;
  phone: string;
  description: string;
  externalReference: string;
}) {
  const token = await getCampayToken();

  const res = await fetch(`${BASE_URL}/collect/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      amount,
      from: phone,
      description,
      external_reference: externalReference,
    }),
  });

  return res.json();
}

export async function getPaymentStatus(reference: string) {
  const token = await getCampayToken();

  const res = await fetch(`${BASE_URL}/transaction/${reference}/`, {
    headers: { Authorization: `Token ${token}` },
  });

  return res.json();
                    }
