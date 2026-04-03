/**
 * Copyright (c) 2026 Velocity BPA
 * 
 * Licensed under the Business Source License 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://github.com/VelocityBPA/n8n-nodes-ondofinance/blob/main/LICENSE
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
  JsonObject,
} from 'n8n-workflow';



export class OndoFinance implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Ondo Finance',
    name: 'ondofinance',
    icon: 'file:ondofinance.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Ondo Finance API',
    defaults: {
      name: 'Ondo Finance',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'ondofinanceApi',
        required: true,
      },
    ],
    properties: [
      // Resource selector
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'UsdyToken',
            value: 'usdyToken',
          },
          {
            name: 'OUSG Token',
            value: 'outsgToken',
          },
          {
            name: 'Global Markets',
            value: 'globalMarkets',
          },
          {
            name: 'Flux Finance',
            value: 'fluxFinance',
          },
          {
            name: 'Portfolio',
            value: 'portfolio',
          }
        ],
        default: 'usdyToken',
      },
      // Operation dropdowns per resource
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['usdyToken'] } },
  options: [
    { name: 'Get Balance', value: 'getBalance', description: 'Get USDY balance for address', action: 'Get balance' },
    { name: 'Get Total Supply', value: 'getTotalSupply', description: 'Get total USDY supply', action: 'Get total supply' },
    { name: 'Get Current Yield', value: 'getCurrentYield', description: 'Get current USDY yield rate', action: 'Get current yield' },
    { name: 'Mint Tokens', value: 'mintTokens', description: 'Mint USDY tokens', action: 'Mint tokens' },
    { name: 'Redeem Tokens', value: 'redeemTokens', description: 'Redeem USDY tokens', action: 'Redeem tokens' },
    { name: 'Get Transactions', value: 'getTransactions', description: 'Get USDY transaction history', action: 'Get transactions' },
    { name: 'Get Price', value: 'getPrice', description: 'Get current USDY price', action: 'Get price' },
  ],
  default: 'getBalance',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['outsgToken'],
		},
	},
	options: [
		{
			name: 'Get Balance',
			value: 'getBalance',
			description: 'Get OUSG balance for address',
			action: 'Get OUSG balance for address',
		},
		{
			name: 'Get Total Supply',
			value: 'getTotalSupply',
			description: 'Get total OUSG supply',
			action: 'Get total OUSG supply',
		},
		{
			name: 'Get Net Asset Value',
			value: 'getNetAssetValue',
			description: 'Get current OUSG NAV',
			action: 'Get current OUSG NAV',
		},
		{
			name: 'Transfer Tokens',
			value: 'transferTokens',
			description: 'Transfer OUSG tokens',
			action: 'Transfer OUSG tokens',
		},
		{
			name: 'Get Transactions',
			value: 'getTransactions',
			description: 'Get OUSG transaction history',
			action: 'Get OUSG transaction history',
		},
		{
			name: 'Get Yield History',
			value: 'getYieldHistory',
			description: 'Get OUSG yield history',
			action: 'Get OUSG yield history',
		},
		{
			name: 'Get Price',
			value: 'getPrice',
			description: 'Get current OUSG price',
			action: 'Get current OUSG price',
		},
	],
	default: 'getBalance',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['globalMarkets'],
		},
	},
	options: [
		{
			name: 'Get All Assets',
			value: 'getAllAssets',
			description: 'Get all available global assets',
			action: 'Get all global assets',
		},
		{
			name: 'Get Asset',
			value: 'getAsset',
			description: 'Get specific global asset details',
			action: 'Get a global asset',
		},
		{
			name: 'Get Market Prices',
			value: 'getMarketPrices',
			description: 'Get current market prices',
			action: 'Get market prices',
		},
		{
			name: 'Get Trading Volume',
			value: 'getTradingVolume',
			description: 'Get trading volume data',
			action: 'Get trading volume',
		},
		{
			name: 'Get Compliance Status',
			value: 'getComplianceStatus',
			description: 'Get regulatory compliance status',
			action: 'Get compliance status',
		},
		{
			name: 'Create Trade',
			value: 'createTrade',
			description: 'Execute global market trade',
			action: 'Create a trade',
		},
		{
			name: 'Get Trade History',
			value: 'getTradeHistory',
			description: 'Get trade execution history',
			action: 'Get trade history',
		},
	],
	default: 'getAllAssets',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['fluxFinance'] } },
  options: [
    { name: 'Get All Markets', value: 'getAllMarkets', description: 'Get all Flux lending markets', action: 'Get all markets' },
    { name: 'Get Market', value: 'getMarket', description: 'Get specific market details', action: 'Get market details' },
    { name: 'Get Account Position', value: 'getAccountPosition', description: 'Get user\'s lending/borrowing position', action: 'Get account position' },
    { name: 'Supply Asset', value: 'supplyAsset', description: 'Supply assets to Flux protocol', action: 'Supply asset' },
    { name: 'Borrow Asset', value: 'borrowAsset', description: 'Borrow assets from Flux protocol', action: 'Borrow asset' },
    { name: 'Repay Loan', value: 'repayLoan', description: 'Repay borrowed assets', action: 'Repay loan' },
    { name: 'Redeem Asset', value: 'redeemAsset', description: 'Redeem supplied assets', action: 'Redeem asset' },
    { name: 'Get Interest Rates', value: 'getInterestRates', description: 'Get current supply/borrow rates', action: 'Get interest rates' },
  ],
  default: 'getAllMarkets',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['portfolio'],
		},
	},
	options: [
		{
			name: 'Get Portfolio',
			value: 'getPortfolio',
			description: 'Get complete portfolio overview',
			action: 'Get portfolio overview',
		},
		{
			name: 'Get Asset Allocation',
			value: 'getAssetAllocation',
			description: 'Get portfolio asset allocation',
			action: 'Get asset allocation',
		},
		{
			name: 'Get Performance',
			value: 'getPerformance',
			description: 'Get portfolio performance metrics',
			action: 'Get performance metrics',
		},
		{
			name: 'Get Yield Summary',
			value: 'getYieldSummary',
			description: 'Get aggregate yield summary',
			action: 'Get yield summary',
		},
		{
			name: 'Rebalance Portfolio',
			value: 'rebalancePortfolio',
			description: 'Rebalance portfolio allocation',
			action: 'Rebalance portfolio',
		},
		{
			name: 'Get Portfolio History',
			value: 'getPortfolioHistory',
			description: 'Get historical portfolio data',
			action: 'Get portfolio history',
		},
		{
			name: 'Get Risk Metrics',
			value: 'getRiskMetrics',
			description: 'Get portfolio risk assessment',
			action: 'Get risk metrics',
		},
	],
	default: 'getPortfolio',
},
      // Parameter definitions
{
  displayName: 'Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: { 
    show: { 
      resource: ['usdyToken'],
      operation: ['getBalance'] 
    } 
  },
  default: '',
  placeholder: '0x1234567890abcdef1234567890abcdef12345678',
  description: 'The wallet address to check USDY balance for',
},
{
  displayName: 'Amount',
  name: 'amount',
  type: 'string',
  required: true,
  displayOptions: { 
    show: { 
      resource: ['usdyToken'],
      operation: ['mintTokens'] 
    } 
  },
  default: '',
  placeholder: '1000',
  description: 'The amount of USDY tokens to mint',
},
{
  displayName: 'Recipient',
  name: 'recipient',
  type: 'string',
  required: true,
  displayOptions: { 
    show: { 
      resource: ['usdyToken'],
      operation: ['mintTokens'] 
    } 
  },
  default: '',
  placeholder: '0x1234567890abcdef1234567890abcdef12345678',
  description: 'The recipient address for minted tokens',
},
{
  displayName: 'Amount',
  name: 'amount',
  type: 'string',
  required: true,
  displayOptions: { 
    show: { 
      resource: ['usdyToken'],
      operation: ['redeemTokens'] 
    } 
  },
  default: '',
  placeholder: '1000',
  description: 'The amount of USDY tokens to redeem',
},
{
  displayName: 'Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: { 
    show: { 
      resource: ['usdyToken'],
      operation: ['redeemTokens'] 
    } 
  },
  default: '',
  placeholder: '0x1234567890abcdef1234567890abcdef12345678',
  description: 'The address to redeem tokens from',
},
{
  displayName: 'Address',
  name: 'address',
  type: 'string',
  required: false,
  displayOptions: { 
    show: { 
      resource: ['usdyToken'],
      operation: ['getTransactions'] 
    } 
  },
  default: '',
  placeholder: '0x1234567890abcdef1234567890abcdef12345678',
  description: 'Filter transactions by address (optional)',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  required: false,
  displayOptions: { 
    show: { 
      resource: ['usdyToken'],
      operation: ['getTransactions'] 
    } 
  },
  default: 50,
  description: 'Maximum number of transactions to return',
},
{
  displayName: 'Offset',
  name: 'offset',
  type: 'number',
  required: false,
  displayOptions: { 
    show: { 
      resource: ['usdyToken'],
      operation: ['getTransactions'] 
    } 
  },
  default: 0,
  description: 'Number of transactions to skip',
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['outsgToken'],
			operation: ['getBalance'],
		},
	},
	default: '',
	placeholder: '0x1234567890abcdef...',
	description: 'The wallet address to get OUSG balance for',
},
{
	displayName: 'From Address',
	name: 'from',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['outsgToken'],
			operation: ['transferTokens'],
		},
	},
	default: '',
	placeholder: '0x1234567890abcdef...',
	description: 'The sender address',
},
{
	displayName: 'To Address',
	name: 'to',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['outsgToken'],
			operation: ['transferTokens'],
		},
	},
	default: '',
	placeholder: '0x1234567890abcdef...',
	description: 'The recipient address',
},
{
	displayName: 'Amount',
	name: 'amount',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['outsgToken'],
			operation: ['transferTokens'],
		},
	},
	default: '',
	placeholder: '1000.00',
	description: 'The amount of OUSG tokens to transfer',
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['outsgToken'],
			operation: ['getTransactions'],
		},
	},
	default: '',
	placeholder: '0x1234567890abcdef...',
	description: 'The wallet address to get transaction history for',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['outsgToken'],
			operation: ['getTransactions'],
		},
	},
	default: 100,
	description: 'Maximum number of transactions to return',
},
{
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['outsgToken'],
			operation: ['getTransactions'],
		},
	},
	default: 0,
	description: 'Number of transactions to skip',
},
{
	displayName: 'Period',
	name: 'period',
	type: 'options',
	displayOptions: {
		show: {
			resource: ['outsgToken'],
			operation: ['getYieldHistory'],
		},
	},
	options: [
		{
			name: '1 Day',
			value: '1d',
		},
		{
			name: '1 Week',
			value: '1w',
		},
		{
			name: '1 Month',
			value: '1m',
		},
		{
			name: '3 Months',
			value: '3m',
		},
		{
			name: '6 Months',
			value: '6m',
		},
		{
			name: '1 Year',
			value: '1y',
		},
	],
	default: '1m',
	description: 'The time period for yield history',
},
{
	displayName: 'Region',
	name: 'region',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['globalMarkets'],
			operation: ['getAllAssets'],
		},
	},
	default: '',
	description: 'Filter assets by region',
},
{
	displayName: 'Asset Type',
	name: 'asset_type',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['globalMarkets'],
			operation: ['getAllAssets'],
		},
	},
	default: '',
	description: 'Filter assets by type',
},
{
	displayName: 'Asset ID',
	name: 'id',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['globalMarkets'],
			operation: ['getAsset'],
		},
	},
	default: '',
	description: 'The ID of the asset to retrieve',
},
{
	displayName: 'Symbols',
	name: 'symbols',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['globalMarkets'],
			operation: ['getMarketPrices'],
		},
	},
	default: '',
	description: 'Comma-separated list of asset symbols',
},
{
	displayName: 'Period',
	name: 'period',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['globalMarkets'],
			operation: ['getTradingVolume'],
		},
	},
	default: '',
	description: 'Time period for volume data (e.g., 24h, 7d, 30d)',
},
{
	displayName: 'Region',
	name: 'region',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['globalMarkets'],
			operation: ['getTradingVolume'],
		},
	},
	default: '',
	description: 'Filter volume data by region',
},
{
	displayName: 'Jurisdiction',
	name: 'jurisdiction',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['globalMarkets'],
			operation: ['getComplianceStatus'],
		},
	},
	default: '',
	description: 'The jurisdiction to check compliance status for',
},
{
	displayName: 'Asset',
	name: 'asset',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['globalMarkets'],
			operation: ['createTrade'],
		},
	},
	default: '',
	description: 'The asset to trade',
},
{
	displayName: 'Amount',
	name: 'amount',
	type: 'number',
	required: true,
	displayOptions: {
		show: {
			resource: ['globalMarkets'],
			operation: ['createTrade'],
		},
	},
	default: 0,
	description: 'The amount to trade',
},
{
	displayName: 'Side',
	name: 'side',
	type: 'options',
	required: true,
	displayOptions: {
		show: {
			resource: ['globalMarkets'],
			operation: ['createTrade'],
		},
	},
	options: [
		{
			name: 'Buy',
			value: 'buy',
		},
		{
			name: 'Sell',
			value: 'sell',
		},
	],
	default: 'buy',
	description: 'The side of the trade (buy or sell)',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['globalMarkets'],
			operation: ['getTradeHistory'],
		},
	},
	default: 50,
	description: 'Maximum number of trades to return',
},
{
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['globalMarkets'],
			operation: ['getTradeHistory'],
		},
	},
	default: 0,
	description: 'Number of trades to skip',
},
{
  displayName: 'Asset',
  name: 'asset',
  type: 'string',
  required: true,
  displayOptions: { 
    show: { 
      resource: ['fluxFinance'], 
      operation: ['getMarket'] 
    } 
  },
  default: '',
  description: 'The asset symbol to get market details for',
},
{
  displayName: 'Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: { 
    show: { 
      resource: ['fluxFinance'], 
      operation: ['getAccountPosition'] 
    } 
  },
  default: '',
  description: 'The wallet address to get position for',
},
{
  displayName: 'Asset',
  name: 'asset',
  type: 'string',
  required: true,
  displayOptions: { 
    show: { 
      resource: ['fluxFinance'], 
      operation: ['supplyAsset', 'borrowAsset', 'repayLoan', 'redeemAsset'] 
    } 
  },
  default: '',
  description: 'The asset symbol for the operation',
},
{
  displayName: 'Amount',
  name: 'amount',
  type: 'string',
  required: true,
  displayOptions: { 
    show: { 
      resource: ['fluxFinance'], 
      operation: ['supplyAsset', 'borrowAsset', 'repayLoan', 'redeemAsset'] 
    } 
  },
  default: '',
  description: 'The amount for the operation',
},
{
  displayName: 'Asset',
  name: 'asset',
  type: 'string',
  required: false,
  displayOptions: { 
    show: { 
      resource: ['fluxFinance'], 
      operation: ['getInterestRates'] 
    } 
  },
  default: '',
  description: 'The asset symbol to get rates for (optional - if not provided, returns all rates)',
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['portfolio'],
			operation: ['getPortfolio', 'getAssetAllocation', 'getPerformance', 'getYieldSummary', 'rebalancePortfolio', 'getPortfolioHistory', 'getRiskMetrics'],
		},
	},
	default: '',
	description: 'The wallet address for the portfolio',
},
{
	displayName: 'Period',
	name: 'period',
	type: 'options',
	required: true,
	displayOptions: {
		show: {
			resource: ['portfolio'],
			operation: ['getPerformance'],
		},
	},
	options: [
		{
			name: '1 Day',
			value: '1d',
		},
		{
			name: '7 Days',
			value: '7d',
		},
		{
			name: '30 Days',
			value: '30d',
		},
		{
			name: '90 Days',
			value: '90d',
		},
		{
			name: '1 Year',
			value: '1y',
		},
		{
			name: 'All Time',
			value: 'all',
		},
	],
	default: '30d',
	description: 'Time period for performance metrics',
},
{
	displayName: 'Period',
	name: 'period',
	type: 'options',
	required: true,
	displayOptions: {
		show: {
			resource: ['portfolio'],
			operation: ['getPortfolioHistory'],
		},
	},
	options: [
		{
			name: '1 Day',
			value: '1d',
		},
		{
			name: '7 Days',
			value: '7d',
		},
		{
			name: '30 Days',
			value: '30d',
		},
		{
			name: '90 Days',
			value: '90d',
		},
		{
			name: '1 Year',
			value: '1y',
		},
		{
			name: 'All Time',
			value: 'all',
		},
	],
	default: '30d',
	description: 'Time period for historical data',
},
{
	displayName: 'Targets',
	name: 'targets',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['portfolio'],
			operation: ['rebalancePortfolio'],
		},
	},
	default: '{}',
	description: 'Target allocation percentages for portfolio rebalancing as JSON object',
	placeholder: '{"OUSG": 50, "OMMF": 30, "USDY": 20}',
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'usdyToken':
        return [await executeUsdyTokenOperations.call(this, items)];
      case 'outsgToken':
        return [await executeOUSGTokenOperations.call(this, items)];
      case 'globalMarkets':
        return [await executeGlobalMarketsOperations.call(this, items)];
      case 'fluxFinance':
        return [await executeFluxFinanceOperations.call(this, items)];
      case 'portfolio':
        return [await executePortfolioOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeUsdyTokenOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('ondofinanceApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      const baseOptions: any = {
        headers: {
          'Authorization': `Bearer ${credentials.apiKey}`,
          'Content-Type': 'application/json',
        },
        json: true,
      };

      switch (operation) {
        case 'getBalance': {
          const address = this.getNodeParameter('address', i) as string;
          const options: any = {
            ...baseOptions,
            method: 'GET',
            url: `${credentials.baseUrl}/tokens/usdy/balance/${address}`,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getTotalSupply': {
          const options: any = {
            ...baseOptions,
            method: 'GET',
            url: `${credentials.baseUrl}/tokens/usdy/supply`,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getCurrentYield': {
          const options: any = {
            ...baseOptions,
            method: 'GET',
            url: `${credentials.baseUrl}/tokens/usdy/yield`,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'mintTokens': {
          const amount = this.getNodeParameter('amount', i) as string;
          const recipient = this.getNodeParameter('recipient', i) as string;
          const options: any = {
            ...baseOptions,
            method: 'POST',
            url: `${credentials.baseUrl}/tokens/usdy/mint`,
            body: {
              amount,
              recipient,
            },
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'redeemTokens': {
          const amount = this.getNodeParameter('amount', i) as string;
          const address = this.getNodeParameter('address', i) as string;
          const options: any = {
            ...baseOptions,
            method: 'POST',
            url: `${credentials.baseUrl}/tokens/usdy/redeem`,
            body: {
              amount,
              address,
            },
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getTransactions': {
          const address = this.getNodeParameter('address', i) as string;
          const limit = this.getNodeParameter('limit', i) as number;
          const offset = this.getNodeParameter('offset', i) as number;
          
          let url = `${credentials.baseUrl}/tokens/usdy/transactions`;
          const queryParams: string[] = [];
          
          if (address) queryParams.push(`address=${encodeURIComponent(address)}`);
          if (limit) queryParams.push(`limit=${limit}`);
          if (offset) queryParams.push(`offset=${offset}`);
          
          if (queryParams.length > 0) {
            url += `?${queryParams.join('&')}`;
          }

          const options: any = {
            ...baseOptions,
            method: 'GET',
            url,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getPrice': {
          const options: any = {
            ...baseOptions,
            method: 'GET',
            url: `${credentials.baseUrl}/tokens/usdy/price`,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(
            this.getNode(),
            `Unknown operation: ${operation}`,
            { itemIndex: i }
          );
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });

    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeOUSGTokenOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('ondofinanceApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getBalance': {
					const address = this.getNodeParameter('address', i) as string;
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/tokens/ousg/balance/${address}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getTotalSupply': {
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/tokens/ousg/supply`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getNetAssetValue': {
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/tokens/ousg/nav`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'transferTokens': {
					const from = this.getNodeParameter('from', i) as string;
					const to = this.getNodeParameter('to', i) as string;
					const amount = this.getNodeParameter('amount', i) as string;
					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/tokens/ousg/transfer`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							from,
							to,
							amount,
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getTransactions': {
					const address = this.getNodeParameter('address', i) as string;
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/tokens/ousg/transactions`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						qs: {
							address,
							limit,
							offset,
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getYieldHistory': {
					const period = this.getNodeParameter('period', i) as string;
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/tokens/ousg/yield`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						qs: {
							period,
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getPrice': {
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/tokens/ousg/price`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(
						this.getNode(),
						`Unknown operation: ${operation}`,
					);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeGlobalMarketsOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('ondofinanceApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			const baseOptions: any = {
				headers: {
					'Authorization': `Bearer ${credentials.apiKey}`,
					'Content-Type': 'application/json',
				},
				json: true,
			};

			switch (operation) {
				case 'getAllAssets': {
					const region = this.getNodeParameter('region', i) as string;
					const assetType = this.getNodeParameter('asset_type', i) as string;
					
					const queryParams = new URLSearchParams();
					if (region) queryParams.append('region', region);
					if (assetType) queryParams.append('asset_type', assetType);
					
					const options: any = {
						...baseOptions,
						method: 'GET',
						url: `${credentials.baseUrl}/markets/global/assets${queryParams.toString() ? `?${queryParams.toString()}` : ''}`,
					};
					
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getAsset': {
					const id = this.getNodeParameter('id', i) as string;
					
					const options: any = {
						...baseOptions,
						method: 'GET',
						url: `${credentials.baseUrl}/markets/global/asset/${id}`,
					};
					
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getMarketPrices': {
					const symbols = this.getNodeParameter('symbols', i) as string;
					
					const queryParams = new URLSearchParams();
					if (symbols) queryParams.append('symbols', symbols);
					
					const options: any = {
						...baseOptions,
						method: 'GET',
						url: `${credentials.baseUrl}/markets/global/prices${queryParams.toString() ? `?${queryParams.toString()}` : ''}`,
					};
					
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getTradingVolume': {
					const period = this.getNodeParameter('period', i) as string;
					const region = this.getNodeParameter('region', i) as string;
					
					const queryParams = new URLSearchParams();
					if (period) queryParams.append('period', period);
					if (region) queryParams.append('region', region);
					
					const options: any = {
						...baseOptions,
						method: 'GET',
						url: `${credentials.baseUrl}/markets/global/volume${queryParams.toString() ? `?${queryParams.toString()}` : ''}`,
					};
					
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getComplianceStatus': {
					const jurisdiction = this.getNodeParameter('jurisdiction', i) as string;
					
					const queryParams = new URLSearchParams();
					if (jurisdiction) queryParams.append('jurisdiction', jurisdiction);
					
					const options: any = {
						...baseOptions,
						method: 'GET',
						url: `${credentials.baseUrl}/markets/global/compliance${queryParams.toString() ? `?${queryParams.toString()}` : ''}`,
					};
					
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createTrade': {
					const asset = this.getNodeParameter('asset', i) as string;
					const amount = this.getNodeParameter('amount', i) as number;
					const side = this.getNodeParameter('side', i) as string;
					
					const body = {
						asset,
						amount,
						side,
					};
					
					const options: any = {
						...baseOptions,
						method: 'POST',
						url: `${credentials.baseUrl}/markets/global/trade`,
						body,
					};
					
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getTradeHistory': {
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;
					
					const queryParams = new URLSearchParams();
					if (limit) queryParams.append('limit', limit.toString());
					if (offset) queryParams.append('offset', offset.toString());
					
					const options: any = {
						...baseOptions,
						method: 'GET',
						url: `${credentials.baseUrl}/markets/global/trades${queryParams.toString() ? `?${queryParams.toString()}` : ''}`,
					};
					
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(
						this.getNode(),
						`Unknown operation: ${operation}`,
						{ itemIndex: i },
					);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeFluxFinanceOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('ondofinanceApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'getAllMarkets': {
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/flux/markets`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getMarket': {
          const asset = this.getNodeParameter('asset', i) as string;
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/flux/market/${asset}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getAccountPosition': {
          const address = this.getNodeParameter('address', i) as string;
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/flux/account/${address}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'supplyAsset': {
          const asset = this.getNodeParameter('asset', i) as string;
          const amount = this.getNodeParameter('amount', i) as string;
          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/flux/supply`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: {
              asset,
              amount,
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'borrowAsset': {
          const asset = this.getNodeParameter('asset', i) as string;
          const amount = this.getNodeParameter('amount', i) as string;
          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/flux/borrow`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: {
              asset,
              amount,
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'repayLoan': {
          const asset = this.getNodeParameter('asset', i) as string;
          const amount = this.getNodeParameter('amount', i) as string;
          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/flux/repay`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: {
              asset,
              amount,
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'redeemAsset': {
          const asset = this.getNodeParameter('asset', i) as string;
          const amount = this.getNodeParameter('amount', i) as string;
          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/flux/redeem`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: {
              asset,
              amount,
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getInterestRates': {
          const asset = this.getNodeParameter('asset', i) as string;
          let url = `${credentials.baseUrl}/flux/rates`;
          if (asset) {
            url += `?asset=${encodeURIComponent(asset)}`;
          }
          const options: any = {
            method: 'GET',
            url,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executePortfolioOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('ondofinanceApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getPortfolio': {
					const address = this.getNodeParameter('address', i) as string;
					
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/portfolio/${address}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};
					
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getAssetAllocation': {
					const address = this.getNodeParameter('address', i) as string;
					
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/portfolio/${address}/allocation`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};
					
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getPerformance': {
					const address = this.getNodeParameter('address', i) as string;
					const period = this.getNodeParameter('period', i) as string;
					
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/portfolio/${address}/performance`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						qs: {
							period,
						},
						json: true,
					};
					
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getYieldSummary': {
					const address = this.getNodeParameter('address', i) as string;
					
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/portfolio/${address}/yield`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};
					
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'rebalancePortfolio': {
					const address = this.getNodeParameter('address', i) as string;
					const targets = this.getNodeParameter('targets', i) as string;
					
					let parsedTargets: any;
					try {
						parsedTargets = JSON.parse(targets);
					} catch (error: any) {
						throw new NodeOperationError(this.getNode(), `Invalid JSON in targets parameter: ${error.message}`);
					}
					
					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/portfolio/${address}/rebalance`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							targets: parsedTargets,
						},
						json: true,
					};
					
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getPortfolioHistory': {
					const address = this.getNodeParameter('address', i) as string;
					const period = this.getNodeParameter('period', i) as string;
					
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/portfolio/${address}/history`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						qs: {
							period,
						},
						json: true,
					};
					
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getRiskMetrics': {
					const address = this.getNodeParameter('address', i) as string;
					
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/portfolio/${address}/risk`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};
					
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({ json: result, pairedItem: { item: i } });

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
			} else {
				throw error;
			}
		}
	}

	return returnData;
}