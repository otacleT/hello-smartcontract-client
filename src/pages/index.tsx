import { ethers } from "ethers";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [string, setString] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setSigner(provider.getSigner());
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  const show = async () => {
    if (typeof window.ethereum !== "undefined") {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const abi = [
        {
          inputs: [
            {
              internalType: "string",
              name: "_text",
              type: "string",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_setTxt",
              type: "string",
            },
          ],
          name: "set",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "show",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ];
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        // useState
        const val = await contract.show();
        setString(val);
      } catch (error) {
        console.log(error);
      }
    }
    return null;
  };
  const set = async (txt: string) => {
    if (typeof window.ethereum !== "undefined") {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const abi = [
        {
          inputs: [
            {
              internalType: "string",
              name: "_text",
              type: "string",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_setTxt",
              type: "string",
            },
          ],
          name: "set",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "show",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ];
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        await contract.set(txt);
      } catch (error) {
        console.log(error);
      }
      setText("");
    }
    return null;
  };
  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="flex max-w-sm justify-center mx-auto pt-20 flex-wrap">
      {isConnected ? (
        <>
          <h1 className="text-3xl font-bold ">{string}</h1>
          <input
            className="border border-black w-full p-2 mt-5"
            type="text"
            onChange={(e) => handleText(e)}
            value={text}
          />
          <button
            className="flex justify-center items-center w-[100px] py-2 bg-black text-white mt-3 mr-2"
            onClick={() => show()}
          >
            Show
          </button>
          <button
            className="flex justify-center items-center w-[100px] py-2 bg-black text-white mt-3 ml-2"
            onClick={() => set(text)}
          >
            Change
          </button>
        </>
      ) : (
        <button
          className="flex justify-center items-center w-[100px] py-2 bg-black text-white mt-3"
          onClick={() => connect()}
        >
          Connect
        </button>
      )}
    </div>
  );
}
