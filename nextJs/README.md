npx create-next-app@latest

yarn add @reown/appkit @reown/appkit-adapter-wagmi wagmi viem @tanstack/react-query

yarn add dotenv -safely store our env

touch .env in root folder and copy and paste the key.
NEXT_PUBLIC_PROJECT ="project-id"

mkdir config/index.tsx
export const projectId = process.env.NEXT_PUBLIC_PROJECT ;



mkdir context/index.tsx

proceed to layout.tsx

import { cookieToInitialState } from "wagmi";


head over to contract

check the src/ scrips/ folder
run this comman if the lib folder is empty 
forge install foundry-rs/forge-std
forge build to verify

create a .env file and add the following ..theu should be there
SEPOLIA_RPC_URL=
ETHERSCAN_API_KEY=

head over to foundry.toml and add the following down below 
[rpc_endpoints]
sepolia = "${SEPOLIA_RPC_URL}"

[etherscan]
sepolia = { key = "${ETHERSCAN_API_KEY}" }

now run this 

# To load the variables in the .env file
source .env

# To deploy and verify our contract
forge script --chain sepolia script/Counter.s.sol:CounterScript --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv --interactives 1



