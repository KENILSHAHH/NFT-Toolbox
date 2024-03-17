import { PathLike } from "fs";
import path from "path";
import fs from "fs";
import { filesFromPath } from "files-from-path";
import { Collection } from "./Collection";
import { Web3Stash } from "web3stash";
import { StorageService } from "web3stash/dist/mjs/services/base-storage";
import { Web3StashServices,Web3StashConfig} from "web3stash/dist/mjs/types";
export class FileStorage {
	serviceBaseURL: string;
	storageService: StorageService;

 async uploadDirToService(dir: fs.PathLike): Promise<string> {
		const files = filesFromPath(dir.toString(), {
			pathPrefix: dir.toString(),
		});
	 const cid = await this.storageService.uploadFile(dir.toString());
	 console.log(cid.id)
		return cid.id;
	}

	async uploadFileToService(file: fs.PathLike): Promise<string> {
		const fileBinary = fs.readFileSync(file);
		const fileBlob = new Blob([fileBinary]);
		const cid = await this.storageService.uploadFile(file.toString());
		console.log(cid.id)
		return cid.id;
	}

	async uploadJSONToService(json: any): Promise<string> {
		const fileBlob = new Blob([json]);
		const cid = await this.storageService.uploadJson(json);
		return cid.id;
	}

	constructor(storageServiceName: Web3StashServices, key: Web3StashConfig, serviceBaseUrl :string) {
		this.serviceBaseURL = serviceBaseUrl;
		this.storageService =  Web3Stash(storageServiceName, key);
	}

 async uploadCollection(
		collection: Collection
	): Promise<{ metadataCID: string; assetCID: string }> {
		console.log("Uploading Assets...");
		const ImageFolderCID = await this.uploadDirToService(
			path.join(collection.dir.toString(), "assets")
		);

		collection.setBaseURL(this.serviceBaseURL);
		collection.setAssetsDirCID(ImageFolderCID);
		collection.updateMetadataWithCID();

		console.log("Uploading Metadata...");
		const MetaFolderCID = await this.uploadDirToService(
			path.join(collection.dir.toString(), "metadata")
		);

		collection.setMetadataDirCID(MetaFolderCID);

		console.log("Upload Complete");
		return { metadataCID: MetaFolderCID, assetCID: ImageFolderCID };
	}

	async uploadSingle(
		asset: PathLike,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		metadata: any
	): Promise<{ metadataCID: string; assetCID: string }> {
		console.log("Uploading Asset...");
		const assetCID = await this.uploadFileToService(asset);

		metadata.image = `${this.serviceBaseURL}/${assetCID}`;
		console.log("Uploading Metadata...");
		const metadataCID = await this.uploadJSONToService(
			metadata
		);
		console.log("Upload Complete");
		return { metadataCID, assetCID };
	}
}