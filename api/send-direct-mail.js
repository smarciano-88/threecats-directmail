export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle GET for endpoint validation
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      endpoint: '/api/send-direct-mail',
      method: 'POST'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const params = req.body.parameters || req.body.arguments || req.body;
    const { campaign_name, segment_data, mail_type = 'postcards' } = params;
    const records = JSON.parse(segment_data);
    const results = [];

    records.forEach((user) => {
      const lobId = 'psc_' + Math.random().toString(36).substr(2, 12);
      const sendDate = new Date();
      sendDate.setDate(sendDate.getDate() + 2);
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 9);

      results.push({
        user_id: user.user_id,
        full_name: user.full_name,
        address: user.address_line1 + ', ' + user.city + ', ' + user.state + ' ' + user.zip,
        voucher_code: user.voucher_code,
        status: 200,
        lob_id: lobId,
        mail_type: mail_type,
        send_date: sendDate.toISOString().split('T')[0],
        expected_delivery: deliveryDate.toISOString().split('T')[0],
        message: 'Postcard with voucher ' + user.voucher_code + ' queued successfully'
      });
    });

    const delivered = results.filter(r => r.status === 200).length;

    res.status(200).json({
      campaign: campaign_name,
      status: 'success',
      total_records: records.length,
      successfully_queued: delivered,
      failed: records.length - delivered,
      mail_type: mail_type,
      estimated_delivery_window: '7-9 business days',
      voucher_format: 'SALBxx',
      results: results
    });

  } catch (err) {
    res.status(400).json({ error: 'Invalid request', details: err.message });
  }
}
