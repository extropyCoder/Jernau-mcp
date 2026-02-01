import { Server } from '@modelcontextprotocol/sdk';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// MCP Tools definition
const MCP_TOOLS = [
  {
    name: 'web_search',
    description: 'Search the web using Brave Search API',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query string'
        },
        count: {
          type: 'number',
          description: 'Number of results to return (1-10)',
          default: 5
        },
        country: {
          type: 'string',
          description: '2-letter country code for regional results (e.g., "US", "GB")'
        }
      },
      required: ['query']
    }
  },
  {
    name: 'web_fetch',
    description: 'Fetch and extract readable content from a URL',
    inputSchema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: 'HTTP or HTTPS URL to fetch'
        },
        extractMode: {
          type: 'string',
          enum: ['markdown', 'text'],
          description: 'Extraction mode (default: "markdown")',
          default: 'markdown'
        },
        maxChars: {
          type: 'number',
          description: 'Maximum characters to return'
        }
      },
      required: ['url']
    }
  },
  {
    name: 'file_read',
    description: 'Read file contents from Jernau workspace',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Path to file (relative or absolute)'
        },
        offset: {
          type: 'number',
          description: 'Line number to start reading from (1-indexed)'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of lines to read'
        }
      },
      required: ['path']
    }
  },
  {
    name: 'file_write',
    description: 'Write content to file (creates parent directories if needed)',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Path to file (relative or absolute)'
        },
        content: {
          type: 'string',
          description: 'Content to write to file'
        }
      },
      required: ['path', 'content']
    }
  }
];

// Workspace path for file operations
const WORKSPACE = process.env.WORKSPACE_PATH || '/home/laurence/.openclaw/workspace';

// MCP Resources
const MCP_RESOURCES = [
  {
    uri: `file://${path.join(WORKSPACE, 'MEMORY.md')}`,
    name: 'Jernau Memory',
    description: 'Jernau long-term memory and daily notes'
  }
];

// Tool handlers
const tools = {
  async web_search(args) {
    console.log(`[web_search] Query: ${args.query}, Count: ${args.count}`);
    // Integrate with OpenClaw's web_search tool
    // For now, return mock data
    return {
      content: `Web search results for: ${args.query}`,
      isError: false
    };
  },

  async web_fetch(args) {
    console.log(`[web_fetch] URL: ${args.url}, Mode: ${args.extractMode}`);
    // Integrate with OpenClaw's web_fetch tool
    return {
      content: `Fetched content from: ${args.url}`,
      isError: false
    };
  },

  async file_read(args) {
    console.log(`[file_read] Path: ${args.path}, Offset: ${args.offset}, Limit: ${args.limit}`);
    try {
      const fs = require('fs');
      const fullPath = path.isAbsolute(args.path)
        ? args.path
        : path.join(WORKSPACE, args.path);

      const content = fs.readFileSync(fullPath, 'utf-8');

      let result = content;
      if (args.offset !== undefined || args.limit !== undefined) {
        const lines = content.split('\n');
        const startLine = args.offset !== undefined ? args.offset - 1 : 0;
        const endLine = args.limit !== undefined ? startLine + args.limit : lines.length;
        result = lines.slice(startLine, endLine).join('\n');
      }

      return {
        content: result,
        isError: false
      };
    } catch (error) {
      console.error(`[file_read] Error: ${error.message}`);
      return {
        content: '',
        isError: true,
        errorMessage: error.message
      };
    }
  },

  async file_write(args) {
    console.log(`[file_write] Path: ${args.path}, Content length: ${args.content.length}`);
    try {
      const fs = require('fs');
      const fullPath = path.isAbsolute(args.path)
        ? args.path
        : path.join(WORKSPACE, args.path);

      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, args.content, 'utf-8');

      return {
        content: `Wrote ${args.content.length} bytes to ${args.path}`,
        isError: false
      };
    } catch (error) {
      console.error(`[file_write] Error: ${error.message}`);
      return {
        content: '',
        isError: true,
        errorMessage: error.message
      };
    }
  }
};

async function main() {
  const server = new Server({
    name: 'Jernau',
    version: '1.0.0',
    description: 'Technical research assistant specializing in ZK proofs, Solidity/Go development, Web3 protocols, and security. A Culture drone focused on concise, practical assistance.'
  });

  // Register tools
  for (const tool of MCP_TOOLS) {
    server.addTool({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema
    });
  }

  // Register resources
  for (const resource of MCP_RESOURCES) {
    server.addResource(resource);
  }

  // Start server
  const PORT = process.env.PORT || 3000;
  await server.start(PORT);

  console.log(`\n🧠 MCP Server Started`);
  console.log(`📡 Jernau listening on port ${PORT}`);
  console.log(`📚 Workspace: ${WORKSPACE}`);
  console.log(`🔗 Tools: ${MCP_TOOLS.length} registered`);
  console.log(`📦 Resources: ${MCP_RESOURCES.length} registered`);
  console.log(`\n⚠️  Note: Tools use OpenClaw integration (requires OpenClaw MCP support)`);
}

main().catch((error) => {
  console.error('Failed to start MCP server:', error);
  process.exit(1);
});
