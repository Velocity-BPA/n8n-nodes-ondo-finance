/**
 * Copyright (c) 2026 Velocity BPA
 * Licensed under the Business Source License 1.1
 */

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { OndoFinance } from '../nodes/Ondo Finance/Ondo Finance.node';

// Mock n8n-workflow
jest.mock('n8n-workflow', () => ({
  ...jest.requireActual('n8n-workflow'),
  NodeApiError: class NodeApiError extends Error {
    constructor(node: any, error: any) { super(error.message || 'API Error'); }
  },
  NodeOperationError: class NodeOperationError extends Error {
    constructor(node: any, message: string) { super(message); }
  },
}));

describe('OndoFinance Node', () => {
  let node: OndoFinance;

  beforeAll(() => {
    node = new OndoFinance();
  });

  describe('Node Definition', () => {
    it('should have correct basic properties', () => {
      expect(node.description.displayName).toBe('Ondo Finance');
      expect(node.description.name).toBe('ondofinance');
      expect(node.description.version).toBe(1);
      expect(node.description.inputs).toContain('main');
      expect(node.description.outputs).toContain('main');
    });

    it('should define 6 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(6);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(6);
    });

    it('should require credentials', () => {
      expect(node.description.credentials).toBeDefined();
      expect(node.description.credentials!.length).toBeGreaterThan(0);
      expect(node.description.credentials![0].required).toBe(true);
    });

    it('should have parameters with proper displayOptions', () => {
      const params = node.description.properties.filter(
        (p: any) => p.displayOptions?.show?.resource
      );
      for (const param of params) {
        expect(param.displayOptions.show.resource).toBeDefined();
        expect(Array.isArray(param.displayOptions.show.resource)).toBe(true);
      }
    });
  });

  // Resource-specific tests
describe('UsdyTokenOperations Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://api.ondo.finance',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  describe('create operation', () => {
    it('should create USDY token operation successfully', async () => {
      const mockResponse = {
        id: 'op_123',
        tokenAddress: '0x96F6eF951840721AdBF46Ac996b59E0235CB985C',
        amount: '1000',
        operationType: 'transfer',
        status: 'pending',
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        const params = {
          operation: 'create',
          tokenAddress: '0x96F6eF951840721AdBF46Ac996b59E0235CB985C',
          amount: '1000',
          operationType: 'transfer',
          recipientAddress: '0x742d35Cc6634C0532925a3b8D341B1f4f5a9F',
        };
        return params[param as keyof typeof params];
      });

      mockExecuteFunctions.helpers.requestWithAuthentication.mockResolvedValue(mockResponse);

      const result = await executeUsdyTokenOperationsOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.requestWithAuthentication).toHaveBeenCalledWith('ondoFinanceApi', {
        method: 'POST',
        url: 'https://api.ondo.finance/usdy-token-operations',
        body: {
          tokenAddress: '0x96F6eF951840721AdBF46Ac996b59E0235CB985C',
          amount: '1000',
          operationType: 'transfer',
          recipientAddress: '0x742d35Cc6634C0532925a3b8D341B1f4f5a9F',
        },
        json: true,
      });
    });

    it('should handle create operation error', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValue('create');
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);
      mockExecuteFunctions.helpers.requestWithAuthentication.mockRejectedValue(new Error('API Error'));

      const result = await executeUsdyTokenOperationsOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
    });
  });

  describe('get operation', () => {
    it('should get USDY token operation successfully', async () => {
      const mockResponse = {
        id: 'op_123',
        tokenAddress: '0x96F6eF951840721AdBF46Ac996b59E0235CB985C',
        amount: '1000',
        operationType: 'transfer',
        status: 'completed',
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        const params = {
          operation: 'get',
          id: 'op_123',
        };
        return params[param as keyof typeof params];
      });

      mockExecuteFunctions.helpers.requestWithAuthentication.mockResolvedValue(mockResponse);

      const result = await executeUsdyTokenOperationsOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.requestWithAuthentication).toHaveBeenCalledWith('ondoFinanceApi', {
        method: 'GET',
        url: 'https://api.ondo.finance/usdy-token-operations/op_123',
        json: true,
      });
    });
  });

  describe('getAll operation', () => {
    it('should list USDY token operations successfully', async () => {
      const mockResponse = {
        operations: [
          { id: 'op_123', tokenAddress: '0x96F6eF951840721AdBF46Ac996b59E0235CB985C' },
          { id: 'op_124', tokenAddress: '0x96F6eF951840721AdBF46Ac996b59E0235CB985C' },
        ],
        total: 2,
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        const params = {
          operation: 'getAll',
          limit: 100,
          offset: 0,
        };
        return params[param as keyof typeof params];
      });

      mockExecuteFunctions.helpers.requestWithAuthentication.mockResolvedValue(mockResponse);

      const result = await executeUsdyTokenOperationsOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.requestWithAuthentication).toHaveBeenCalledWith('ondoFinanceApi', {
        method: 'GET',
        url: 'https://api.ondo.finance/usdy-token-operations?limit=100&offset=0',
        json: true,
      });
    });
  });

  describe('update operation', () => {
    it('should update USDY token operation successfully', async () => {
      const mockResponse = {
        id: 'op_123',
        tokenAddress: '0x96F6eF951840721AdBF46Ac996b59E0235CB985C',
        amount: '2000',
        status: 'completed',
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        const params = {
          operation: 'update',
          id: 'op_123',
          updateFields: { amount: '2000', status: 'completed' },
        };
        return params[param as keyof typeof params];
      });

      mockExecuteFunctions.helpers.requestWithAuthentication.mockResolvedValue(mockResponse);

      const result = await executeUsdyTokenOperationsOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.requestWithAuthentication).toHaveBeenCalledWith('ondoFinanceApi', {
        method: 'PUT',
        url: 'https://api.ondo.finance/usdy-token-operations/op_123',
        body: { amount: '2000', status: 'completed' },
        json: true,
      });
    });
  });

  describe('delete operation', () => {
    it('should delete USDY token operation successfully', async () => {
      const mockResponse = { success: true, message: 'Operation deleted' };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        const params = {
          operation: 'delete',
          id: 'op_123',
        };
        return params[param as keyof typeof params];
      });

      mockExecuteFunctions.helpers.requestWithAuthentication.mockResolvedValue(mockResponse);

      const result = await executeUsdyTokenOperationsOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.requestWithAuthentication).toHaveBeenCalledWith('ondoFinanceApi', {
        method: 'DELETE',
        url: 'https://api.ondo.finance/usdy-token-operations/op_123',
        json: true,
      });
    });
  });
});

describe('OusgFundManagement Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-api-key',
				baseUrl: 'https://api.ondo.finance',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	describe('create operation', () => {
		it('should create OUSG fund management successfully', async () => {
			const mockResponse = {
				id: '123',
				fundName: 'Test Fund',
				managementStrategy: 'active',
				targetAllocation: 75,
				riskProfile: 'moderate',
			};

			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'create';
					case 'fundName': return 'Test Fund';
					case 'managementStrategy': return 'active';
					case 'targetAllocation': return 75;
					case 'riskProfile': return 'moderate';
					default: return undefined;
				}
			});

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeOusgFundManagementOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'POST',
				url: 'https://api.ondo.finance/ousg-fund-management',
				headers: {
					'Authorization': 'Bearer test-api-key',
					'Content-Type': 'application/json',
				},
				body: {
					fundName: 'Test Fund',
					managementStrategy: 'active',
					targetAllocation: 75,
					riskProfile: 'moderate',
				},
			});
		});

		it('should handle create operation error', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				if (param === 'operation') return 'create';
				return 'test-value';
			});

			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

			await expect(
				executeOusgFundManagementOperations.call(mockExecuteFunctions, [{ json: {} }]),
			).rejects.toThrow();
		});
	});

	describe('get operation', () => {
		it('should get OUSG fund management by ID successfully', async () => {
			const mockResponse = {
				id: '123',
				fundName: 'Test Fund',
				managementStrategy: 'active',
			};

			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'get';
					case 'id': return '123';
					default: return undefined;
				}
			});

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeOusgFundManagementOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.ondo.finance/ousg-fund-management/123',
				headers: {
					'Authorization': 'Bearer test-api-key',
				},
			});
		});
	});

	describe('getAll operation', () => {
		it('should get all OUSG fund managements successfully', async () => {
			const mockResponse = {
				data: [
					{ id: '123', fundName: 'Fund 1' },
					{ id: '456', fundName: 'Fund 2' },
				],
				total: 2,
			};

			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string, index: number, defaultValue?: any) => {
				switch (param) {
					case 'operation': return 'getAll';
					case 'limit': return defaultValue || 50;
					case 'offset': return defaultValue || 0;
					default: return undefined;
				}
			});

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeOusgFundManagementOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.ondo.finance/ousg-fund-management',
				headers: {
					'Authorization': 'Bearer test-api-key',
				},
				qs: {
					limit: 50,
					offset: 0,
				},
			});
		});
	});

	describe('update operation', () => {
		it('should update OUSG fund management successfully', async () => {
			const mockResponse = {
				id: '123',
				fundName: 'Updated Fund',
				managementStrategy: 'passive',
			};

			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string, index: number, defaultValue?: any) => {
				switch (param) {
					case 'operation': return 'update';
					case 'id': return '123';
					case 'managementStrategy': return 'passive';
					case 'targetAllocation': return defaultValue;
					case 'riskProfile': return '';
					default: return undefined;
				}
			});

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeOusgFundManagementOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'PUT',
				url: 'https://api.ondo.finance/ousg-fund-management/123',
				headers: {
					'Authorization': 'Bearer test-api-key',
					'Content-Type': 'application/json',
				},
				body: {
					managementStrategy: 'passive',
				},
			});
		});
	});

	describe('delete operation', () => {
		it('should delete OUSG fund management successfully', async () => {
			const mockResponse = { success: true };

			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'delete';
					case 'id': return '123';
					default: return undefined;
				}
			});

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeOusgFundManagementOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'DELETE',
				url: 'https://api.ondo.finance/ousg-fund-management/123',
				headers: {
					'Authorization': 'Bearer test-api-key',
				},
			});
		});
	});

	it('should handle unknown operation error', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValue('unknownOperation');

		await expect(
			executeOusgFundManagementOperations.call(mockExecuteFunctions, [{ json: {} }]),
		).rejects.toThrow('Unknown operation: unknownOperation');
	});

	it('should handle continue on fail', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValue('create');
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

		const result = await executeOusgFundManagementOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
	});
});

describe('OndoGlobalMarkets Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://api.ondo.finance',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  describe('create operation', () => {
    it('should create Ondo Global Markets record successfully', async () => {
      const mockResponse = { id: '123', name: 'Test Market', status: 'created' };
      
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        if (param === 'operation') return 'create';
        if (param === 'data') return { name: 'Test Market', type: 'global' };
        return undefined;
      });

      mockExecuteFunctions.helpers.requestWithAuthentication.mockResolvedValue(mockResponse);

      const result = await executeOndoGlobalMarketsOperations.call(
        mockExecuteFunctions,
        [{ json: {} }],
      );

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.requestWithAuthentication).toHaveBeenCalledWith(
        'ondoFinanceApi',
        expect.objectContaining({
          method: 'POST',
          url: 'https://api.ondo.finance/ondo-global-markets',
          json: { name: 'Test Market', type: 'global' },
        }),
      );
    });

    it('should handle create operation errors', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        if (param === 'operation') return 'create';
        if (param === 'data') return { name: 'Test Market' };
        return undefined;
      });

      mockExecuteFunctions.helpers.requestWithAuthentication.mockRejectedValue(
        new Error('API Error'),
      );

      await expect(
        executeOndoGlobalMarketsOperations.call(mockExecuteFunctions, [{ json: {} }]),
      ).rejects.toThrow('API Error');
    });
  });

  describe('get operation', () => {
    it('should get Ondo Global Markets record successfully', async () => {
      const mockResponse = { id: '123', name: 'Test Market', status: 'active' };
      
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        if (param === 'operation') return 'get';
        if (param === 'id') return '123';
        return undefined;
      });

      mockExecuteFunctions.helpers.requestWithAuthentication.mockResolvedValue(mockResponse);

      const result = await executeOndoGlobalMarketsOperations.call(
        mockExecuteFunctions,
        [{ json: {} }],
      );

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.requestWithAuthentication).toHaveBeenCalledWith(
        'ondoFinanceApi',
        expect.objectContaining({
          method: 'GET',
          url: 'https://api.ondo.finance/ondo-global-markets/123',
        }),
      );
    });
  });

  describe('getAll operation', () => {
    it('should list Ondo Global Markets records successfully', async () => {
      const mockResponse = { 
        data: [
          { id: '123', name: 'Market 1' },
          { id: '124', name: 'Market 2' }
        ],
        total: 2
      };
      
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string, index: number, defaultValue?: any) => {
        if (param === 'operation') return 'getAll';
        if (param === 'limit') return defaultValue || 100;
        if (param === 'offset') return defaultValue || 0;
        return undefined;
      });

      mockExecuteFunctions.helpers.requestWithAuthentication.mockResolvedValue(mockResponse);

      const result = await executeOndoGlobalMarketsOperations.call(
        mockExecuteFunctions,
        [{ json: {} }],
      );

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.requestWithAuthentication).toHaveBeenCalledWith(
        'ondoFinanceApi',
        expect.objectContaining({
          method: 'GET',
          url: 'https://api.ondo.finance/ondo-global-markets',
          qs: { limit: 100, offset: 0 },
        }),
      );
    });
  });

  describe('update operation', () => {
    it('should update Ondo Global Markets record successfully', async () => {
      const mockResponse = { id: '123', name: 'Updated Market', status: 'updated' };
      
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        if (param === 'operation') return 'update';
        if (param === 'id') return '123';
        if (param === 'data') return { name: 'Updated Market' };
        return undefined;
      });

      mockExecuteFunctions.helpers.requestWithAuthentication.mockResolvedValue(mockResponse);

      const result = await executeOndoGlobalMarketsOperations.call(
        mockExecuteFunctions,
        [{ json: {} }],
      );

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.requestWithAuthentication).toHaveBeenCalledWith(
        'ondoFinanceApi',
        expect.objectContaining({
          method: 'PUT',
          url: 'https://api.ondo.finance/ondo-global-markets/123',
          json: { name: 'Updated Market' },
        }),
      );
    });
  });

  describe('delete operation', () => {
    it('should delete Ondo Global Markets record successfully', async () => {
      const mockResponse = { success: true, message: 'Deleted successfully' };
      
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        if (param === 'operation') return 'delete';
        if (param === 'id') return '123';
        return undefined;
      });

      mockExecuteFunctions.helpers.requestWithAuthentication.mockResolvedValue(mockResponse);

      const result = await executeOndoGlobalMarketsOperations.call(
        mockExecuteFunctions,
        [{ json: {} }],
      );

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.requestWithAuthentication).toHaveBeenCalledWith(
        'ondoFinanceApi',
        expect.objectContaining({
          method: 'DELETE',
          url: 'https://api.ondo.finance/ondo-global-markets/123',
        }),
      );
    });
  });

  describe('error handling', () => {
    it('should handle unknown operations', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValue('unknownOperation');

      await expect(
        executeOndoGlobalMarketsOperations.call(mockExecuteFunctions, [{ json: {} }]),
      ).rejects.toThrow('Unknown operation: unknownOperation');
    });

    it('should continue on fail when configured', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        if (param === 'operation') return 'get';
        if (param === 'id') return '123';
        return undefined;
      });

      mockExecuteFunctions.continueOnFail.mockReturnValue(true);
      mockExecuteFunctions.helpers.requestWithAuthentication.mockRejectedValue(
        new Error('API Error'),
      );

      const result = await executeOndoGlobalMarketsOperations.call(
        mockExecuteFunctions,
        [{ json: {} }],
      );

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual({ error: 'API Error' });
    });
  });
});

describe('TokenPricingAndNav Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://api.ondo.finance',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  describe('create operation', () => {
    it('should create token pricing and NAV successfully', async () => {
      const mockResponse = {
        id: '123',
        tokenSymbol: 'OUSG',
        price: 100.5,
        nav: 99.8,
        currency: 'USD',
        timestamp: '2023-12-01T12:00:00Z',
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        const params: any = {
          operation: 'create',
          tokenSymbol: 'OUSG',
          price: 100.5,
          nav: 99.8,
          currency: 'USD',
          timestamp: '2023-12-01T12:00:00Z',
        };
        return params[param];
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const items = [{ json: {} }];
      const result = await executeTokenPricingAndNavOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'https://api.ondo.finance/token-pricing-and-nav',
        body: {
          tokenSymbol: 'OUSG',
          price: 100.5,
          nav: 99.8,
          currency: 'USD',
          timestamp: '2023-12-01T12:00:00Z',
        },
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json',
        },
        json: true,
      });
    });

    it('should handle create operation errors', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        return param === 'operation' ? 'create' : 'test-value';
      });

      const error = new Error('API Error');
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(error);
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);

      const items = [{ json: {} }];
      const result = await executeTokenPricingAndNavOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
    });
  });

  describe('get operation', () => {
    it('should get token pricing and NAV by ID successfully', async () => {
      const mockResponse = {
        id: '123',
        tokenSymbol: 'OUSG',
        price: 100.5,
        nav: 99.8,
        currency: 'USD',
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        const params: any = {
          operation: 'get',
          id: '123',
        };
        return params[param];
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const items = [{ json: {} }];
      const result = await executeTokenPricingAndNavOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.ondo.finance/token-pricing-and-nav/123',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json',
        },
        json: true,
      });
    });
  });

  describe('getAll operation', () => {
    it('should list token pricing and NAV successfully', async () => {
      const mockResponse = {
        data: [
          { id: '123', tokenSymbol: 'OUSG', price: 100.5 },
          { id: '456', tokenSymbol: 'OMMF', price: 1.0 },
        ],
        total: 2,
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        const params: any = {
          operation: 'getAll',
          limit: 10,
          offset: 0,
        };
        return params[param];
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const items = [{ json: {} }];
      const result = await executeTokenPricingAndNavOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.ondo.finance/token-pricing-and-nav',
        qs: {
          limit: 10,
          offset: 0,
        },
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json',
        },
        json: true,
      });
    });
  });

  describe('update operation', () => {
    it('should update token pricing and NAV successfully', async () => {
      const mockResponse = {
        id: '123',
        tokenSymbol: 'OUSG',
        price: 101.0,
        nav: 100.2,
        currency: 'USD',
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        const params: any = {
          operation: 'update',
          id: '123',
          tokenSymbol: 'OUSG',
          price: 101.0,
          nav: 100.2,
          currency: 'USD',
          timestamp: '2023-12-02T12:00:00Z',
        };
        return params[param];
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const items = [{ json: {} }];
      const result = await executeTokenPricingAndNavOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'PUT',
        url: 'https://api.ondo.finance/token-pricing-and-nav/123',
        body: {
          tokenSymbol: 'OUSG',
          price: 101.0,
          nav: 100.2,
          currency: 'USD',
          timestamp: '2023-12-02T12:00:00Z',
        },
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json',
        },
        json: true,
      });
    });
  });

  describe('delete operation', () => {
    it('should delete token pricing and NAV successfully', async () => {
      const mockResponse = { success: true };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        const params: any = {
          operation: 'delete',
          id: '123',
        };
        return params[param];
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const items = [{ json: {} }];
      const result = await executeTokenPricingAndNavOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'DELETE',
        url: 'https://api.ondo.finance/token-pricing-and-nav/123',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json',
        },
        json: true,
      });
    });
  });
});

describe('RedemptionsAndSubscriptions Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'Unable to locate public API documentation or base URL',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  describe('create operation', () => {
    it('should create redemptions and subscriptions successfully', async () => {
      const mockResponse = {
        id: 'redemption-123',
        fundId: 'fund-456',
        type: 'subscription',
        amount: '1000.00',
        investorAddress: '0x123...',
        status: 'pending',
        createdAt: '2024-01-01T00:00:00Z',
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        const params: any = {
          operation: 'create',
          fundId: 'fund-456',
          type: 'subscription',
          amount: '1000.00',
          investorAddress: '0x123...',
          status: 'pending',
        };
        return params[param];
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeRedemptionsAndSubscriptionsOperations.call(
        mockExecuteFunctions,
        [{ json: {} }],
      );

      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'Unable to locate public API documentation or base URL/redemptions-and-subscriptions',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json',
        },
        body: {
          fundId: 'fund-456',
          type: 'subscription',
          amount: '1000.00',
          investorAddress: '0x123...',
          status: 'pending',
        },
        json: true,
      });
    });
  });

  describe('get operation', () => {
    it('should get redemptions and subscriptions by ID successfully', async () => {
      const mockResponse = {
        id: 'redemption-123',
        fundId: 'fund-456',
        type: 'redemption',
        amount: '500.00',
        investorAddress: '0x456...',
        status: 'confirmed',
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        const params: any = {
          operation: 'get',
          id: 'redemption-123',
        };
        return params[param];
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeRedemptionsAndSubscriptionsOperations.call(
        mockExecuteFunctions,
        [{ json: {} }],
      );

      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'Unable to locate public API documentation or base URL/redemptions-and-subscriptions/redemption-123',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json',
        },
        json: true,
      });
    });
  });

  describe('getAll operation', () => {
    it('should list all redemptions and subscriptions successfully', async () => {
      const mockResponse = {
        data: [
          {
            id: 'redemption-123',
            fundId: 'fund-456',
            type: 'subscription',
            amount: '1000.00',
            status: 'confirmed',
          },
        ],
        total: 1,
        limit: 100,
        offset: 0,
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string, index: number, defaultValue?: any) => {
        const params: any = {
          operation: 'getAll',
          limit: defaultValue || 100,
          offset: defaultValue || 0,
        };
        return params[param];
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeRedemptionsAndSubscriptionsOperations.call(
        mockExecuteFunctions,
        [{ json: {} }],
      );

      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'Unable to locate public API documentation or base URL/redemptions-and-subscriptions',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json',
        },
        qs: { limit: 100, offset: 0 },
        json: true,
      });
    });
  });

  describe('update operation', () => {
    it('should update redemptions and subscriptions successfully', async () => {
      const mockResponse = {
        id: 'redemption-123',
        fundId: 'fund-456',
        type: 'redemption',
        amount: '750.00',
        investorAddress: '0x789...',
        status: 'confirmed',
        updatedAt: '2024-01-02T00:00:00Z',
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        const params: any = {
          operation: 'update',
          id: 'redemption-123',
          type: 'redemption',
          amount: '750.00',
          investorAddress: '0x789...',
          status: 'confirmed',
        };
        return params[param];
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeRedemptionsAndSubscriptionsOperations.call(
        mockExecuteFunctions,
        [{ json: {} }],
      );

      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'PUT',
        url: 'Unable to locate public API documentation or base URL/redemptions-and-subscriptions/redemption-123',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json',
        },
        body: {
          type: 'redemption',
          amount: '750.00',
          investorAddress: '0x789...',
          status: 'confirmed',
        },
        json: true,
      });
    });
  });

  describe('delete operation', () => {
    it('should delete redemptions and subscriptions successfully', async () => {
      const mockResponse = { success: true };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        const params: any = {
          operation: 'delete',
          id: 'redemption-123',
        };
        return params[param];
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeRedemptionsAndSubscriptionsOperations.call(
        mockExecuteFunctions,
        [{ json: {} }],
      );

      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'DELETE',
        url: 'Unable to locate public API documentation or base URL/redemptions-and-subscriptions/redemption-123',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json',
        },
        json: true,
      });
    });
  });

  describe('error handling', () => {
    it('should handle API errors properly', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        const params: any = {
          operation: 'get',
          id: 'invalid-id',
        };
        return params[param];
      });

      const apiError = new Error('Redemption and subscription not found');
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(apiError);

      await expect(
        executeRedemptionsAndSubscriptionsOperations.call(mockExecuteFunctions, [{ json: {} }]),
      ).rejects.toThrow('Redemption and subscription not found');
    });

    it('should continue on fail when configured', async () => {
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        const params: any = {
          operation: 'get',
          id: 'invalid-id',
        };
        return params[param];
      });

      const apiError = new Error('API Error');
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(apiError);

      const result = await executeRedemptionsAndSubscriptionsOperations.call(
        mockExecuteFunctions,
        [{ json: {} }],
      );

      expect(result[0].json.error).toEqual('API Error');
    });
  });
});

describe('FluxFinanceLending Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://api.fluxfinance.com',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  test('should create flux finance lending successfully', async () => {
    const mockResponse = {
      id: '123',
      asset: 'ETH',
      amount: '100',
      status: 'created',
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      const params: any = {
        operation: 'create',
        asset: 'ETH',
        amount: '100',
        interestRate: '5.5',
        duration: 30,
      };
      return params[param];
    });

    mockExecuteFunctions.helpers.requestWithAuthentication.mockResolvedValue(mockResponse);

    const result = await executeFluxFinanceLendingOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    expect(mockExecuteFunctions.helpers.requestWithAuthentication).toHaveBeenCalledWith(
      'ondoFinanceApi',
      {
        method: 'POST',
        url: 'https://api.fluxfinance.com/flux-finance-lending',
        body: {
          asset: 'ETH',
          amount: '100',
          interestRate: '5.5',
          duration: 30,
        },
        json: true,
      }
    );
  });

  test('should get flux finance lending by id successfully', async () => {
    const mockResponse = {
      id: '123',
      asset: 'ETH',
      amount: '100',
      status: 'active',
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      const params: any = {
        operation: 'get',
        id: '123',
      };
      return params[param];
    });

    mockExecuteFunctions.helpers.requestWithAuthentication.mockResolvedValue(mockResponse);

    const result = await executeFluxFinanceLendingOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    expect(mockExecuteFunctions.helpers.requestWithAuthentication).toHaveBeenCalledWith(
      'ondoFinanceApi',
      {
        method: 'GET',
        url: 'https://api.fluxfinance.com/flux-finance-lending/123',
        json: true,
      }
    );
  });

  test('should get all flux finance lending with pagination', async () => {
    const mockResponse = {
      data: [
        { id: '123', asset: 'ETH', amount: '100' },
        { id: '456', asset: 'BTC', amount: '50' },
      ],
      total: 2,
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      const params: any = {
        operation: 'getAll',
        limit: 10,
        offset: 0,
      };
      return params[param];
    });

    mockExecuteFunctions.helpers.requestWithAuthentication.mockResolvedValue(mockResponse);

    const result = await executeFluxFinanceLendingOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    expect(mockExecuteFunctions.helpers.requestWithAuthentication).toHaveBeenCalledWith(
      'ondoFinanceApi',
      {
        method: 'GET',
        url: 'https://api.fluxfinance.com/flux-finance-lending?limit=10&offset=0',
        json: true,
      }
    );
  });

  test('should update flux finance lending successfully', async () => {
    const mockResponse = {
      id: '123',
      asset: 'ETH',
      amount: '150',
      status: 'updated',
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      const params: any = {
        operation: 'update',
        id: '123',
        amount: '150',
        interestRate: '6.0',
      };
      return params[param];
    });

    mockExecuteFunctions.helpers.requestWithAuthentication.mockResolvedValue(mockResponse);

    const result = await executeFluxFinanceLendingOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    expect(mockExecuteFunctions.helpers.requestWithAuthentication).toHaveBeenCalledWith(
      'ondoFinanceApi',
      {
        method: 'PUT',
        url: 'https://api.fluxfinance.com/flux-finance-lending/123',
        body: {
          amount: '150',
          interestRate: '6.0',
        },
        json: true,
      }
    );
  });

  test('should delete flux finance lending successfully', async () => {
    const mockResponse = {
      id: '123',
      status: 'deleted',
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      const params: any = {
        operation: 'delete',
        id: '123',
      };
      return params[param];
    });

    mockExecuteFunctions.helpers.requestWithAuthentication.mockResolvedValue(mockResponse);

    const result = await executeFluxFinanceLendingOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    expect(mockExecuteFunctions.helpers.requestWithAuthentication).toHaveBeenCalledWith(
      'ondoFinanceApi',
      {
        method: 'DELETE',
        url: 'https://api.fluxfinance.com/flux-finance-lending/123',
        json: true,
      }
    );
  });

  test('should handle API errors gracefully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      const params: any = {
        operation: 'get',
        id: '123',
      };
      return params[param];
    });

    const apiError = new Error('API Error: Not Found');
    mockExecuteFunctions.helpers.requestWithAuthentication.mockRejectedValue(apiError);

    await expect(
      executeFluxFinanceLendingOperations.call(mockExecuteFunctions, [{ json: {} }])
    ).rejects.toThrow('API Error: Not Found');
  });

  test('should continue on fail when enabled', async () => {
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);
    
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      const params: any = {
        operation: 'get',
        id: '123',
      };
      return params[param];
    });

    const apiError = new Error('API Error: Not Found');
    mockExecuteFunctions.helpers.requestWithAuthentication.mockRejectedValue(apiError);

    const result = await executeFluxFinanceLendingOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([
      { 
        json: { error: 'API Error: Not Found' }, 
        pairedItem: { item: 0 } 
      }
    ]);
  });
});
});
