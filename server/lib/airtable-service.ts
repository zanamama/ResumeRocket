// Airtable integration service for storing user leads
import Airtable from 'airtable';

interface AirtableConfig {
  apiKey: string;
  baseId: string;
  tableName?: string;
}

interface LeadRecord {
  'Full Name'?: string;
  'Email'?: string;
  'Phone'?: string;
  'Location'?: string;
  'Source'?: 'standard' | 'advanced' | 'create';
  'Resume Job ID'?: number;
  'Extracted At'?: string;
  'IP Address'?: string;
  'User Agent'?: string;
}

export class AirtableService {
  private base: any;
  private tableName: string;

  constructor(config: AirtableConfig) {
    if (!config.apiKey || !config.baseId) {
      throw new Error('Airtable API key and Base ID are required');
    }

    Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: config.apiKey
    });

    this.base = Airtable.base(config.baseId);
    this.tableName = config.tableName || 'Leads'; // Default table name
  }

  async createLead(leadData: {
    fullName?: string | null;
    email?: string | null;
    phone?: string | null;
    location?: string | null;
    source: 'standard' | 'advanced' | 'create';
    resumeJobId: number;
    ipAddress?: string | null;
    userAgent?: string | null;
  }): Promise<boolean> {
    try {
      const record: LeadRecord = {
        'Extracted At': new Date().toISOString(),
        'Source': leadData.source,
        'Resume Job ID': leadData.resumeJobId,
      };

      // Only add fields that have values
      if (leadData.fullName) record['Full Name'] = leadData.fullName;
      if (leadData.email) record['Email'] = leadData.email;
      if (leadData.phone) record['Phone'] = leadData.phone;
      if (leadData.location) record['Location'] = leadData.location;
      if (leadData.ipAddress) record['IP Address'] = leadData.ipAddress;
      if (leadData.userAgent) record['User Agent'] = leadData.userAgent;

      await this.base(this.tableName).create([{
        fields: record
      }]);

      console.log(`✅ Lead saved to Airtable: ${leadData.fullName || 'Unknown'} (${leadData.email || 'no email'})`);
      return true;
    } catch (error) {
      console.error('❌ Failed to save lead to Airtable:', error);
      return false;
    }
  }

  async getAllLeads(): Promise<LeadRecord[]> {
    try {
      const records: LeadRecord[] = [];
      
      await this.base(this.tableName).select({
        sort: [{field: 'Extracted At', direction: 'desc'}]
      }).eachPage((pageRecords: any[], fetchNextPage: () => void) => {
        pageRecords.forEach(record => {
          records.push(record.fields);
        });
        fetchNextPage();
      });

      return records;
    } catch (error) {
      console.error('Failed to fetch leads from Airtable:', error);
      return [];
    }
  }

  async getLeadsByEmail(email: string): Promise<LeadRecord[]> {
    try {
      const records: LeadRecord[] = [];
      
      await this.base(this.tableName).select({
        filterByFormula: `{Email} = "${email}"`,
        sort: [{field: 'Extracted At', direction: 'desc'}]
      }).eachPage((pageRecords: any[], fetchNextPage: () => void) => {
        pageRecords.forEach(record => {
          records.push(record.fields);
        });
        fetchNextPage();
      });

      return records;
    } catch (error) {
      console.error('Failed to fetch leads by email from Airtable:', error);
      return [];
    }
  }
}

// Initialize Airtable service if credentials are available
export function createAirtableService(): AirtableService | null {
  try {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!apiKey || !baseId) {
      console.log('ℹ️ Airtable credentials not configured - using database storage for leads');
      return null;
    }

    return new AirtableService({ apiKey, baseId });
  } catch (error) {
    console.error('Failed to initialize Airtable service:', error);
    return null;
  }
}