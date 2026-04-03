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

    it('should define 5 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(5);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(5);
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
describe('UsdyToken Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        apiKey: 'test-key', 
        baseUrl: 'https://api.ondo.finance/v1' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { 
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn() 
      },
    };
  });

  describe('getBalance operation', () => {
    it('should get USDY balance for address successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getBalance')
        .mockReturnValueOnce('0x1234567890abcdef1234567890abcdef12345678');
      
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
        balance: '1000.5',
        address: '0x1234567890abcdef1234567890abcdef12345678'
      });

      const result = await executeUsdyTokenOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.ondo.finance/v1/tokens/usdy/balance/0x1234567890abcdef1234567890abcdef12345678',
        headers: {
          'Authorization': 'Bearer test-key',
          'Content-Type': 'application/json',
        },
        json: true,
      });
      expect(result).toEqual([{ json: { balance: '1000.5', address: '0x1234567890abcdef1234567890abcdef12345678' }, pairedItem: { item: 0 } }]);
    });

    it('should handle getBalance error', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getBalance')
        .mockReturnValueOnce('invalid-address');
      
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Invalid address'));
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);

      const result = await executeUsdyTokenOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: { error: 'Invalid address' }, pairedItem: { item: 0 } }]);
    });
  });

  describe('mintTokens operation', () => {
    it('should mint USDY tokens successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('mintTokens')
        .mockReturnValueOnce('1000')
        .mockReturnValueOnce('0x1234567890abcdef1234567890abcdef12345678');
      
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
        transactionId: 'tx123',
        amount: '1000',
        recipient: '0x1234567890abcdef1234567890abcdef12345678'
      });

      const result = await executeUsdyTokenOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'https://api.ondo.finance/v1/tokens/usdy/mint',
        headers: {
          'Authorization': 'Bearer test-key',
          'Content-Type': 'application/json',
        },
        json: true,
        body: {
          amount: '1000',
          recipient: '0x1234567890abcdef1234567890abcdef12345678',
        },
      });
      expect(result[0].json).toHaveProperty('transactionId', 'tx123');
    });
  });

  describe('getTotalSupply operation', () => {
    it('should get total supply successfully', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getTotalSupply');
      
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
        totalSupply: '1000000.0'
      });

      const result = await executeUsdyTokenOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: { totalSupply: '1000000.0' }, pairedItem: { item: 0 } }]);
    });
  });

  describe('getTransactions operation', () => {
    it('should get transactions with filters successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getTransactions')
        .mockReturnValueOnce('0x1234567890abcdef1234567890abcdef12345678')
        .mockReturnValueOnce(10)
        .mockReturnValueOnce(0);
      
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
        transactions: []
      });

      const result = await executeUsdyTokenOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          url: expect.stringContaining('?address=0x1234567890abcdef1234567890abcdef12345678&limit=10&offset=0')
        })
      );
    });
  });
});

describe('OUSG Token Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
				baseUrl: 'https://api.ondo.finance/v1',
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

	it('should get OUSG balance successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getBalance')
			.mockReturnValueOnce('0x1234567890abcdef');
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			balance: '1000.50',
			address: '0x1234567890abcdef',
		});

		const result = await executeOutsgTokenOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json.balance).toBe('1000.50');
	});

	it('should get total supply successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValue('getTotalSupply');
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			totalSupply: '10000000.00',
		});

		const result = await executeOutsgTokenOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json.totalSupply).toBe('10000000.00');
	});

	it('should get net asset value successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValue('getNetAssetValue');
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			nav: 1.05,
			timestamp: '2023-12-01T00:00:00Z',
		});

		const result = await executeOutsgTokenOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json.nav).toBe(1.05);
	});

	it('should transfer tokens successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('transferTokens')
			.mockReturnValueOnce('0xfrom123')
			.mockReturnValueOnce('0xto456')
			.mockReturnValueOnce('100.00');
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			transactionHash: '0xtx123',
			status: 'pending',
		});

		const result = await executeOutsgTokenOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json.transactionHash).toBe('0xtx123');
	});

	it('should get transactions successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getTransactions')
			.mockReturnValueOnce('0x1234567890abcdef')
			.mockReturnValueOnce(10)
			.mockReturnValueOnce(0);
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			transactions: [
				{ hash: '0xtx1', amount: '100', type: 'transfer' },
				{ hash: '0xtx2', amount: '200', type: 'mint' },
			],
		});

		const result = await executeOutsgTokenOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json.transactions).toHaveLength(2);
	});

	it('should get yield history successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getYieldHistory')
			.mockReturnValueOnce('1m');
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			yields: [
				{ date: '2023-11-01', yield: 0.045 },
				{ date: '2023-12-01', yield: 0.048 },
			],
		});

		const result = await executeOutsgTokenOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json.yields).toHaveLength(2);
	});

	it('should get price successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValue('getPrice');
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			price: 1.02,
			currency: 'USD',
			timestamp: '2023-12-01T00:00:00Z',
		});

		const result = await executeOutsgTokenOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json.price).toBe(1.02);
	});

	it('should handle API errors gracefully', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValue('getBalance');
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);

		const result = await executeOutsgTokenOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json.error).toBe('API Error');
	});

	it('should throw error for unknown operation', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValue('unknownOperation');

		await expect(
			executeOutsgTokenOperations.call(mockExecuteFunctions, [{ json: {} }])
		).rejects.toThrow('Unknown operation: unknownOperation');
	});
});

describe('Global Markets Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
				baseUrl: 'https://api.ondo.finance/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	describe('getAllAssets operation', () => {
		it('should get all global assets successfully', async () => {
			const mockResponse = { assets: [{ id: '1', name: 'Asset 1' }] };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getAllAssets')
				.mockReturnValueOnce('US')
				.mockReturnValueOnce('equity');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeGlobalMarketsOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{
				json: mockResponse,
				pairedItem: { item: 0 },
			}]);
		});

		it('should handle getAllAssets error', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValue('getAllAssets');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeGlobalMarketsOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result[0].json.error).toBe('API Error');
		});
	});

	describe('getAsset operation', () => {
		it('should get specific asset successfully', async () => {
			const mockResponse = { id: '1', name: 'Asset 1' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getAsset')
				.mockReturnValueOnce('asset-123');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeGlobalMarketsOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{
				json: mockResponse,
				pairedItem: { item: 0 },
			}]);
		});
	});

	describe('getMarketPrices operation', () => {
		it('should get market prices successfully', async () => {
			const mockResponse = { prices: [{ symbol: 'BTC', price: 50000 }] };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getMarketPrices')
				.mockReturnValueOnce('BTC,ETH');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeGlobalMarketsOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{
				json: mockResponse,
				pairedItem: { item: 0 },
			}]);
		});
	});

	describe('getTradingVolume operation', () => {
		it('should get trading volume successfully', async () => {
			const mockResponse = { volume: 1000000 };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getTradingVolume')
				.mockReturnValueOnce('24h')
				.mockReturnValueOnce('US');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeGlobalMarketsOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{
				json: mockResponse,
				pairedItem: { item: 0 },
			}]);
		});
	});

	describe('getComplianceStatus operation', () => {
		it('should get compliance status successfully', async () => {
			const mockResponse = { status: 'compliant' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getComplianceStatus')
				.mockReturnValueOnce('US');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeGlobalMarketsOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{
				json: mockResponse,
				pairedItem: { item: 0 },
			}]);
		});
	});

	describe('createTrade operation', () => {
		it('should create trade successfully', async () => {
			const mockResponse = { tradeId: 'trade-123', status: 'executed' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('createTrade')
				.mockReturnValueOnce('BTC')
				.mockReturnValueOnce(1.5)
				.mockReturnValueOnce('buy');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeGlobalMarketsOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{
				json: mockResponse,
				pairedItem: { item: 0 },
			}]);
		});
	});

	describe('getTradeHistory operation', () => {
		it('should get trade history successfully', async () => {
			const mockResponse = { trades: [{ id: 'trade-1', asset: 'BTC' }] };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getTradeHistory')
				.mockReturnValueOnce(10)
				.mockReturnValueOnce(0);
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeGlobalMarketsOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{
				json: mockResponse,
				pairedItem: { item: 0 },
			}]);
		});
	});
});

describe('Flux Finance Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        apiKey: 'test-key', 
        baseUrl: 'https://api.ondo.finance/v1' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { 
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn() 
      },
    };
  });

  describe('getAllMarkets', () => {
    it('should get all flux markets successfully', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValue('getAllMarkets');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ markets: [] });

      const result = await executeFluxFinanceOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.ondo.finance/v1/flux/markets',
        headers: {
          'Authorization': 'Bearer test-key',
          'Content-Type': 'application/json',
        },
        json: true,
      });
      expect(result).toEqual([{ json: { markets: [] }, pairedItem: { item: 0 } }]);
    });

    it('should handle getAllMarkets error', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValue('getAllMarkets');
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);

      const result = await executeFluxFinanceOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
    });
  });

  describe('getMarket', () => {
    it('should get specific market successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getMarket')
        .mockReturnValueOnce('USDC');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ market: 'USDC' });

      const result = await executeFluxFinanceOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.ondo.finance/v1/flux/market/USDC',
        headers: {
          'Authorization': 'Bearer test-key',
          'Content-Type': 'application/json',
        },
        json: true,
      });
      expect(result).toEqual([{ json: { market: 'USDC' }, pairedItem: { item: 0 } }]);
    });
  });

  describe('supplyAsset', () => {
    it('should supply asset successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('supplyAsset')
        .mockReturnValueOnce('USDC')
        .mockReturnValueOnce('1000');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ success: true });

      const result = await executeFluxFinanceOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'https://api.ondo.finance/v1/flux/supply',
        headers: {
          'Authorization': 'Bearer test-key',
          'Content-Type': 'application/json',
        },
        body: {
          asset: 'USDC',
          amount: '1000',
        },
        json: true,
      });
      expect(result).toEqual([{ json: { success: true }, pairedItem: { item: 0 } }]);
    });
  });

  describe('getInterestRates', () => {
    it('should get interest rates with asset filter', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getInterestRates')
        .mockReturnValueOnce('USDC');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ rates: {} });

      const result = await executeFluxFinanceOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.ondo.finance/v1/flux/rates?asset=USDC',
        headers: {
          'Authorization': 'Bearer test-key',
          'Content-Type': 'application/json',
        },
        json: true,
      });
      expect(result).toEqual([{ json: { rates: {} }, pairedItem: { item: 0 } }]);
    });

    it('should get all interest rates without filter', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getInterestRates')
        .mockReturnValueOnce('');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ rates: {} });

      const result = await executeFluxFinanceOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.ondo.finance/v1/flux/rates',
        headers: {
          'Authorization': 'Bearer test-key',
          'Content-Type': 'application/json',
        },
        json: true,
      });
    });
  });
});

describe('Portfolio Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-api-key',
				baseUrl: 'https://api.ondo.finance/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Ondo Finance Portfolio Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	describe('getPortfolio', () => {
		it('should get portfolio overview successfully', async () => {
			const mockResponse = { totalValue: 100000, assets: [] };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getPortfolio')
				.mockReturnValueOnce('0x1234567890123456789012345678901234567890');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executePortfolioOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.ondo.finance/v1/portfolio/0x1234567890123456789012345678901234567890',
				headers: {
					'Authorization': 'Bearer test-api-key',
					'Content-Type': 'application/json',
				},
				json: true,
			});
			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});

		it('should handle get portfolio error', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getPortfolio')
				.mockReturnValueOnce('invalid-address');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Invalid address'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executePortfolioOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: { error: 'Invalid address' }, pairedItem: { item: 0 } }]);
		});
	});

	describe('getAssetAllocation', () => {
		it('should get asset allocation successfully', async () => {
			const mockResponse = { allocations: { OUSG: 60, OMMF: 40 } };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getAssetAllocation')
				.mockReturnValueOnce('0x1234567890123456789012345678901234567890');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executePortfolioOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.ondo.finance/v1/portfolio/0x1234567890123456789012345678901234567890/allocation',
				headers: {
					'Authorization': 'Bearer test-api-key',
					'Content-Type': 'application/json',
				},
				json: true,
			});
			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('getPerformance', () => {
		it('should get performance metrics successfully', async () => {
			const mockResponse = { returns: 0.08, volatility: 0.12 };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getPerformance')
				.mockReturnValueOnce('0x1234567890123456789012345678901234567890')
				.mockReturnValueOnce('30d');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executePortfolioOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.ondo.finance/v1/portfolio/0x1234567890123456789012345678901234567890/performance',
				headers: {
					'Authorization': 'Bearer test-api-key',
					'Content-Type': 'application/json',
				},
				qs: { period: '30d' },
				json: true,
			});
			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('rebalancePortfolio', () => {
		it('should rebalance portfolio successfully', async () => {
			const mockResponse = { transactionId: 'tx123', status: 'pending' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('rebalancePortfolio')
				.mockReturnValueOnce('0x1234567890123456789012345678901234567890')
				.mockReturnValueOnce('{"OUSG": 50, "OMMF": 50}');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executePortfolioOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'POST',
				url: 'https://api.ondo.finance/v1/portfolio/0x1234567890123456789012345678901234567890/rebalance',
				headers: {
					'Authorization': 'Bearer test-api-key',
					'Content-Type': 'application/json',
				},
				body: { targets: { OUSG: 50, OMMF: 50 } },
				json: true,
			});
			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});

		it('should handle invalid JSON in targets', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('rebalancePortfolio')
				.mockReturnValueOnce('0x1234567890123456789012345678901234567890')
				.mockReturnValueOnce('invalid-json');

			await expect(executePortfolioOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow();
		});
	});
});
});
