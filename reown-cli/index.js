#!/usr/bin/env node
import { execa } from "execa";
import chalk from "chalk";

console.log(chalk.blue("🚀 Setting up your Blockchain project..."));

async function setupFoundry() {
  console.log(chalk.green("🔧 Setting up Foundry..."));
  try {
    await execa("forge", ["install"], { cwd: "../foundry" });
    console.log(chalk.green("✅ Foundry setup complete!"));
  } catch (error) {
    console.error(chalk.red("❌ Foundry setup failed:", error.message));
  }
}

async function setupNextJs() {
  console.log(chalk.green("🔧 Setting up Next.js..."));
  try {
    await execa("npm", ["install", "@reown/appkit", "@reown/appkit-adapter-wagmi", "wagmi", "viem", "@tanstack/react-query"], { cwd: "../nextJs" });
    console.log(chalk.green("✅ Next.js setup complete!"));
  } catch (error) {
    console.error(chalk.red("❌ Next.js setup failed:", error.message));
  }
}

async function startDevServer() {
  console.log(chalk.blue("🚀 Starting development server..."));
  try {
    await execa("npm", ["run", "dev"], { cwd: "./nextJs", stdio: "inherit" });
  } catch (error) {
    console.error(chalk.red("❌ Failed to start development server:", error.message));
  }
}

async function main() {
  await setupFoundry();
  await setupNextJs();
  await startDevServer();
}

main();