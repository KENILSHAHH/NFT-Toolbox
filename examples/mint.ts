import path from "path";
import fs from "fs";
import { nftToolbox } from "../src/index";

nftToolbox.initContract({
	name: "DemoContract",
	symbol: "DEMO",
	dir: path.join(__dirname, "Contracts"),
	standard: "ERC1155",
	connection: JSON.parse(
		fs.readFileSync(path.join(__dirname, "connection.json")).toString()
	),
	deployed: {
		address: "0xe7f9a7D7945aCfa9180c60c2A4A8669566471faE",
		abi: fs.readFileSync(path.join(__dirname, "abi.json")).toString(),
	},
});

const demoMintNFT = async () => {
	const address = "0xb2927B4Da693f685F54cf8355D1654116fF79346";

	let bal = await nftToolbox.readContract("balanceOf", [address]);
	console.log("Balance: ", bal.toString());

	console.log("Minting New Token");
	const tx = await nftToolbox.writeContract("safeMint", [address]);
	await tx.wait();

	bal = await nftToolbox.readContract("balanceOf", [address]);
	console.log("Balance: ", bal.toString());
};

demoMintNFT();
