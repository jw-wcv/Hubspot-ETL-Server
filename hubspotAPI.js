/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 04-25-2023
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/

const axios = require('axios');

class HubspotAPI {
  constructor(apiKey, apiUrl, awsServerUrl) {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
    this.awsServerUrl = awsServerUrl;
    this.headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      };
  }

  async fetchAllPages(response, headers = {}, pageSize) {
    let allResults = response.results;
    let pageNum = 1;
    let totalNumPages;
    console.log('page Size: ' + pageSize);

    //change this to configure how many max pages to process
    let maxPagesToProcess = 500;
  
    while (response.paging && response.paging.next && pageNum != maxPagesToProcess) {
      console.log(`Fetching page ${pageNum}${totalNumPages ? ` of ${totalNumPages}` : ''}`);
      try {
        console.log(response.paging.next.link);
        const nextResponse = await axios.get(response.paging.next.link, { headers: { ...this.headers, 'pageSize': pageSize } });
        response = nextResponse.data; // Update response with new data
        allResults = allResults.concat(response.results);
        pageNum++;
        if (!totalNumPages && response.paging && response.paging.total) {
          totalNumPages = response.paging.total;
        }
      } catch (error) {
        console.error('Error fetching page:', error.message);
        return allResults;
      }
    }
  
    console.log(`Fetched all ${allResults.length} records`);
    return allResults;
  }


  async getContacts() {
    try {
      const response = await axios.get(`${this.apiUrl}/crm/v3/objects/contacts`, { headers: this.headers });
      const contacts = await this.fetchAllPages(response.data, this.headers, 100);
  
      // Send data to AWS server or another destination
      // await axios.post(`${this.awsServerUrl}/contacts`, { results: contacts });
  
      return contacts;

      //for future filtered queries
      /*const response = await axios.get('https://api.hubapi.com/contacts/v1/lists/all/contacts/recent', {
      params: {
        count: 100, // Number of contacts to retrieve (max 100)
        property: 'lastmodifieddate', // Property to retrieve for each contact
        timeOffset: -10000 // Return contacts updated in the last 24 hours
      },
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);*/
    } catch (error) {
      console.error('Error fetching contacts:', error.message);
      // Return the error response
      throw error.response;
    }
  }


  async getCompanies() {
    try {
      const response = await axios.get(`${this.apiUrl}/crm/v3/objects/companies`, { headers: this.headers });
      const companies = await this.fetchAllPages(response.data, this.headers, 100);

      // Send data to AWS server or another destination
      // await axios.post(`${this.awsServerUrl}/companies`, { results: companies });

      return companies;
    } catch (error) {
        console.error('Error fetching companies:', error.message);
        // Return the error response
        throw error.response;
      }
  }

  async getDeals() {
    try {
      const response = await axios.get(`${this.apiUrl}/crm/v3/objects/deals`, { headers: this.headers });
      const deals = await this.fetchAllPages(response.data, this.headers, 100);

      // Send data to AWS server or another destination
      // await axios.post(`${this.awsServerUrl}/deals`, { results: deals });

      return deals;
    } catch (error) {
        console.error('Error fetching deals:', error.message);
        // Return the error response
        throw error.response;
      }
  }

  async getTickets() {
    try {
      const response = await axios.get(`${this.apiUrl}/crm/v3/objects/tickets`, { headers: this.headers });
      const tickets = await this.fetchAllPages(response.data, this.headers, 100);

      // Send data to AWS server or another destination
      // await axios.post(`${this.awsServerUrl}/tickets`, { results: tickets });

      return tickets;
    } catch (error) {
        console.error('Error fetching tickets:', error.message);
        // Return the error response
        throw error.response;
      }
  }

  async getCustomObjects(objectTypeId) {
    //const objectTypeId = 'custom_object_type_id'; // Replace with your custom object's type ID
    try {
      const response = await axios.get(`${this.apiUrl}/crm/v3/objects/${objectTypeId}`, { headers: this.headers });
      const customObjects = await this.fetchAllPages(response.data, this.headers, 100);

      // Send data to AWS server or another destination
      // await axios.post(`${this.awsServerUrl}/${objectTypeId}`, { results: customObjects });

      return customObjects;
    } catch (error) {
        console.error('Error fetching customObject:', error.message);
        // Return the error response
        throw error.response;
      }
  }
}

module.exports = HubspotAPI;
