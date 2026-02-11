# n8n-nodes-ondo-finance

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

This n8n community node provides seamless integration with Ondo Finance's decentralized finance platform, offering 6 comprehensive resources for managing tokenized financial products, institutional-grade DeFi operations, and yield-generating assets including USDY tokens, OUSG fund management, and Flux Finance lending protocols.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![DeFi](https://img.shields.io/badge/DeFi-Ondo%20Finance-green)
![Tokenization](https://img.shields.io/badge/Tokenization-RWA-orange)
![Institutional](https://img.shields.io/badge/Grade-Institutional-purple)

## Features

- **USDY Token Operations** - Manage US Dollar Yield tokens, transfers, and yield tracking
- **OUSG Fund Management** - Handle Ondo Short-Term US Government Bond fund operations
- **Global Markets Integration** - Access institutional-grade trading and market data
- **Token Pricing & NAV** - Real-time pricing data and net asset value calculations
- **Redemptions & Subscriptions** - Automate fund entry and exit processes
- **Flux Finance Lending** - Manage lending protocols and yield farming strategies
- **Institutional-Grade Security** - Enterprise-level authentication and compliance
- **Real-Time Analytics** - Monitor performance metrics and portfolio health

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
| API Key | Your Ondo Finance API key for authentication | ✅ |
| Environment | Production or Sandbox environment | ✅ |
| Wallet Address | Your institutional wallet address | ✅ |
| Network | Ethereum mainnet or supported testnets | ✅ |

## Resources & Operations

### 1. USDY Token Operations

| Operation | Description |
|-----------|-------------|
| Get Balance | Retrieve USDY token balance for specified address |
| Transfer Tokens | Execute USDY token transfers between addresses |
| Get Yield History | Fetch historical yield data and performance metrics |
| Check Allowances | View token allowances and spending permissions |
| Get Transaction History | Retrieve complete transaction history for USDY tokens |

### 2. OUSG Fund Management

| Operation | Description |
|-----------|-------------|
| Get Fund Details | Retrieve detailed information about OUSG fund |
| Calculate Holdings | Calculate current holdings and portfolio value |
| Get Performance Metrics | Access fund performance and benchmark data |
| Update Allocations | Modify fund allocation percentages |
| Generate Reports | Create comprehensive fund performance reports |

### 3. Ondo Global Markets

| Operation | Description |
|-----------|-------------|
| Get Market Data | Access real-time market data and pricing |
| Place Orders | Execute buy/sell orders on global markets |
| Get Order History | Retrieve order history and execution details |
| Monitor Positions | Track current positions and P&L |
| Get Market Analytics | Access advanced market analytics and insights |

### 4. Token Pricing and NAV

| Operation | Description |
|-----------|-------------|
| Get Token Prices | Retrieve current token prices across all assets |
| Calculate NAV | Calculate net asset value for tokenized funds |
| Get Price History | Access historical pricing data and trends |
| Set Price Alerts | Configure price movement notifications |
| Get Yield Rates | Fetch current and historical yield rates |

### 5. Redemptions and Subscriptions

| Operation | Description |
|-----------|-------------|
| Submit Subscription | Process new fund subscription requests |
| Request Redemption | Initiate fund redemption procedures |
| Get Subscription Status | Check status of pending subscriptions |
| Get Redemption Status | Monitor redemption request progress |
| Calculate Fees | Calculate subscription and redemption fees |

### 6. Flux Finance Lending

| Operation | Description |
|-----------|-------------|
| Supply Assets | Supply assets to lending pools for yield |
| Borrow Assets | Borrow assets against supplied collateral |
| Get Lending Rates | Retrieve current lending and borrowing rates |
| Monitor Health Factor | Track loan health and liquidation risk |
| Claim Rewards | Claim accumulated lending rewards |

## Usage Examples

```javascript
// Get USDY token balance
const balance = await ondoFinance.usdyTokenOperations.getBalance({
  address: "0x742d35Cc6634C0532925a3b8D4DdaC7c0b9d7fd8",
  token: "USDY"
});

// Calculate OUSG fund NAV
const nav = await ondoFinance.ousgFundManagement.calculateNav({
  fundId: "OUSG-001",
  timestamp: "2024-01-15T10:00:00Z"
});

// Submit subscription request
const subscription = await ondoFinance.redemptionsAndSubscriptions.submitSubscription({
  amount: 50000,
  currency: "USDC",
  fundId: "OUSG-001",
  investorId: "INV-123456"
});

// Supply assets to Flux lending pool
const lending = await ondoFinance.fluxFinanceLending.supplyAssets({
  asset: "USDC",
  amount: 100000,
  pool: "flux-usdc-pool",
  duration: "30d"
});
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| INSUFFICIENT_BALANCE | Token balance too low for operation | Verify wallet balance before transactions |
| INVALID_API_KEY | Authentication failed | Check API key validity and permissions |
| NETWORK_ERROR | Blockchain network connection failed | Verify network connectivity and retry |
| COMPLIANCE_CHECK_FAILED | KYC/AML verification required | Complete institutional verification process |
| RATE_LIMIT_EXCEEDED | Too many requests in time window | Implement request throttling and retry logic |
| INVALID_FUND_ID | Fund identifier not found | Verify fund ID exists and is accessible |

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
- **Ondo Finance Documentation**: [Ondo Finance Docs](https://docs.ondo.finance)
- **Developer Community**: [Ondo Finance Discord](https://discord.gg/ondofinance)