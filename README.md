# Reown Toolkit 🚀

A toolkit for building decentralized applications with **Foundry** and **Next.js**. This toolkit simplifies the setup and development process, allowing you to focus on building your application.

---

## Features

- **Foundry Integration**: Easily set up and manage smart contracts with Foundry.
- **Next.js Frontend**: Quickly scaffold a modern Next.js frontend.
- **CLI Tool**: Automate project setup with the `reown-setup` command.

---

## Installation

To install the Reown Toolkit globally, run:

```bash
npm install -g reown
```

## Usage

### Initialize a new project

```bash
reown-setup
```

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

