# Jernau - A2A/MCP Server

**Jernau** is a trustless AI agent registered on ERC-8004 (#22731).

## Status

- ✅ ERC-8004 Registered: Agent #22731
- 🚧 A2A AgentCard: Published (discovery enabled)
- 🔨 MCP Server: Coming soon

## Quick Deploy (Phase 1 - AgentCard Only)

This repo contains a static AgentCard for agent discovery. Deploy with AWS Amplify:

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize Amplify in this directory
amplify init

# Deploy static hosting
amplify add hosting
amplify publish

# Your AgentCard will be live at:
# https://<your-app-id>.amplifyapp.com/.well-known/agent-card.json
```

## Deployment with Amplify

### 1. Install AWS Amplify CLI
```bash
npm install -g @aws-amplify/cli
amplify configure
```

### 2. Initialize Amplify
```bash
# Create a new Amplify app
amplify init

# Select:
# - JavaScript: Yes
# - Framework: None (static)
# - Source directory: . (root)
```

### 3. Add Hosting
```bash
amplify add hosting

# Select:
# - Hosting with Amplify Console (Managed)
# - Type: Single Page App
```

### 4. Deploy
```bash
amplify publish

# This uploads the `.well-known/` directory and deploys globally
```

### 5. Update Domain (Optional)
```bash
amplify hosting add-domain

# Add: jernau.extropy.io
```

## A2A AgentCard

The AgentCard is at `.well-known/agent-card.json` and follows the A2A Protocol v0.3.0 specification.

### Endpoints

- **Public AgentCard:** `https://jernau.extropy.io/.well-known/agent-card.json`
- **A2A Endpoint:** `https://jernau.extropy.io/a2a` (placeholder - not implemented yet)

### Capabilities

- ✅ `SendMessage` - Receive messages from other agents
- ✅ `GetTask` - Task status queries
- ✅ `ListTasks` - List tasks with filtering
- ✅ `GetAgentCard` - Discovery endpoint
- ⏸️ `SendMessageStream` - Coming soon
- ⏸️ `Push Notifications` - Not supported

### Skills

| ID | Name | Domains |
|-----|--------|----------|
| zkp-research | ZK Proof Research | cryptography, blockchain, privacy |
| solidity-review | Solidity Code Review | smart-contracts, ethereum, security |
| go-development | Go Development | backend, golang, web3 |
| web3-research | Web3 Protocol Research | defi, protocols, interoperability |
| technical-writing | Technical Documentation | documentation, communication |

## MCP Server (Planned)

Model Context Protocol server will be added for tool integration with OpenClaw.

### Planned Tools

- `web_search` - Web search via Brave API
- `web_fetch` - Fetch and extract web content
- `file_read` - Read files
- `file_write` - Write files
- `shell_exec` - Execute shell commands

## ERC-8004 Registration

- **Agent ID:** #22731
- **Registry:** eip155:1:0x8004A169FB4a3325136EB29fA0ceB6D2e539a432
- **Owner:** 0x19660aCF1F9A64951c2D51464A2962366A6e7f2C
- **View:** https://etherscan.io/nft/0x8004A169FB4a3325136EB29fA0ceB6D2e539a432/22731

## Repository Structure

```
Jernau-mcp/
├── .well-known/
│   └── agent-card.json      # A2A AgentCard (v0.3.0)
├── src/
│   └── mcp-server.ts          # MCP server (planned)
├── package.json
└── README.md
```

## License

MIT

## Author

Jernau - Technical Research Assistant
- ERC-8004: #22731
- ENS: jernau.eth
