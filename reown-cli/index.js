#!/usr/bin/env node
import { execa } from "execa";
import chalk from "chalk";
import path from "path";
import fs from "fs";

// Get current working directory where the command is run
const cwd = process.cwd();

console.log(chalk.blue("🚀 Setting up your Blockchain project..."));

async function createDirectories() {
  console.log(chalk.green("📁 Creating project directories..."));
  try {
    // Create foundry directory if it doesn't exist
    if (!fs.existsSync(path.join(cwd, "foundry"))) {
      fs.mkdirSync(path.join(cwd, "foundry"));
    }
    
    // Create nextJs directory if it doesn't exist
    if (!fs.existsSync(path.join(cwd, "nextJs"))) {
      fs.mkdirSync(path.join(cwd, "nextJs"));
    }
    
    console.log(chalk.green("✅ Directories created successfully!"));
  } catch (error) {
    console.error(chalk.red("❌ Failed to create directories:", error.message));
    process.exit(1);
  }
}

async function setupFoundry() {
  console.log(chalk.green("🔧 Setting up Foundry..."));
  try {
    // First check if forge is installed
    try {
      await execa("forge", ["--version"]);
    } catch (error) {
      console.log(chalk.yellow("⚠️ Forge not found. Please install Foundry first:"));
      console.log(chalk.yellow("curl -L https://foundry.paradigm.xyz | bash"));
      console.log(chalk.yellow("foundryup"));
      process.exit(1);
    }

    // Initialize git repository in foundry directory
    await execa("git", ["init"], { cwd: path.join(cwd, "foundry") });
    
    // Now run forge install
    await execa("forge", ["install"], { cwd: path.join(cwd, "foundry") });
    console.log(chalk.green("✅ Foundry setup complete!"));
  } catch (error) {
    console.error(chalk.red("❌ Foundry setup failed:", error.message));
    process.exit(1);
  }
}

async function setupNextJs() {
  console.log(chalk.green("🔧 Setting up Next.js..."));
  try {
    // Check if npm is available
    try {
      await execa("npm", ["--version"]);
    } catch (error) {
      console.log(chalk.yellow("⚠️ npm not found. Please install Node.js first."));
      process.exit(1);
    }

    await execa("npm", ["install", "@reown/appkit", "@reown/appkit-adapter-wagmi", "wagmi", "viem", "@tanstack/react-query"], {
      cwd: path.join(cwd, "nextJs")
    });
    console.log(chalk.green("✅ Next.js setup complete!"));
  } catch (error) {
    console.error(chalk.red("❌ Next.js setup failed:", error.message));
    process.exit(1);
  }
}

async function startDevServer() {
  console.log(chalk.blue("🚀 Starting development server..."));
  try {
    await execa("npm", ["run", "dev"], {
      cwd: path.join(cwd, "nextJs"),
      stdio: "inherit"
    });
  } catch (error) {
    console.error(chalk.red("❌ Failed to start development server:", error.message));
    process.exit(1);
  }
}

async function main() {
  await createDirectories();
  await setupFoundry();
  await setupNextJs();
  await startDevServer();
}

main().catch((error) => {
  console.error(chalk.red("❌ Setup failed:", error.message));
  process.exit(1);
});