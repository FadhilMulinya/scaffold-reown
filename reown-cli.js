#!/usr/bin/env node

import { execa } from "execa";
import chalk from "chalk";
import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";
import inquirer from "inquirer";
import ora from "ora";

// Define the repository URL
const SCAFFOLD_REPO = "https://github.com/FadhilMulinya/reown.git";

// Main function to run the CLI
async function main() {
  console.log(chalk.blue("🚀 Welcome to Scaffold Reown "));
  
  // Get project name from user
  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter your project name:',
      default: 'reown-project',
      validate: input => /^[a-z0-9-_]+$/i.test(input) || 'Project name can only contain letters, numbers, hyphens, and underscores'
    }
  ]);
  
  const projectPath = path.join(process.cwd(), projectName);
  
  try {
    // Check if directory already exists
    if (existsSync(projectPath)) {
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: `Directory ${projectName} already exists. Do you want to overwrite it?`,
          default: false
        }
      ]);
      
      if (!overwrite) {
        console.log(chalk.yellow('⚠️ Operation cancelled.'));
        process.exit(0);
      }
    }
    
    // Check for required tools
    await checkRequiredTools();
    
    // Clone the scaffold repository
    await cloneScaffoldRepo(projectPath);
    
    // Set up Foundry dependencies
    await setupFoundry(projectPath);
    
    // Set up Next.js dependencies
    await setupNextJs(projectPath);
    
    // Change into the project directory
    process.chdir(projectPath);
    
    // List directory contents
    const files = await fs.readdir(process.cwd());
    console.log(chalk.green("\n✅ Project setup complete!"));
    console.log(chalk.blue("\nProject contents:"));
    console.log(chalk.white(files.map(file => `  ${file}`).join('\n')));
    
    console.log(chalk.blue(`\nCd into ${projectName} and run the commands below to start development`));
    console.log(chalk.white(`  cd next-js`));
    console.log(chalk.white(`  Review the .env file and update as needed`));
    console.log(chalk.white(`  npm run dev\n`));
    
  } catch (error) {
    console.error(chalk.red("❌ Setup failed:"), error.message);
    process.exit(1);
  }
}

async function checkRequiredTools() {
  const spinner = ora("Checking required tools...").start();
  
  try {
    // Check for git
    try {
      await execa("git", ["--version"]);
    } catch (error) {
      spinner.fail();
      console.log(chalk.yellow("\n⚠️ Git not found. Please install Git first."));
      process.exit(1);
    }
    
    // Check for forge
    try {
      await execa("forge", ["--version"]);
    } catch (error) {
      spinner.fail();
      console.log(chalk.yellow("\n⚠️ Forge not found. Please install Foundry first:"));
      console.log(chalk.white("  curl -L https://foundry.paradigm.xyz | bash"));
      console.log(chalk.white("  foundryup"));
      process.exit(1);
    }
    
    // Check for npm
    try {
      await execa("npm", ["--version"]);
    } catch (error) {
      spinner.fail();
      console.log(chalk.yellow("\n⚠️ npm not found. Please install Node.js first."));
      process.exit(1);
    }
    
    spinner.succeed("All required tools are installed");
  } catch (error) {
    spinner.fail();
    console.error(chalk.red("\n❌ Tool check failed:"), error.message);
    throw error;
  }
}

async function cloneScaffoldRepo(projectPath) {
  const spinner = ora("Cloning scaffold repository...").start();
  
  try {
    await execa("git", ["clone", SCAFFOLD_REPO, projectPath]);
    
    // Remove the .git directory to start fresh
    const gitDir = path.join(projectPath, ".git");
    if (existsSync(gitDir)) {
      await fs.rm(gitDir, { recursive: true, force: true });
    }
    
    // Initialize a new git repository
    await execa("git", ["init"], { cwd: projectPath });
    
    spinner.succeed("Repository cloned successfully");
  } catch (error) {
    spinner.fail();
    console.error(chalk.red("\n❌ Repository cloning failed:"), error.message);
    throw error;
  }
}

async function setupFoundry(projectPath) {
  const foundryPath = path.join(projectPath, "foundry");
  const spinner = ora("Setting up Foundry environment...").start();
  
  try {
    // Check if foundry directory exists
    if (!existsSync(foundryPath)) {
      spinner.fail();
      console.error(chalk.red("\n❌ Foundry directory not found in the scaffold repository."));
      throw new Error("Foundry directory not found");
    }
    
    // Install Foundry dependencies
    await execa("forge", ["install"], { cwd: foundryPath });
    
    spinner.succeed("Foundry setup complete");
  } catch (error) {
    spinner.fail();
    console.error(chalk.red("\n❌ Foundry setup failed:"), error.message);
    throw error;
  }
}

async function setupNextJs(projectPath) {
  const nextJsPath = path.join(projectPath, "next-js");
  const spinner = ora("Setting up Next.js environment...").start();
  
  try {
    // Check if nextJs directory exists
    if (!existsSync(nextJsPath)) {
      spinner.fail();
      console.error(chalk.red("\n❌ Next.js directory not found in the scaffold repository."));
      throw new Error("Next.js directory not found");
    }
    
    // Install Next.js dependencies with legacy peer deps flag
    await execa("npm", ["install", "--legacy-peer-deps"], { cwd: nextJsPath });
    
    // Install additional packages including dotenv
    await execa(
      "npm", 
      ["install", "@reown/appkit", "@reown/appkit-adapter-wagmi", "wagmi", "viem", "@tanstack/react-query", "dotenv", "--legacy-peer-deps"], 
      { cwd: nextJsPath }
    );
    
    // Copy environment file
    if (existsSync(path.join(nextJsPath, ".env.example"))) {
      await execa("cp", [".env.example", ".env"], { cwd: nextJsPath });
      spinner.text = "Environment file copied (.env.example → .env)";
    } else {
      spinner.text = "No .env.example file found, skipping environment setup";
    }
    
    spinner.succeed("Next.js setup complete");
  } catch (error) {
    spinner.fail();
    console.error(chalk.red("\n❌ Next.js setup failed:"), error.message);
    throw error;
  }
}

main().catch((error) => {
  console.error(chalk.red("❌ Setup failed:"), error.message);
  process.exit(1);
});