#!/usr/bin/env node

import { execa } from "execa";
import chalk from "chalk";

async function testPackageManagers() {
  console.log(chalk.blue("Testing package manager detection..."));
  
  try {
    // Test npm
    try {
      const { stdout: npmVersion } = await execa("npm", ["--version"]);
      console.log(chalk.green(`✅ npm detected: ${npmVersion}`));
    } catch (error) {
      console.log(chalk.yellow("⚠️ npm not detected"));
    }
    
    // Test pnpm
    try {
      const { stdout: pnpmVersion } = await execa("pnpm", ["--version"]);
      console.log(chalk.green(`✅ pnpm detected: ${pnpmVersion}`));
    } catch (error) {
      console.log(chalk.yellow("⚠️ pnpm not detected"));
    }
    
    console.log(chalk.blue("\nPackage manager detection test complete!"));
  } catch (error) {
    console.error(chalk.red("❌ Test failed:"), error.message);
  }
}

testPackageManagers(); 