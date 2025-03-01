# Reown Toolkit 🚀

A toolkit for building DAPPS with **Foundry** , **Next.js** && **Reown**. This toolkit simplifies the setup and development process, allowing you to focus on building your application.

## Prerequisites

Before using Reown, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (v7 or higher) or [pnpm](https://pnpm.io/) (v6 or higher)
- [Foundry](https://book.getfoundry.sh/getting-started/installation)

To install Foundry, run:
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

## Features

- **Foundry Integration**: Easily set up and manage smart contracts with Foundry.
- **Next.js Frontend**: Quickly scaffold a modern Next.js frontend.
- **CLI Tool**: Automate project setup with the `reown-setup` command.
- **Package Manager Support**: Works with both npm and pnpm.

---

## Installation

To install the Reown Toolkit globally, run one of the following commands:

### Using npm:
```bash
npm install -g reown
```

### Using pnpm:
```bash
pnpm add -g reown
```

## Usage

### Initialize a new project

```bash
reown
```

This will:
1. Create the necessary project directories
2. Set up Foundry for smart contract development
3. Set up Next.js with required dependencies
4. Start the development server

The CLI will automatically detect whether you're using npm or pnpm and use the appropriate commands.

Option 2: Add nvm's Bin Directory to Your PATH
Add the nvm bin directory to your shell's PATH so that globally installed packages are accessible.

Open your shell configuration file:

For bash: ~/.bashrc or ~/.bash_profile

For zsh: ~/.zshrc

Add the following line to the file:

bash
Copy
export PATH=$HOME/.nvm/versions/node/v22.13.1/bin:$PATH
Reload the shell configuration:

bash
Copy
source ~/.bashrc  # or source ~/.zshrc
Verify that the reown-setup command is now available:

bash
Copy
which reown-setup
reown-setup


## Next steps

- Cd into the `nextJs` directory and edit the frontend
- Cd into the `foundry` directory and edit the smart contracts

