# MMO Social Game Server Architecture

This backend is designed to simulate a real-world game server API
used by modern cross-platform social MMO games.

## Core Modules

- Auth: authentication, JWT, roles
- Users: player profiles and status
- Inventory: item ownership and locking
- Trading: secure player-to-player trading
- Economy: balances, fees, sinks and analytics

## Design Principles

- Domain-driven modular structure
- Security-first trading flows
- MongoDB aggregation pipelines for analytics
- Separation between game API and LiveOps tools