const HubspotAPI = require('./hubspotAPI');
require('dotenv').config();

const hubspot = new HubspotAPI(process.env.HUBSPOT_API_KEY, process.env.HUBSPOT_API_URL, process.env.AWS_SERVER_URL);

(async () => {
  await hubspot.getContacts();
  await hubspot.getCompanies();
  await hubspot.getDeals();
  await hubspot.getTickets();
  await hubspot.getCustomObjects();
})();
