using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZipDocsApi.Models
{
    public class Documents
    {
    }

    public class UploadFileRequest
    {
        
        public string Name { get; set; }

        public string FilePath { get; set; }

        public int FolderID { get; set; }

        public string Tags { get; set; }

        public string FileBytesBase64 { get; set; }
        public int AccountID { get; set; }

        public int ConsultantID { get; set; }

        public int CustomerID { get; set; }

        public string Extension { get; set; }
        public string disk_file_name { get; set; }
    }



    public class CreateFolderRequest
    {
        public int AccountID { get; set; }
        public string Name { get; set; }

        public int ParentID { get; set; }

        public int ConsultantID { get; set; }

        public int CustomerID { get; set; }

        public string disk_folder_name { get; set; }
    }

    public class FolderDetails
    {
        public int ID { get; set; }
        public int AccountID { get; set; }
        public string Name { get; set; }

        public int ParentID { get; set; }

        public int ConsultantID { get; set; }

        public int CustomerID { get; set; }

        public string DiskFolderName { get; set; }

    }

    
    public class FoldersResponse
    {
        public APIResponseHeader apiResponseHeader { get; set; }
        public List<FolderDetails> foldersDetails { get; set; }
    }

    public class FolderResponse
    {
        public APIResponseHeader apiResponseHeader { get; set; }
        public FolderDetails folderDetails { get; set; }
    }

    public class FileDetails
    {
        public int ID { get; set; }
        public string Name { get; set; }

        public int FolderID { get; set; }

        public string Tags { get; set; }

        public string FilePath { get; set; }
        public int AccountID { get; set; }

        public int ConsultantID { get; set; }

        public int CustomerID { get; set; }

        public string Extension { get; set; }
        public string DiskFileName { get; set; }
    }

    public class FileResponse
    {
        public APIResponseHeader apiResponseHeader { get; set; }
        public FileDetails fileDetails { get; set; }
    }

    public class FilesResponse
    {
        public APIResponseHeader apiResponseHeader { get; set; }
        public List<FileDetails> filesDetails { get; set; }
    }


}
