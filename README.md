# n8n-nodes-ondo-finance

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

An n8n community node for integrating with Ondo Finance's institutional-grade DeFi protocols. This node provides access to 5 core resources including USDY and OUSG token operations, global markets data, Flux Finance lending protocols, and portfolio management capabilities for tokenized real-world assets and yield-bearing digital securities.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![DeFi](https://img.shields.io/badge/DeFi-Institutional-green)
![RWA](https://img.shields.io/badge/RWA-Tokenization-purple)
![Yield](https://img.shields.io/badge/Yield-Bearing-orange)

## Features

- **USDY Token Management** - Access and manage US Dollar Yield token operations including transfers, minting, and redemptions
- **OUSG Token Operations** - Interact with Ondo US Short-term Government Bond token for institutional treasury management
- **Global Markets Integration** - Retrieve real-time market data, pricing, and liquidity information across Ondo's protocols
- **Flux Finance Protocol** - Execute lending and borrowing operations through Ondo's institutional lending platform
- **Portfolio Analytics** - Monitor and analyze tokenized asset portfolios with comprehensive performance metrics
- **Institutional-Grade Security** - Built-in compliance features for institutional DeFi requirements
- **Multi-Chain Support** - Support for Ethereum mainnet and other supported blockchain networks
- **Real-World Asset Exposure** - Access tokenized government bonds, treasury bills, and other RWA products

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-ondo-finance`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install n8n-nodes-ondo-finance
```

### Development Installation

```bash
git clone https://github.com/Velocity-BPA/n8n-nodes-ondo-finance.git
cd n8n-nodes-ondo-finance
npm install
npm run build
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-ondo-finance
n8n start
```

## Credentials Setup

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Your Ondo Finance API key for authenticated requests | Yes |
| Environment | Select production or sandbox environment | Yes |
| Wallet Address | Ethereum wallet address for transaction signing | Yes |

## Resources & Operations

### 1. USDY Token

| Operation | Description |
|-----------|-------------|
| Get Balance | Retrieve USDY token balance for specified address |
| Transfer | Execute USDY token transfers between addresses |
| Mint | Mint new USDY tokens (authorized users only) |
| Redeem | Redeem USDY tokens for underlying assets |
| Get Yield Rate | Fetch current USDY yield rate and APY |
| Transaction History | Retrieve transaction history for USDY operations |

### 2. OUSG Token

| Operation | Description |
|-----------|-------------|
| Get Balance | Check OUSG token balance for wallet address |
| Transfer | Transfer OUSG tokens between institutional accounts |
| Mint | Mint new OUSG tokens (institutional access) |
| Redeem | Redeem OUSG tokens for US government securities |
| Get NAV | Retrieve current net asset value per OUSG token |
| Yield History | Access historical yield data and distributions |

### 3. Global Markets

| Operation | Description |
|-----------|-------------|
| Get Market Data | Fetch real-time pricing and market information |
| List Instruments | Retrieve available tokenized instruments and products |
| Get Liquidity | Check liquidity pools and available trading pairs |
| Market Statistics | Access trading volume and market depth data |
| Price History | Retrieve historical price data for analysis |
| Rate Information | Get current interest rates and yield curves |

### 4. Flux Finance

| Operation | Description |
|-----------|-------------|
| Get Lending Pools | List available lending pools and rates |
| Supply Assets | Supply assets to lending pools for yield generation |
| Borrow Assets | Borrow against supplied collateral |
| Repay Loan | Repay outstanding loan positions |
| Get Position | Retrieve current lending/borrowing positions |
| Calculate Interest | Calculate accrued interest and fees |

### 5. Portfolio

| Operation | Description |
|-----------|-------------|
| Get Portfolio | Retrieve complete portfolio overview and allocation |
| Asset Breakdown | Get detailed breakdown by asset type and yield |
| Performance Metrics | Access portfolio performance and risk analytics |
| Rebalance | Execute portfolio rebalancing operations |
| Risk Assessment | Generate risk reports and compliance metrics |
| Export Data | Export portfolio data for external analysis |

## Usage Examples

```javascript
// Get USDY token balance
{
  "resource": "usdyToken",
  "operation": "getBalance",
  "address": "0x742d35Cc6634C0532925a3b8D94e3d6cF6B7bC13"
}
```

```javascript
// Transfer OUSG tokens
{
  "resource": "ousgToken", 
  "operation": "transfer",
  "to": "0x742d35Cc6634C0532925a3b8D94e3d6cF6B7bC13",
  "amount": "1000",
  "memo": "Quarterly distribution"
}
```

```javascript
// Supply assets to Flux Finance
{
  "resource": "fluxFinance",
  "operation": "supplyAssets",
  "asset": "USDC",
  "amount": "50000",
  "poolId": "flux-usdc-pool-1"
}
```

```javascript
// Get portfolio performance metrics
{
  "resource": "portfolio",
  "operation": "performanceMetrics",
  "timeframe": "30d",
  "includeYield": true,
  "currency": "USD"
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| Invalid API Key | Authentication failed with provided credentials | Verify API key is correct and has proper permissions |
| Insufficient Balance | Not enough token balance for requested operation | Check balance before executing transfers or redemptions |
| Rate Limit Exceeded | Too many API requests in short timeframe | Implement request throttling and retry logic |
| Network Error | Blockchain network connectivity issues | Wait for network stability and retry transaction |
| Unauthorized Operation | User lacks permission for requested action | Verify account has institutional access for operation |
| Invalid Address | Ethereum address format is incorrect | Validate address format before API calls |

## Development

```bash
npm install
npm run build
npm test
npm run lint
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style conventions
2. All tests pass (`npm test`)
3. Linting passes (`npm run lint`)
4. Documentation is updated for new features
5. Commit messages are descriptive

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-ondo-finance/issues)
- **Ondo Finance Documentation**: [docs.ondo.finance](https://docs.ondo.finance)
- **DeFi Community**: [Ondo Finance Discord](https://discord.gg/ondofinance)