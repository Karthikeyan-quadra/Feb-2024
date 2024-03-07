// // Services.ts
// import "@pnp/sp/webs";
// import "@pnp/sp/files";
// import "@pnp/sp/folders";
// import "@pnp/sp/clientside-pages";
// import { getSP } from "./Pnpconfig";



// export async function UploadFile(file: File, folderPath: string) {
//   try {
//     const fileNamePath: any = encodeURI(file.name);
//     console.log(fileNamePath);
//     const decodedFileNamePath = decodeURIComponent(fileNamePath);
//     console.log(decodedFileNamePath);

//     const sp = getSP();
//     let result: any;

//     if (file.size <= 10485760) {
//       // small upload
//       result = await sp.web.getFolderByServerRelativePath(folderPath).files.addUsingPath(decodedFileNamePath, file, { Overwrite: true });
//     } else {
//       // large upload
//       result = await sp.web.getFolderByServerRelativePath(folderPath).files.addChunked(decodedFileNamePath, file, data => {
//         console.log(`progress`);
//       }, true);
//     }

//     console.log(`Result of file upload: ${JSON.stringify(result)}`);
//     return result; // Returning the result for further processing

//   } catch (error) {
//     console.error("Error during file upload:", error);
//     throw error; // Rethrow the error to handle it in the calling function
//   }
// }

// // export async function checkFileVersion(fileId: string) {
// //   try {
// //     const sp = getSP();
// //     const version: any = await sp.web.getFileById(fileId).versions.select("fields").expand("fields");

// //     console.log("Version Information:", version);

// //     // Access specific fields if needed
// //     const title: any = version.fields ? version.fields.Title : undefined;
    
// //     if (title !== undefined) {
// //       console.log("Title:", title);
// //     } else {
// //       console.log("Title is undefined for this version.");
// //     }

// //     // You can access other fields in a similar manner

// //   } catch (error) {
// //     console.error("Error checking file version:", error);
// //     throw error; // Rethrow the error to handle it in the calling function
// //   }
// // }



// export async function checkFileVersion(fileId: string) {
//   try {
//     const sp = getSP();
    
//     // Get the file by its unique ID
//     const file:any = await sp.web.lists.getByTitle("DocumentUploaded").items.getById(fileId);
    
//     if (file) {
//       // Get all versions of the file
//       const versions: any = await file.versions.get();

//       console.log("Version Information:", versions);

//       for (const version of versions) {
//         // Access version properties as needed
//         console.log("Modified:", version.Created);
//       }
//     } else {
//       console.warn("File not found with the provided ID");
//     }
//   } catch (error) {
//     console.error("Error checking file versions:", error);
//     throw error;
//   }
// }



// // Services.ts
// import "@pnp/sp/webs";
// import "@pnp/sp/files";
// import "@pnp/sp/folders";
// import "@pnp/sp/items";
// import "@pnp/sp/lists";

// import "@pnp/sp/clientside-pages";
// import { getSP } from "./Pnpconfig";



// export async function UploadFile(file: File, folderPath: string) {
//   try {
//     const fileNamePath: any = encodeURI(file.name);
//     console.log(fileNamePath);
//     const decodedFileNamePath = decodeURIComponent(fileNamePath);
//     console.log(decodedFileNamePath);

//     const sp = getSP();
//     let result: any;

//     if (file.size <= 10485760) {
//       // small upload
//       result = await sp.web.getFolderByServerRelativePath(folderPath).files.addUsingPath(decodedFileNamePath, file, { Overwrite: true });
//     } else {
//       // large upload
//       result = await sp.web.getFolderByServerRelativePath(folderPath).files.addChunked(decodedFileNamePath, file, data => {
//         console.log(`progress`);
//       }, true);
//     }

//     console.log(`Result of file upload: ${JSON.stringify(result)}`);
//     return result; // Returning the result for further processing

//   } catch (error) {
//     console.error("Error during file upload:", error);
//     throw error; // Rethrow the error to handle it in the calling function
//   }
// }



// export async function getAllFilesInFolder(folderPath: string) {
//   try {
//     const sp = getSP();

//     // Get the folder by its server-relative path
//     const folder:any = sp.web.getFolderByServerRelativePath(folderPath);

//     // Get a specific item by its ID for demonstration purposes (replace with your actual item ID)
//     const itemId:any = 1;
//     const listItem:any= await sp.web.lists.getByTitle("DocumenUploaded").items.getById(itemId);
//     console.log("List Item:", listItem);

//     // Retrieve all files in the folder
//     const files = await folder.files();
//     console.log("Files in Folder:", files);

//     return files;
//   } catch (error) {
//     console.error("Error fetching files from folder:", error);
//     throw error;
//   }
// }


// Services.ts
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/clientside-pages";
import { getSP } from "./Pnpconfig";
import "@pnp/sp/presets/all";

export async function UploadFile(file: File, folderPath: string) {
  try {
    const fileNamePath: any = encodeURI(file.name);
    const decodedFileNamePath = decodeURIComponent(fileNamePath);

    const sp = getSP();
    let result: any;

    if (file.size <= 10485760) {
      // small upload
      result = await sp.web.getFolderByServerRelativePath(folderPath).files.addUsingPath(decodedFileNamePath, file, { Overwrite: true });
    } else {
      // large upload
      result = await sp.web.getFolderByServerRelativePath(folderPath).files.addChunked(decodedFileNamePath, file, data => {
        console.log(`progress`);
      }, true);
    }

    console.log(`Result of file upload: ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    console.error("Error during file upload:", error);
    throw error;
  }
}

export async function getAllFilesInFolder(folderPath: string) {
  try {
    const sp = getSP();
    const folder:any = sp.web.getFolderByServerRelativePath(folderPath);

    const files = await folder.files();
    // for (const file of files) {
    //   const fileItem = await sp.web.getFileById(file.UniqueId).getItem();
    //   console.log("File details:", file);
    //   console.log("File item details:", fileItem);
    // }


    console.log(files);


    return files;
  } catch (error) {
    console.error("Error fetching files from folder:", error);
    throw error;
  }
}

export const getFileVersionHistory = async (fileUniqueId: string) => {
  try {
    const sp = getSP();

    const file:any = sp.web.getFileById(fileUniqueId);
    const fileVersions = await file.versions.get();
    return fileVersions;
  } catch (error) {
    console.error("Error fetching file version history:", error);
    throw error;
  }
}
