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
            name: 'UsdyTokenOperations',
            value: 'usdyTokenOperations',
          },
          {
            name: 'OusgFundManagement',
            value: 'ousgFundManagement',
          },
          {
            name: 'OndoGlobalMarkets',
            value: 'ondoGlobalMarkets',
          },
          {
            name: 'TokenPricingAndNav',
            value: 'tokenPricingAndNav',
          },
          {
            name: 'RedemptionsAndSubscriptions',
            value: 'redemptionsAndSubscriptions',
          },
          {
            name: 'FluxFinanceLending',
            value: 'fluxFinanceLending',
          }
        ],
        default: 'usdyTokenOperations',
      },
      // Operation dropdowns per resource
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['usdyTokenOperations'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      description: 'Create USDY token operations',
      action: 'Create USDY token operations',
    },
    {
      name: 'Get',
      value: 'get',
      description: 'Get USDY token operations',
      action: 'Get USDY token operations',
    },
    {
      name: 'Get All',
      value: 'getAll',
      description: 'List USDY token operations',
      action: 'List USDY token operations',
    },
    {
      name: 'Update',
      value: 'update',
      description: 'Update USDY token operations',
      action: 'Update USDY token operations',
    },
    {
      name: 'Delete',
      value: 'delete',
      description: 'Delete USDY token operations',
      action: 'Delete USDY token operations',
    },
  ],
  default: 'create',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['ousgFundManagement'],
		},
	},
	options: [
		{
			name: 'Create',
			value: 'create',
			description: 'Create OUSG fund management',
			action: 'Create OUSG fund management',
		},
		{
			name: 'Get',
			value: 'get',
			description: 'Get OUSG fund management by ID',
			action: 'Get OUSG fund management',
		},
		{
			name: 'Get All',
			value: 'getAll',
			description: 'List all OUSG fund managements',
			action: 'List OUSG fund managements',
		},
		{
			name: 'Update',
			value: 'update',
			description: 'Update OUSG fund management',
			action: 'Update OUSG fund management',
		},
		{
			name: 'Delete',
			value: 'delete',
			description: 'Delete OUSG fund management',
			action: 'Delete OUSG fund management',
		},
	],
	default: 'create',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['ondoGlobalMarkets'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      description: 'Create Ondo Global Markets',
      action: 'Create Ondo Global Markets',
    },
    {
      name: 'Get',
      value: 'get',
      description: 'Get Ondo Global Markets',
      action: 'Get Ondo Global Markets',
    },
    {
      name: 'Get All',
      value: 'getAll',
      description: 'List Ondo Global Markets',
      action: 'List Ondo Global Markets',
    },
    {
      name: 'Update',
      value: 'update',
      description: 'Update Ondo Global Markets',
      action: 'Update Ondo Global Markets',
    },
    {
      name: 'Delete',
      value: 'delete',
      description: 'Delete Ondo Global Markets',
      action: 'Delete Ondo Global Markets',
    },
  ],
  default: 'create',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['tokenPricingAndNav'],
    },
  },
  options: [
    {
      name: 'Create Token Pricing and NAV',
      value: 'create',
      description: 'Create token pricing and NAV',
      action: 'Create token pricing and NAV',
    },
    {
      name: 'Get Token Pricing and NAV',
      value: 'get',
      description: 'Get token pricing and NAV by ID',
      action: 'Get token pricing and NAV',
    },
    {
      name: 'List Token Pricing and NAV',
      value: 'getAll',
      description: 'List all token pricing and NAV records',
      action: 'List token pricing and NAV',
    },
    {
      name: 'Update Token Pricing and NAV',
      value: 'update',
      description: 'Update token pricing and NAV',
      action: 'Update token pricing and NAV',
    },
    {
      name: 'Delete Token Pricing and NAV',
      value: 'delete',
      description: 'Delete token pricing and NAV',
      action: 'Delete token pricing and NAV',
    },
  ],
  default: 'create',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['redemptionsAndSubscriptions'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      description: 'Create redemptions and subscriptions',
      action: 'Create redemptions and subscriptions',
    },
    {
      name: 'Get',
      value: 'get',
      description: 'Get redemptions and subscriptions by ID',
      action: 'Get redemptions and subscriptions',
    },
    {
      name: 'Get All',
      value: 'getAll',
      description: 'List all redemptions and subscriptions',
      action: 'Get all redemptions and subscriptions',
    },
    {
      name: 'Update',
      value: 'update',
      description: 'Update redemptions and subscriptions',
      action: 'Update redemptions and subscriptions',
    },
    {
      name: 'Delete',
      value: 'delete',
      description: 'Delete redemptions and subscriptions',
      action: 'Delete redemptions and subscriptions',
    },
  ],
  default: 'create',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['fluxFinanceLending'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      description: 'Create Flux Finance lending',
      action: 'Create Flux Finance lending',
    },
    {
      name: 'Get',
      value: 'get',
      description: 'Get Flux Finance lending',
      action: 'Get Flux Finance lending',
    },
    {
      name: 'Get All',
      value: 'getAll',
      description: 'List Flux Finance lending',
      action: 'Get all Flux Finance lending',
    },
    {
      name: 'Update',
      value: 'update',
      description: 'Update Flux Finance lending',
      action: 'Update Flux Finance lending',
    },
    {
      name: 'Delete',
      value: 'delete',
      description: 'Delete Flux Finance lending',
      action: 'Delete Flux Finance lending',
    },
  ],
  default: 'create',
},
      // Parameter definitions
{
  displayName: 'ID',
  name: 'id',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['usdyTokenOperations'],
      operation: ['get', 'update', 'delete'],
    },
  },
  default: '',
  description: 'The ID of the USDY token operation',
},
{
  displayName: 'Token Address',
  name: 'tokenAddress',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['usdyTokenOperations'],
      operation: ['create'],
    },
  },
  default: '',
  description: 'The USDY token contract address',
},
{
  displayName: 'Amount',
  name: 'amount',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['usdyTokenOperations'],
      operation: ['create'],
    },
  },
  default: '',
  description: 'The amount of USDY tokens',
},
{
  displayName: 'Operation Type',
  name: 'operationType',
  type: 'options',
  required: true,
  displayOptions: {
    show: {
      resource: ['usdyTokenOperations'],
      operation: ['create'],
    },
  },
  options: [
    {
      name: 'Transfer',
      value: 'transfer',
    },
    {
      name: 'Mint',
      value: 'mint',
    },
    {
      name: 'Burn',
      value: 'burn',
    },
    {
      name: 'Approve',
      value: 'approve',
    },
  ],
  default: 'transfer',
  description: 'The type of token operation',
},
{
  displayName: 'Recipient Address',
  name: 'recipientAddress',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['usdyTokenOperations'],
      operation: ['create'],
    },
  },
  default: '',
  description: 'The recipient address for the operation',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  required: false,
  displayOptions: {
    show: {
      resource: ['usdyTokenOperations'],
      operation: ['getAll'],
    },
  },
  default: 100,
  description: 'Maximum number of results to return',
},
{
  displayName: 'Offset',
  name: 'offset',
  type: 'number',
  required: false,
  displayOptions: {
    show: {
      resource: ['usdyTokenOperations'],
      operation: ['getAll'],
    },
  },
  default: 0,
  description: 'Number of results to skip',
},
{
  displayName: 'Update Fields',
  name: 'updateFields',
  type: 'collection',
  placeholder: 'Add Field',
  default: {},
  displayOptions: {
    show: {
      resource: ['usdyTokenOperations'],
      operation: ['update'],
    },
  },
  options: [
    {
      displayName: 'Amount',
      name: 'amount',
      type: 'string',
      default: '',
      description: 'Updated amount of USDY tokens',
    },
    {
      displayName: 'Status',
      name: 'status',
      type: 'options',
      options: [
        {
          name: 'Pending',
          value: 'pending',
        },
        {
          name: 'Completed',
          value: 'completed',
        },
        {
          name: 'Failed',
          value: 'failed',
        },
      ],
      default: 'pending',
      description: 'Updated status of the operation',
    },
    {
      displayName: 'Recipient Address',
      name: 'recipientAddress',
      type: 'string',
      default: '',
      description: 'Updated recipient address',
    },
  ],
},
{
	displayName: 'Fund Management ID',
	name: 'id',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['ousgFundManagement'],
			operation: ['get', 'update', 'delete'],
		},
	},
	default: '',
	description: 'The ID of the OUSG fund management',
},
{
	displayName: 'Fund Name',
	name: 'fundName',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['ousgFundManagement'],
			operation: ['create'],
		},
	},
	default: '',
	description: 'The name of the OUSG fund',
},
{
	displayName: 'Management Strategy',
	name: 'managementStrategy',
	type: 'options',
	required: true,
	displayOptions: {
		show: {
			resource: ['ousgFundManagement'],
			operation: ['create', 'update'],
		},
	},
	options: [
		{
			name: 'Active',
			value: 'active',
		},
		{
			name: 'Passive',
			value: 'passive',
		},
		{
			name: 'Hybrid',
			value: 'hybrid',
		},
	],
	default: 'active',
	description: 'The management strategy for the fund',
},
{
	displayName: 'Target Allocation (%)',
	name: 'targetAllocation',
	type: 'number',
	required: false,
	displayOptions: {
		show: {
			resource: ['ousgFundManagement'],
			operation: ['create', 'update'],
		},
	},
	default: 100,
	description: 'The target allocation percentage for the fund',
},
{
	displayName: 'Risk Profile',
	name: 'riskProfile',
	type: 'options',
	required: false,
	displayOptions: {
		show: {
			resource: ['ousgFundManagement'],
			operation: ['create', 'update'],
		},
	},
	options: [
		{
			name: 'Conservative',
			value: 'conservative',
		},
		{
			name: 'Moderate',
			value: 'moderate',
		},
		{
			name: 'Aggressive',
			value: 'aggressive',
		},
	],
	default: 'moderate',
	description: 'The risk profile of the fund',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	required: false,
	displayOptions: {
		show: {
			resource: ['ousgFundManagement'],
			operation: ['getAll'],
		},
	},
	default: 50,
	description: 'Maximum number of results to return',
},
{
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	required: false,
	displayOptions: {
		show: {
			resource: ['ousgFundManagement'],
			operation: ['getAll'],
		},
	},
	default: 0,
	description: 'Number of results to skip',
},
{
  displayName: 'ID',
  name: 'id',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['ondoGlobalMarkets'],
      operation: ['get'],
    },
  },
  default: '',
  description: 'The ID of the Ondo Global Markets record to retrieve',
},
{
  displayName: 'ID',
  name: 'id',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['ondoGlobalMarkets'],
      operation: ['update'],
    },
  },
  default: '',
  description: 'The ID of the Ondo Global Markets record to update',
},
{
  displayName: 'ID',
  name: 'id',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['ondoGlobalMarkets'],
      operation: ['delete'],
    },
  },
  default: '',
  description: 'The ID of the Ondo Global Markets record to delete',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  required: false,
  displayOptions: {
    show: {
      resource: ['ondoGlobalMarkets'],
      operation: ['getAll'],
    },
  },
  default: 100,
  description: 'The maximum number of records to return',
},
{
  displayName: 'Offset',
  name: 'offset',
  type: 'number',
  required: false,
  displayOptions: {
    show: {
      resource: ['ondoGlobalMarkets'],
      operation: ['getAll'],
    },
  },
  default: 0,
  description: 'The number of records to skip',
},
{
  displayName: 'Data',
  name: 'data',
  type: 'json',
  required: true,
  displayOptions: {
    show: {
      resource: ['ondoGlobalMarkets'],
      operation: ['create'],
    },
  },
  default: '{}',
  description: 'The data for creating the Ondo Global Markets record',
},
{
  displayName: 'Data',
  name: 'data',
  type: 'json',
  required: true,
  displayOptions: {
    show: {
      resource: ['ondoGlobalMarkets'],
      operation: ['update'],
    },
  },
  default: '{}',
  description: 'The data for updating the Ondo Global Markets record',
},
{
  displayName: 'ID',
  name: 'id',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['tokenPricingAndNav'],
      operation: ['get', 'update', 'delete'],
    },
  },
  default: '',
  description: 'The ID of the token pricing and NAV record',
},
{
  displayName: 'Token Symbol',
  name: 'tokenSymbol',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['tokenPricingAndNav'],
      operation: ['create', 'update'],
    },
  },
  default: '',
  description: 'The symbol of the token',
},
{
  displayName: 'Price',
  name: 'price',
  type: 'number',
  required: true,
  displayOptions: {
    show: {
      resource: ['tokenPricingAndNav'],
      operation: ['create', 'update'],
    },
  },
  default: 0,
  description: 'The price of the token',
},
{
  displayName: 'NAV (Net Asset Value)',
  name: 'nav',
  type: 'number',
  required: true,
  displayOptions: {
    show: {
      resource: ['tokenPricingAndNav'],
      operation: ['create', 'update'],
    },
  },
  default: 0,
  description: 'The net asset value of the token',
},
{
  displayName: 'Currency',
  name: 'currency',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['tokenPricingAndNav'],
      operation: ['create', 'update'],
    },
  },
  default: 'USD',
  description: 'The currency for the price and NAV',
},
{
  displayName: 'Timestamp',
  name: 'timestamp',
  type: 'dateTime',
  required: false,
  displayOptions: {
    show: {
      resource: ['tokenPricingAndNav'],
      operation: ['create', 'update'],
    },
  },
  default: '',
  description: 'The timestamp for this pricing data',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  required: false,
  displayOptions: {
    show: {
      resource: ['tokenPricingAndNav'],
      operation: ['getAll'],
    },
  },
  default: 100,
  description: 'Maximum number of records to return',
},
{
  displayName: 'Offset',
  name: 'offset',
  type: 'number',
  required: false,
  displayOptions: {
    show: {
      resource: ['tokenPricingAndNav'],
      operation: ['getAll'],
    },
  },
  default: 0,
  description: 'Number of records to skip',
},
{
  displayName: 'Redemption and Subscription ID',
  name: 'id',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['redemptionsAndSubscriptions'],
      operation: ['get', 'update', 'delete'],
    },
  },
  default: '',
  description: 'The ID of the redemption and subscription record',
},
{
  displayName: 'Fund ID',
  name: 'fundId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['redemptionsAndSubscriptions'],
      operation: ['create'],
    },
  },
  default: '',
  description: 'The ID of the fund',
},
{
  displayName: 'Type',
  name: 'type',
  type: 'options',
  required: true,
  displayOptions: {
    show: {
      resource: ['redemptionsAndSubscriptions'],
      operation: ['create', 'update'],
    },
  },
  options: [
    {
      name: 'Redemption',
      value: 'redemption',
    },
    {
      name: 'Subscription',
      value: 'subscription',
    },
  ],
  default: 'subscription',
  description: 'The type of transaction',
},
{
  displayName: 'Amount',
  name: 'amount',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['redemptionsAndSubscriptions'],
      operation: ['create', 'update'],
    },
  },
  default: '',
  description: 'The amount to redeem or subscribe',
},
{
  displayName: 'Investor Address',
  name: 'investorAddress',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['redemptionsAndSubscriptions'],
      operation: ['create', 'update'],
    },
  },
  default: '',
  description: 'The address of the investor',
},
{
  displayName: 'Status',
  name: 'status',
  type: 'options',
  displayOptions: {
    show: {
      resource: ['redemptionsAndSubscriptions'],
      operation: ['create', 'update'],
    },
  },
  options: [
    {
      name: 'Pending',
      value: 'pending',
    },
    {
      name: 'Confirmed',
      value: 'confirmed',
    },
    {
      name: 'Failed',
      value: 'failed',
    },
  ],
  default: 'pending',
  description: 'The status of the transaction',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['redemptionsAndSubscriptions'],
      operation: ['getAll'],
    },
  },
  default: 100,
  description: 'Maximum number of records to return',
},
{
  displayName: 'Offset',
  name: 'offset',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['redemptionsAndSubscriptions'],
      operation: ['getAll'],
    },
  },
  default: 0,
  description: 'Number of records to skip',
},
{
  displayName: 'Lending ID',
  name: 'id',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['fluxFinanceLending'],
      operation: ['get', 'update', 'delete'],
    },
  },
  default: '',
  description: 'The ID of the lending position',
},
{
  displayName: 'Asset',
  name: 'asset',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['fluxFinanceLending'],
      operation: ['create'],
    },
  },
  default: '',
  description: 'The asset to lend',
},
{
  displayName: 'Amount',
  name: 'amount',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['fluxFinanceLending'],
      operation: ['create', 'update'],
    },
  },
  default: '',
  description: 'The amount to lend',
},
{
  displayName: 'Interest Rate',
  name: 'interestRate',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['fluxFinanceLending'],
      operation: ['create', 'update'],
    },
  },
  default: '',
  description: 'The interest rate for the lending position',
},
{
  displayName: 'Duration',
  name: 'duration',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['fluxFinanceLending'],
      operation: ['create', 'update'],
    },
  },
  default: 0,
  description: 'The duration of the lending position in days',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['fluxFinanceLending'],
      operation: ['getAll'],
    },
  },
  default: 10,
  description: 'Maximum number of results to return',
},
{
  displayName: 'Offset',
  name: 'offset',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['fluxFinanceLending'],
      operation: ['getAll'],
    },
  },
  default: 0,
  description: 'Number of results to skip',
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'usdyTokenOperations':
        return [await executeUsdyTokenOperationsOperations.call(this, items)];
      case 'ousgFundManagement':
        return [await executeOusgFundManagementOperations.call(this, items)];
      case 'ondoGlobalMarkets':
        return [await executeOndoGlobalMarketsOperations.call(this, items)];
      case 'tokenPricingAndNav':
        return [await executeTokenPricingAndNavOperations.call(this, items)];
      case 'redemptionsAndSubscriptions':
        return [await executeRedemptionsAndSubscriptionsOperations.call(this, items)];
      case 'fluxFinanceLending':
        return [await executeFluxFinanceLendingOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeUsdyTokenOperationsOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  
  const credentials = await this.getCredentials('ondoFinanceApi');
  const baseUrl = credentials.baseUrl || 'https://api.ondo.finance';

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'create':
          const tokenAddress = this.getNodeParameter('tokenAddress', i) as string;
          const amount = this.getNodeParameter('amount', i) as string;
          const operationType = this.getNodeParameter('operationType', i) as string;
          const recipientAddress = this.getNodeParameter('recipientAddress', i) as string;

          const createBody = {
            tokenAddress,
            amount,
            operationType,
            ...(recipientAddress && { recipientAddress }),
          };

          result = await this.helpers.requestWithAuthentication.call(this, 'ondoFinanceApi', {
            method: 'POST',
            url: `${baseUrl}/usdy-token-operations`,
            body: createBody,
            json: true,
          });
          break;

        case 'get':
          const getId = this.getNodeParameter('id', i) as string;
          
          result = await this.helpers.requestWithAuthentication.call(this, 'ondoFinanceApi', {
            method: 'GET',
            url: `${baseUrl}/usdy-token-operations/${getId}`,
            json: true,
          });
          break;

        case 'getAll':
          const limit = this.getNodeParameter('limit', i) as number;
          const offset = this.getNodeParameter('offset', i) as number;
          
          const queryParams = new URLSearchParams({
            limit: limit.toString(),
            offset: offset.toString(),
          });

          result = await this.helpers.requestWithAuthentication.call(this, 'ondoFinanceApi', {
            method: 'GET',
            url: `${baseUrl}/usdy-token-operations?${queryParams}`,
            json: true,
          });
          break;

        case 'update':
          const updateId = this.getNodeParameter('id', i) as string;
          const updateFields = this.getNodeParameter('updateFields', i) as any;
          
          result = await this.helpers.requestWithAuthentication.call(this, 'ondoFinanceApi', {
            method: 'PUT',
            url: `${baseUrl}/usdy-token-operations/${updateId}`,
            body: updateFields,
            json: true,
          });
          break;

        case 'delete':
          const deleteId = this.getNodeParameter('id', i) as string;
          
          result = await this.helpers.requestWithAuthentication.call(this, 'ondoFinanceApi', {
            method: 'DELETE',
            url: `${baseUrl}/usdy-token-operations/${deleteId}`,
            json: true,
          });
          break;

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeOusgFundManagementOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	
	// Get credentials - using a generic structure since API documentation is unavailable
	const credentials = await this.getCredentials('ondoFinanceApi');
	const baseUrl = credentials.baseUrl as string || 'https://api.ondo.finance';
	const apiKey = credentials.apiKey as string;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;
			
			switch (operation) {
				case 'create':
					const createData = {
						fundName: this.getNodeParameter('fundName', i) as string,
						managementStrategy: this.getNodeParameter('managementStrategy', i) as string,
						targetAllocation: this.getNodeParameter('targetAllocation', i) as number,
						riskProfile: this.getNodeParameter('riskProfile', i) as string,
					};
					
					result = await this.helpers.httpRequest({
						method: 'POST',
						url: `${baseUrl}/ousg-fund-management`,
						headers: {
							'Authorization': `Bearer ${apiKey}`,
							'Content-Type': 'application/json',
						},
						body: createData,
					});
					break;

				case 'get':
					const getId = this.getNodeParameter('id', i) as string;
					
					result = await this.helpers.httpRequest({
						method: 'GET',
						url: `${baseUrl}/ousg-fund-management/${getId}`,
						headers: {
							'Authorization': `Bearer ${apiKey}`,
						},
					});
					break;

				case 'getAll':
					const limit = this.getNodeParameter('limit', i, 50) as number;
					const offset = this.getNodeParameter('offset', i, 0) as number;
					
					result = await this.helpers.httpRequest({
						method: 'GET',
						url: `${baseUrl}/ousg-fund-management`,
						headers: {
							'Authorization': `Bearer ${apiKey}`,
						},
						qs: {
							limit,
							offset,
						},
					});
					break;

				case 'update':
					const updateId = this.getNodeParameter('id', i) as string;
					const updateData: any = {};
					
					// Only include fields that are provided
					const managementStrategy = this.getNodeParameter('managementStrategy', i, '') as string;
					const targetAllocation = this.getNodeParameter('targetAllocation', i, null) as number;
					const riskProfile = this.getNodeParameter('riskProfile', i, '') as string;
					
					if (managementStrategy) updateData.managementStrategy = managementStrategy;
					if (targetAllocation !== null) updateData.targetAllocation = targetAllocation;
					if (riskProfile) updateData.riskProfile = riskProfile;
					
					result = await this.helpers.httpRequest({
						method: 'PUT',
						url: `${baseUrl}/ousg-fund-management/${updateId}`,
						headers: {
							'Authorization': `Bearer ${apiKey}`,
							'Content-Type': 'application/json',
						},
						body: updateData,
					});
					break;

				case 'delete':
					const deleteId = this.getNodeParameter('id', i) as string;
					
					result = await this.helpers.httpRequest({
						method: 'DELETE',
						url: `${baseUrl}/ousg-fund-management/${deleteId}`,
						headers: {
							'Authorization': `Bearer ${apiKey}`,
						},
					});
					break;

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({ json: result, pairedItem: { item: i } });
		} catch (error) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw new NodeApiError(this.getNode(), error);
			}
		}
	}

	return returnData;
}

async function executeOndoGlobalMarketsOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  
  // Get credentials (API key, base URL, etc.)
  let credentials: any;
  try {
    credentials = await this.getCredentials('ondoFinanceApi');
  } catch (error) {
    throw new NodeOperationError(this.getNode(), 'No credentials provided');
  }

  const baseUrl = credentials.baseUrl || 'https://api.ondo.finance';

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'create': {
          const data = this.getNodeParameter('data', i) as object;
          
          const options = {
            method: 'POST',
            url: `${baseUrl}/ondo-global-markets`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: data,
          };

          result = await this.helpers.requestWithAuthentication.call(
            this,
            'ondoFinanceApi',
            options,
          );
          break;
        }

        case 'get': {
          const id = this.getNodeParameter('id', i) as string;
          
          const options = {
            method: 'GET',
            url: `${baseUrl}/ondo-global-markets/${id}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
          };

          result = await this.helpers.requestWithAuthentication.call(
            this,
            'ondoFinanceApi',
            options,
          );
          break;
        }

        case 'getAll': {
          const limit = this.getNodeParameter('limit', i, 100) as number;
          const offset = this.getNodeParameter('offset', i, 0) as number;
          
          const options = {
            method: 'GET',
            url: `${baseUrl}/ondo-global-markets`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            qs: {
              limit,
              offset,
            },
          };

          result = await this.helpers.requestWithAuthentication.call(
            this,
            'ondoFinanceApi',
            options,
          );
          break;
        }

        case 'update': {
          const id = this.getNodeParameter('id', i) as string;
          const data = this.getNodeParameter('data', i) as object;
          
          const options = {
            method: 'PUT',
            url: `${baseUrl}/ondo-global-markets/${id}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: data,
          };

          result = await this.helpers.requestWithAuthentication.call(
            this,
            'ondoFinanceApi',
            options,
          );
          break;
        }

        case 'delete': {
          const id = this.getNodeParameter('id', i) as string;
          
          const options = {
            method: 'DELETE',
            url: `${baseUrl}/ondo-global-markets/${id}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
          };

          result = await this.helpers.requestWithAuthentication.call(
            this,
            'ondoFinanceApi',
            options,
          );
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ 
        json: result,
        pairedItem: { item: i }
      });

    } catch (error) {
      if (this.continueOnFail()) {
        returnData.push({ 
          json: { error: error.message },
          pairedItem: { item: i }
        });
      } else {
        if (error.response) {
          throw new NodeApiError(this.getNode(), error);
        }
        throw new NodeOperationError(this.getNode(), error.message);
      }
    }
  }

  return returnData;
}

async function executeTokenPricingAndNavOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  
  const credentials = await this.getCredentials('ondoFinanceApi');
  const baseUrl = credentials?.baseUrl || 'https://api.ondo.finance';
  const apiKey = credentials?.apiKey as string;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      const requestOptions: any = {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        json: true,
      };

      switch (operation) {
        case 'create':
          const createData = {
            tokenSymbol: this.getNodeParameter('tokenSymbol', i) as string,
            price: this.getNodeParameter('price', i) as number,
            nav: this.getNodeParameter('nav', i) as number,
            currency: this.getNodeParameter('currency', i) as string,
            timestamp: this.getNodeParameter('timestamp', i) as string,
          };
          
          result = await this.helpers.httpRequest({
            method: 'POST',
            url: `${baseUrl}/token-pricing-and-nav`,
            body: createData,
            ...requestOptions,
          });
          break;

        case 'get':
          const getId = this.getNodeParameter('id', i) as string;
          
          result = await this.helpers.httpRequest({
            method: 'GET',
            url: `${baseUrl}/token-pricing-and-nav/${getId}`,
            ...requestOptions,
          });
          break;

        case 'getAll':
          const limit = this.getNodeParameter('limit', i) as number;
          const offset = this.getNodeParameter('offset', i) as number;
          
          result = await this.helpers.httpRequest({
            method: 'GET',
            url: `${baseUrl}/token-pricing-and-nav`,
            qs: {
              limit,
              offset,
            },
            ...requestOptions,
          });
          break;

        case 'update':
          const updateId = this.getNodeParameter('id', i) as string;
          const updateData = {
            tokenSymbol: this.getNodeParameter('tokenSymbol', i) as string,
            price: this.getNodeParameter('price', i) as number,
            nav: this.getNodeParameter('nav', i) as number,
            currency: this.getNodeParameter('currency', i) as string,
            timestamp: this.getNodeParameter('timestamp', i) as string,
          };
          
          result = await this.helpers.httpRequest({
            method: 'PUT',
            url: `${baseUrl}/token-pricing-and-nav/${updateId}`,
            body: updateData,
            ...requestOptions,
          });
          break;

        case 'delete':
          const deleteId = this.getNodeParameter('id', i) as string;
          
          result = await this.helpers.httpRequest({
            method: 'DELETE',
            url: `${baseUrl}/token-pricing-and-nav/${deleteId}`,
            ...requestOptions,
          });
          break;

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error) {
      if (this.continueOnFail()) {
        returnData.push({ 
          json: { error: error.message }, 
          pairedItem: { item: i } 
        });
      } else {
        throw new NodeApiError(this.getNode(), error);
      }
    }
  }

  return returnData;
}

async function executeRedemptionsAndSubscriptionsOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  
  const credentials = await this.getCredentials('ondoFinanceApi');
  const baseUrl = credentials.baseUrl || 'https://api.ondo.finance';
  const apiKey = credentials.apiKey as string;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      
      const requestOptions: any = {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        json: true,
      };

      switch (operation) {
        case 'create':
          const fundId = this.getNodeParameter('fundId', i) as string;
          const type = this.getNodeParameter('type', i) as string;
          const amount = this.getNodeParameter('amount', i) as string;
          const investorAddress = this.getNodeParameter('investorAddress', i) as string;
          const status = this.getNodeParameter('status', i) as string;
          
          requestOptions.method = 'POST';
          requestOptions.url = `${baseUrl}/redemptions-and-subscriptions`;
          requestOptions.body = {
            fundId,
            type,
            amount,
            investorAddress,
            status,
          };
          
          result = await this.helpers.httpRequest(requestOptions);
          break;

        case 'get':
          const getId = this.getNodeParameter('id', i) as string;
          
          requestOptions.method = 'GET';
          requestOptions.url = `${baseUrl}/redemptions-and-subscriptions/${getId}`;
          
          result = await this.helpers.httpRequest(requestOptions);
          break;

        case 'getAll':
          const limit = this.getNodeParameter('limit', i, 100) as number;
          const offset = this.getNodeParameter('offset', i, 0) as number;
          
          requestOptions.method = 'GET';
          requestOptions.url = `${baseUrl}/redemptions-and-subscriptions`;
          requestOptions.qs = { limit, offset };
          
          result = await this.helpers.httpRequest(requestOptions);
          break;

        case 'update':
          const updateId = this.getNodeParameter('id', i) as string;
          const updateType = this.getNodeParameter('type', i) as string;
          const updateAmount = this.getNodeParameter('amount', i) as string;
          const updateInvestorAddress = this.getNodeParameter('investorAddress', i) as string;
          const updateStatus = this.getNodeParameter('status', i) as string;
          
          requestOptions.method = 'PUT';
          requestOptions.url = `${baseUrl}/redemptions-and-subscriptions/${updateId}`;
          requestOptions.body = {
            type: updateType,
            amount: updateAmount,
            investorAddress: updateInvestorAddress,
            status: updateStatus,
          };
          
          result = await this.helpers.httpRequest(requestOptions);
          break;

        case 'delete':
          const deleteId = this.getNodeParameter('id', i) as string;
          
          requestOptions.method = 'DELETE';
          requestOptions.url = `${baseUrl}/redemptions-and-subscriptions/${deleteId}`;
          
          result = await this.helpers.httpRequest(requestOptions);
          break;

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`, {
            itemIndex: i,
          });
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });
    } catch (error) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        throw new NodeApiError(this.getNode(), error, { itemIndex: i });
      }
    }
  }

  return returnData;
}

async function executeFluxFinanceLendingOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;

  // Get credentials
  let credentials;
  try {
    credentials = await this.getCredentials('ondoFinanceApi');
  } catch (error) {
    throw new NodeApiError(this.getNode(), error as JsonObject);
  }

  const baseUrl = credentials.baseUrl || 'https://api.fluxfinance.com';

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'create':
          const asset = this.getNodeParameter('asset', i) as string;
          const amount = this.getNodeParameter('amount', i) as string;
          const interestRate = this.getNodeParameter('interestRate', i, '') as string;
          const duration = this.getNodeParameter('duration', i, 0) as number;

          const createBody: any = {
            asset,
            amount,
          };

          if (interestRate) {
            createBody.interestRate = interestRate;
          }

          if (duration > 0) {
            createBody.duration = duration;
          }

          result = await this.helpers.requestWithAuthentication.call(this, 'ondoFinanceApi', {
            method: 'POST',
            url: `${baseUrl}/flux-finance-lending`,
            body: createBody,
            json: true,
          });
          break;

        case 'get':
          const getId = this.getNodeParameter('id', i) as string;
          result = await this.helpers.requestWithAuthentication.call(this, 'ondoFinanceApi', {
            method: 'GET',
            url: `${baseUrl}/flux-finance-lending/${getId}`,
            json: true,
          });
          break;

        case 'getAll':
          const limit = this.getNodeParameter('limit', i, 10) as number;
          const offset = this.getNodeParameter('offset', i, 0) as number;
          
          const queryParams = new URLSearchParams();
          queryParams.append('limit', limit.toString());
          queryParams.append('offset', offset.toString());

          result = await this.helpers.requestWithAuthentication.call(this, 'ondoFinanceApi', {
            method: 'GET',
            url: `${baseUrl}/flux-finance-lending?${queryParams.toString()}`,
            json: true,
          });
          break;

        case 'update':
          const updateId = this.getNodeParameter('id', i) as string;
          const updateAmount = this.getNodeParameter('amount', i) as string;
          const updateInterestRate = this.getNodeParameter('interestRate', i, '') as string;
          const updateDuration = this.getNodeParameter('duration', i, 0) as number;

          const updateBody: any = {
            amount: updateAmount,
          };

          if (updateInterestRate) {
            updateBody.interestRate = updateInterestRate;
          }

          if (updateDuration > 0) {
            updateBody.duration = updateDuration;
          }

          result = await this.helpers.requestWithAuthentication.call(this, 'ondoFinanceApi', {
            method: 'PUT',
            url: `${baseUrl}/flux-finance-lending/${updateId}`,
            body: updateBody,
            json: true,
          });
          break;

        case 'delete':
          const deleteId = this.getNodeParameter('id', i) as string;
          result = await this.helpers.requestWithAuthentication.call(this, 'ondoFinanceApi', {
            method: 'DELETE',
            url: `${baseUrl}/flux-finance-lending/${deleteId}`,
            json: true,
          });
          break;

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error) {
      if (this.continueOnFail()) {
        returnData.push({ 
          json: { error: error.message }, 
          pairedItem: { item: i } 
        });
      } else {
        throw new NodeApiError(this.getNode(), error as JsonObject);
      }
    }
  }

  return returnData;
}
