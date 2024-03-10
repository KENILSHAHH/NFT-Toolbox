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
    storageService : StorageService
	// async uploadDirToService(dir: PathLike): Promise<string> {
	// 	const files = filesFromPath(dir.toString(), {
	// 		pathPrefix: dir.toString(),
	// 	});
	// 	const cid = await this.storageService.;
	// }
// 	  async uploadDirToService(dir: PathLike): Promise<string> {
//     const directoryData = this.readDirectory(dir);
//     const directoryCID = await this.storageService.uploadFile(directoryData);
//     return directoryCID.id;
//   }

  async uploadFileToService(file: PathLike): Promise<string> {
	  const fileData = fs.readFileSync(file);
	 const filestring = fileData.toString()
    const fileCID = await this.storageService.uploadFile(filestring);
    return fileCID.id;
  }

	async uploadJSONToService(json: any): Promise<string> {
		console.log(json)
		const nftstr = Web3Stash("NFT.STORAGE",{token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkwOUYwN0M4Yjc2ODBBNDZkN0Q0ZDkwMmUzNjcyRDZmMzc3RTZjNzQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5NTU1NDIwNDkyOCwibmFtZSI6Ik9wZW5EYXRhSGFjayJ9.dSwxOQqrrFNGdaoO39NlcIK4G9fSoRKkgaxBrzrA_eg"})
		const jsonCID = await nftstr.uploadJson({ jhkjh: "hey" }).then().catch();
		console.log("fonr")
    return jsonCID.id;
  }


	
	constructor(storageServiceName: Web3StashServices, key: Web3StashConfig, serviceBaseUrl :string) {
		this.serviceBaseURL = serviceBaseUrl;
		this.storageService =  Web3Stash(storageServiceName, key);
	}
// 	async uploadCollection(
//     collection: Collection
//   ): Promise<{ metadataCID: string; assetCID: string }> {
//     console.log("Uploading Assets...");
//     const ImageFolderCID = await this.uploadDirToService(
//       path.join(collection.dir.toString(), "assets")
//     );

//     collection.setBaseURL(this.serviceBaseURL);
//     collection.setAssetsDirCID(ImageFolderCID);
//     collection.updateMetadataWithCID();

//     console.log("Uploading Metadata...");
//     const MetaFolderCID = await this.uploadDirToService(
//       path.join(collection.dir.toString(), "metadata")
//     );

//     collection.setMetadataDirCID(MetaFolderCID);

//     console.log("Upload Complete");
//     return { metadataCID: MetaFolderCID, assetCID: ImageFolderCID };
//   }

  async uploadSingle(
    asset: PathLike,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata: any
  ): Promise<{ metadataCID: string; assetCID: string }> {
    // console.log("Uploading Asset...");
    // const assetCID = await this.uploadFileToService(asset);

    // metadata.image = `${this.serviceBaseURL}/${assetCID}`;
	  console.log("Uploading Metadata...");
	  console.log("ehy")
    const metadataCID = await this.uploadJSONToService(
      JSON.stringify(metadata)
    );
    console.log("Upload Complete");
    return { metadataCID: metadataCID, assetCID: "" };
  }
}