export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json({
    functions: [{
      name: 'send_direct_mail',
      description: 'Activates high-value Three Cats Coffee customers for a direct mail campaign. Sends a personalized postcard with a unique SALBxx voucher code to each high-value converter.',
      parameters: [
        { name: 'campaign_name', type: 'string', description: 'Name of the campaign e.g. dm_tcc_hv_spring_2026', required: true },
        { name: 'segment_data', type: 'string', description: 'JSON array of customer records with name, address, and voucher_code fields', required: true },
        { name: 'mail_type', type: 'string', description: 'postcards, letters, or self_mailers. Default: postcards', required: false }
      ],
      endpoint: '/api/send-direct-mail',
      http_method: 'POST',
      auth_requirements: []
    }]
  });
}
