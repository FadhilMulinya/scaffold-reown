'use client'
import Image from "next/image";
import { useAccount, useDisconnect } from 'wagmi';
import ConnectButton from "../../components/ConnectBtn";

export default function Home() {
  const {address, isConnected} = useAccount();
  const {disconnect} = useDisconnect();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            My First App
          </h1>
          
          {/* Wallet Connection Section */}
          <div className="flex flex-col items-center gap-4">
            <ConnectButton />
            
            {isConnected && (
              <button 
                onClick={() => disconnect()}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                Disconnect
              </button>
            )}
          </div>
        </header>

        {/* Connection Status Section */}
        <div className="mt-8 p-6 bg-gray-800 rounded-xl shadow-lg">
          {isConnected ? (
            <div className="text-center">
              <div className="text-gray-400 mb-2">Connected Address:</div>
              <div className="font-mono bg-gray-700 p-3 rounded-lg break-all">
                {address}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 p-4">
              Not Connected
            </div>
          )}
        </div>
      </div>
    </div>
  );
}