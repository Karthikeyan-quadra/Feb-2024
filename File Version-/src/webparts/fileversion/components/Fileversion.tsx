// import * as React from 'react';
// import { useState } from 'react';

// import { IFileversionProps } from './IFileversionProps';
// import { UploadFile } from '../../../helpers/Service';

// export default function Fileversion(props: IFileversionProps) {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files && event.target.files[0];
//     setSelectedFile(file);
//   };

//   const handleUpload = () => {
//     if (selectedFile) {
//       // Upload the selected file
//       UploadFile(selectedFile, "DocumentUploaded");
//     } else {
//       // Handle the case where no file is selected
//       console.warn('No file selected for upload');
//     }
//   };

//   return (
//     <div>
//       <p style={{ fontSize: "20px" }}>
//         <b>Choose the File to upload </b>
//       </p>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// }


// // Fileversion.tsx code works for file upload and fetch data from sharepoint
// import * as React from 'react';
// import { useEffect, useState } from 'react';
// import { IFileversionProps } from './IFileversionProps';
// import { UploadFile, getAllFilesInFolder} from '../../../helpers/Service';

// export default function Fileversion(props: IFileversionProps) {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [files, setFiles] = useState<any[]>([]);

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   const fetchFiles = async () => {
//     try {
//       const files:any = await getAllFilesInFolder();
//       setFiles(files);
//     } catch (error) {
//       console.error('Error fetching files:', error);
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files && event.target.files[0];
//     setSelectedFile(file);
//   };

//   const handleUpload = async () => {
//     try {
//       if (selectedFile) {
//         await UploadFile(selectedFile, "DocumentUploaded");
//         fetchFiles();
//       } else {
//         console.warn('No file selected for upload');
//       }
//     } catch (error) {
//       console.error('Error during file upload:', error);
//     }
//   };

//   return (
//     <div>
//       <p style={{ fontSize: "20px" }}>
//         <b>Choose the File to upload </b>
//       </p>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
      
//       <p style={{ fontSize: "20px" }}>
//         <b>Files in DocumentUploaded Library:</b>
//       </p>
//       <ul>
//         {files.map(file => (
//           <li key={file.UniqueId}>
//           {file.UniqueId} - {file.Name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// // Fileversion.tsx
// import * as React from 'react';
// import { useEffect, useState } from 'react';
// import { IFileversionProps } from './IFileversionProps';
// import { UploadFile, getAllFilesInFolder } from '../../../helpers/Service';

// export default function Fileversion(props: IFileversionProps) {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [files, setFiles] = useState<any[]>([]);

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   const fetchFiles = async () => {
//     try {
//       const files: any = await getAllFilesInFolder("DocumentUploaded");
//       setFiles(files);
//     } catch (error) {
//       console.error('Error fetching files:', error);
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files && event.target.files[0];
//     setSelectedFile(file);
//   };

//   const handleUpload = async () => {
//     try {
//       if (selectedFile) {
//         await UploadFile(selectedFile, "DocumentUploaded");
//         fetchFiles();
//       } else {
//         console.warn('No file selected for upload');
//       }
//     } catch (error) {
//       console.error('Error during file upload:', error);
//     }
//   };

//   return (
//     <div>
//       <p style={{ fontSize: "20px" }}>
//         <b>Choose the File to upload </b>
//       </p>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
      
//       <p style={{ fontSize: "20px" }}>
//         <b>Files in DocumentUploaded Library:</b>
//       </p>
//       <ul>
//         {files.map(file => (
//           <li key={file.UniqueId}>
//             {file.UniqueId} - {file.Name} - {file.UIVersionLabel}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// Fileversion.tsx
import * as React from 'react';
import { useEffect, useState } from 'react';
import { IFileversionProps } from './IFileversionProps';
import { UploadFile, getAllFilesInFolder, getFileVersionHistory } from '../../../helpers/Service'; // Import the new function

export default function Fileversion(props: IFileversionProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [versionHistory, setVersionHistory] = useState<any[]>([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const files: any = await getAllFilesInFolder("DocumentUploaded");
      setFiles(files);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };



  const handleFileVersionHistory = async (fileUniqueId: string) => {
    try {
      const History = await getFileVersionHistory(fileUniqueId);
      setVersionHistory(History); // Use setVersionHistory to update the state

      console.log("File Version History:", History);
      // Handle the version history as needed
    } catch (error) {
      console.error('Error fetching file version history:', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    try {
      if (selectedFile) {
        const result = await UploadFile(selectedFile, "DocumentUploaded");
        fetchFiles();

        // Assuming result.UniqueId is the unique ID of the uploaded file
        await handleFileVersionHistory(result.UniqueId);
      } else {
        console.warn('No file selected for upload');
      }
    } catch (error) {
      console.error('Error during file upload:', error);
    }
  };

  return (
    <div>
      <p style={{ fontSize: "20px" }}>
        <b>Choose the File to upload </b>
      </p>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      
      <p style={{ fontSize: "20px" }}>
        <b>Files in DocumentUploaded Library:</b>
      </p>
      <ul>
        {files.map(file => (
          <li key={file.UniqueId}>
            {file.UniqueId} - {file.Name} - {file.UIVersionLabel}
          </li>
        ))}
      </ul>

      <p style={{ fontSize: "20px" }}>
        <b>File Version History:</b>
      </p>
      <ul>
        {versionHistory.map((version: any) => (
          <li key={version.VersionId}>
            {version.VersionLabel} - {version.CreatedBy} - {version.CreatedDate}
          </li>
        ))}
      </ul>
    </div>
  );
}
