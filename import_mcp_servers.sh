#!/bin/bash

# Import MCP servers from Claude Desktop configuration to Q CLI

echo "Importing MCP servers to Q CLI..."

# Codebase Context Dumper
echo "Adding codebase-context-dumper..."
q mcp add --name "codebase-context-dumper" --command "npx" --args "-y @smithery/cli@latest run @lex-tools/codebase-context-dumper --key fb239f59-c173-4cce-ac4a-4428dffe7311 --profile natural-snake-EtAVeC"

# Playwright MCP
echo "Adding playwright-mcp..."
q mcp add --name "playwright-mcp" --command "npx" --args "-y @smithery/cli@latest run @cloudflare/playwright-mcp --key fb239f59-c173-4cce-ac4a-4428dffe7311 --profile natural-snake-EtAVeC"

# Claude Code MCP
echo "Adding claude-code-mcp..."
q mcp add --name "claude-code-mcp" --command "npx" --args "-y @smithery/cli@latest run @steipete/claude-code-mcp --key fb239f59-c173-4cce-ac4a-4428dffe7311 --profile natural-snake-EtAVeC"

# GitHub MCP
echo "Adding github..."
q mcp add --name "github" --command "npx" --args "-y @smithery/cli@latest run @smithery-ai/github --key fb239f59-c173-4cce-ac4a-4428dffe7311 --profile natural-snake-EtAVeC"

# File Context Server
echo "Adding mcp-file-context-server..."
q mcp add --name "mcp-file-context-server" --command "npx" --args "-y @smithery/cli@latest run @bsmi021/mcp-file-context-server --key fb239f59-c173-4cce-ac4a-4428dffe7311 --profile natural-snake-EtAVeC"

# Linear MCP
echo "Adding mcp-linear..."
q mcp add --name "mcp-linear" --command "npx" --args "-y @smithery/cli@latest run @tacticlaunch/mcp-linear --key fb239f59-c173-4cce-ac4a-4428dffe7311 --profile natural-snake-EtAVeC"

# Context7 MCP
echo "Adding context7-mcp..."
q mcp add --name "context7-mcp" --command "npx" --args "-y @smithery/cli@latest run @upstash/context7-mcp --key fb239f59-c173-4cce-ac4a-4428dffe7311 --profile natural-snake-EtAVeC"

# Mem0 Memory MCP
echo "Adding mem0-memory-mcp..."
q mcp add --name "mem0-memory-mcp" --command "npx" --args "-y @smithery/cli@latest run @mem0ai/mem0-memory-mcp --key fb239f59-c173-4cce-ac4a-4428dffe7311 --profile natural-snake-EtAVeC"

# Task Manager MCP
echo "Adding mcp-taskmanager..."
q mcp add --name "mcp-taskmanager" --command "npx" --args "-y @smithery/cli@latest run @kazuph/mcp-taskmanager --key fb239f59-c173-4cce-ac4a-4428dffe7311 --profile natural-snake-EtAVeC"

echo "MCP server import complete!"
echo "Run 'q mcp list' to see all configured servers."
