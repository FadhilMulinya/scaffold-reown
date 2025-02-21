#!/usr/bin/env node
import { execa } from "execa";
import chalk from "chalk";
import path from "path";
import fs from "fs";

// Get current working directory where the command is run
const cwd = process.cwd();

console.log(chalk.blue("🚀 Setting up your Blockchain project..."));

async function createDirectories() {
  console.log(chalk.green("📁 Checking project directories..."));
  try {
    if (!fs.existsSync(path.join(cwd, "foundry"))) {
      console.error(chalk.red("❌ Foundry directory not found. Please ensure you have the foundry directory."));
      process.exit(1);
    }
    
    if (!fs.existsSync(path.join(cwd, "nextJs"))) {
      console.error(chalk.red("❌ Next.js directory not found. Please ensure you have the nextJs directory."));
      process.exit(1);
    }
    
    console.log(chalk.green("✅ Project directories found!"));
  } catch (error) {
    console.error(chalk.red("❌ Error checking directories:", error.message));
    process.exit(1);
  }
}

async function setupFoundry() {
  console.log(chalk.green("🔧 Setting up Foundry..."));
  try {
    // Check if forge is installed
    try {
      await execa("forge", ["--version"]);
    } catch (error) {
      console.log(chalk.yellow("⚠️ Forge not found. Please install Foundry first:"));
      console.log(chalk.yellow("curl -L https://foundry.paradigm.xyz | bash"));
      console.log(chalk.yellow("foundryup"));
      process.exit(1);
    }

    // Initialize git in foundry directory if .git doesn't exist
    const foundryGitPath = path.join(cwd, "foundry/.git");
    if (!fs.existsSync(foundryGitPath)) {
      await execa("git", ["init"], { cwd: path.join(cwd, "foundry") });
    }

    // Run forge install
    await execa("forge", ["install"], { cwd: path.join(cwd, "foundry") });
    
    console.log(chalk.green("✅ Foundry setup complete!"));
  } catch (error) {
    console.error(chalk.red("❌ Foundry setup failed:", error.message));
    process.exit(1);
  }
}

async function setupNextJs() {
  console.log(chalk.green("🔧 Checking Next.js setup..."));
  try {
    // Just check if npm is available
    try {
      await execa("npm", ["--version"]);
    } catch (error) {
      console.log(chalk.yellow("⚠️ npm not found. Please install Node.js first."));
      process.exit(1);
    }
    console.log(chalk.green("✅ Next.js is ready!"));
  } catch (error) {
    console.error(chalk.red("❌ Next.js check failed:", error.message));
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