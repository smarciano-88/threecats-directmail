const http = require('http');

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  if (req.method === 'GET' && req.url === '/discovery') {
    return res.end(JSON.stringify({
      functions: [{
        name: 'send_direct_mail',
        description: 'Activates high-value Three Cats Coffee customers for a direct mail campaign. Sends a personalized postcard with a unique SALBxx voucher code to each high-value converter.',
        parameters: [
          {
            name: 'campaign_name',
            type: 'string',
            description: 'Name of the campaign e.g. dm_tcc_hv_spring_2026',
            required: true
          },
          {
            name: 'segment_data',
            type: 'string',
            description: 'JSON array of customer records with name, address, and voucher_code fields',
            required: true
          },
          {
            name: 'mail_type',
            type: 'string',
            description: 'postcards, letters, or self_mailers. Default: postcards',
            required: false
          }
        ],
        endpoint: '/send-direct-mail',
        http_method: 'POST',
        auth_requirements: []
      }]
    }));
  }

  if (req.method === 'POST' && req.url === '/send-direct-mail') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        const params = parsed.parameters || parsed.arguments || parsed;
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

        res.statusCode = 200;
        res.end(JSON.stringify({
          campaign: campaign_name,
          status: 'success',
          total_records: records.length,
          successfully_queued: delivered,
          failed: records.length - delivered,
          mail_type: mail_type,
          estimated_delivery_window: '7-9 business days',
          voucher_format: 'SALBxx',
          results: results
        }));

      } catch (err) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid request', details: err.message }));
      }
    });
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

server.listen(3000, () => {
  console.log('Three Cats Coffee Direct Mail Tool running on port 3000');
  console.log('Discovery: http://localhost:3000/discovery');
  console.log('Send mail: http://localhost:3000/send-direct-mail');
});
