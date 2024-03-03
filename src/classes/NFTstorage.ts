import fs from "fs";
import { NFTStorage, Blob } from "nft.storage";
import { filesFromPath } from "files-from-path";
import { FileStorage } from "./FileStorage";
import {Web3Stash} from 'web3stash';
import { StorageService } from "web3stash/dist/mjs/services/base-storage";
//Provide service name, config properties like private keys

export class NFTstorage extends FileStorage {
	serviceBaseURL = "ipfs:/";
	
	service: StorageService;
	constructor(key: string) {
		super();
		this.service = Web3Stash("NFT.STORAGE", { token: { key } });
	
	}

	async uploadDirToService(dir: fs.PathLike): Promise<string> {
		const path = dir.toString();
		console.log(path)
	 return (await this.service.uploadFile(path)).id
		
	}

	async uploadFileToService(file: fs.PathLike): Promise<string> {
		const path = file.toString();
	return (await this.service.uploadFile(path).then().catch()).id
		
	}

	async uploadJSONToService(json: any): Promise<string> {
	return  (await this.service.uploadJson(json)).id
		
	}
}
