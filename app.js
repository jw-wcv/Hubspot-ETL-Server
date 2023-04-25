const express = require('express');
const CronJob = require('cron').CronJob;
require('dotenv').config();

const HubspotAPI = require('./hubspotAPI');

const app = express();
app.use(express.json());

const hubspot = new HubspotAPI(process.env.HUBSPOT_API_KEY, process.env.HUBSPOT_API_URL, process.env.AWS_SERVER_URL);

// Schedule tasks to run every X hours
// add interval to .env file for easy update
const interval = '0 */24 * * *'; // Replace X with the desired interval in hours

new CronJob(interval, () => hubspot.getContacts(), null, true, 'America/Los_Angeles');
new CronJob(interval, () => hubspot.getCompanies(), null, true, 'America/Los_Angeles');
new CronJob(interval, () => hubspot.getDeals(), null, true, 'America/Los_Angeles');
new CronJob(interval, () => hubspot.getTickets(), null, true, 'America/Los_Angeles');
new CronJob(interval, () => hubspot.getCustomObjects(), null, true, 'America/Los_Angeles');

// Add your routes here
app.get('/contacts', async (req, res) => {
    try {
      const contacts = await hubspot.getContacts();
      res.status(200).json(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error.message);
      res.status(error.status).json({ message: error.data.message });
    }
  });
  
  app.get('/companies', async (req, res) => {
    try {
      const companies = await hubspot.getCompanies();
      res.status(200).json(companies);
    } catch (error) {
      console.error('Error fetching companies:', error.message);
      res.status(error.status).json({ message: error.data.message });
    }
  });
  
  app.get('/deals', async (req, res) => {
    try {
      const deals = await hubspot.getDeals();
      res.status(200).json(deals);
    } catch (error) {
      console.error('Error fetching deals:', error.message);
      res.status(error.status).json({ message: error.data.message });
    }
  });
  
  app.get('/tickets', async (req, res) => {
    try {
      const tickets = await hubspot.getTickets();
      res.status(200).json(tickets);
    } catch (error) {
      console.error('Error fetching tickets:', error.message);
      res.status(error.status).json({ message: error.data.message });
    }
  });
  
  app.get('/customobjects', async (req, res) => {
    try {
      const customObjects = await hubspot.getCustomObjects();
      res.status(200).json(customObjects);
    } catch (error) {
      console.error('Error fetching custom objects:', error.message);
      res.status(error.status).json({ message: error.data.message });
    }
  });

  //add marketingEvents / communications 
  //add last modified query logic after first push
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
