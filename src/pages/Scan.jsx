// import { useState } from "react";
// import API from "../services/api";
// import { toast } from "react-toastify";
// import { Loader2, FileText, FileArchive, FileCode } from "lucide-react";

// export default function Scan() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);

//   const handleScan = async () => {
//     if (!file) {
//       toast.warning("Please select a file");
//       return;
//     }

//     setLoading(true);
//     setResult(null);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await API.post("/scan/", formData);
//       setResult(res.data);

//       res.data.malicious
//         ? toast.error("⚠ Malware Detected")
//         : toast.success("✅ File is Safe");
//     } catch {
//       toast.error("Scan failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // File icon based on type
//   const getFileIcon = () => {
//     if (!file) return null;
//     const name = file.name.toLowerCase();

//     if (name.endsWith(".pdf")) return <FileText size={40} className="text-red-400" />;
//     if (name.endsWith(".zip") || name.endsWith(".rar"))
//       return <FileArchive size={40} className="text-yellow-400" />;
//     if (name.endsWith(".exe"))
//       return <FileCode size={40} className="text-purple-400" />;

//     return <FileText size={40} className="text-gray-400" />;
//   };

//   return (
//     <div className="max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">File Scanner</h1>

//       {/* DRAG & DROP AREA */}
//       <div
//         className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center bg-gray-900 hover:border-blue-500 transition"
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={(e) => {
//           e.preventDefault();
//           setFile(e.dataTransfer.files[0]);
//         }}
//       >
//         {file ? (
//           <div className="flex flex-col items-center gap-2">
//             {getFileIcon()}
//             <p className="text-sm text-gray-300">{file.name}</p>
//             <p className="text-xs text-gray-500">
//               {(file.size / 1024).toFixed(1)} KB
//             </p>
//           </div>
//         ) : (
//           <p className="text-gray-400">
//             Drag & drop a file here or click below
//           </p>
//         )}

//         <input
//           type="file"
//           className="mt-4 w-full text-sm"
//           onChange={(e) => setFile(e.target.files[0])}
//         />
//       </div>

//       {/* SCAN BUTTON */}
//       <button
//         onClick={handleScan}
//         disabled={loading}
//         className="mt-4 w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 py-3 rounded-lg font-semibold flex justify-center items-center gap-2"
//       >
//         {loading && <Loader2 className="animate-spin" size={18} />}
//         {loading ? "Scanning..." : "Scan File"}
//       </button>

//       {/* RESULT CARD */}
//       {result && (
//         <div
//           className={`mt-6 p-4 rounded-xl border transition-all duration-300
//           ${
//             result.malicious
//               ? "border-red-600 bg-red-900/30"
//               : "border-green-600 bg-green-900/30"
//           }`}
//         >
//           <p><b>File:</b> {result.filename}</p>
//           <p><b>Status:</b> {result.threat_level}</p>
//           <p><b>Detections:</b> {result.detections}</p>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import {
  Loader2,
  FileText,
  FileArchive,
  FileCode,
  Folder
} from "lucide-react";

export default function Scan() {
  const [file, setFile] = useState(null);
  const [folderFiles, setFolderFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(null);

  /* ---------- SINGLE FILE SCAN ---------- */
  const handleScan = async () => {
    if (!file) return toast.warning("Please select a file");

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/scan/", formData);
      setResult(res.data);

      res.data.malicious
        ? toast.error("⚠ Malware Detected")
        : toast.success("✅ File is Safe");
    } catch {
      toast.error("Scan failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- FOLDER SCAN ---------- */
  const handleFolderScan = async () => {
    if (!folderFiles.length)
      return toast.warning("Please select a folder");

    setLoading(true);
    setProgress({ current: 0, total: folderFiles.length });
    setResult(null);

    let malwareCount = 0;

    for (let i = 0; i < folderFiles.length; i++) {
      const formData = new FormData();
      formData.append("file", folderFiles[i]);

      try {
        const res = await API.post("/scan/", formData);
        if (res.data.malicious) malwareCount++;
      } catch {
        toast.error(`Failed: ${folderFiles[i].name}`);
      }

      setProgress({ current: i + 1, total: folderFiles.length });
    }

    setLoading(false);
    setProgress(null);

    malwareCount > 0
      ? toast.error(`⚠ ${malwareCount} infected files found`)
      : toast.success("✅ Folder is clean");
  };

  /* ---------- ICON HELPERS ---------- */
  const getFileIcon = (name) => {
    if (!name) return null;
    const lower = name.toLowerCase();

    if (lower.endsWith(".pdf"))
      return <FileText size={40} className="text-red-400" />;
    if (lower.endsWith(".zip") || lower.endsWith(".rar"))
      return <FileArchive size={40} className="text-yellow-400" />;
    if (lower.endsWith(".exe"))
      return <FileCode size={40} className="text-purple-400" />;

    return <FileText size={40} className="text-gray-400" />;
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Scanner</h1>

      {/* ================= FILE SCAN UI ================= */}
      <div className="mb-6 border-2 border-dashed border-gray-700 rounded-xl p-6 text-center bg-gray-900 hover:border-blue-500 transition">
        {file ? (
          <div className="flex flex-col items-center gap-2">
            {getFileIcon(file.name)}
            <p className="text-sm text-gray-300">{file.name}</p>
            <p className="text-xs text-gray-500">
              {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
        ) : (
          <p className="text-gray-400">
            Drag & drop a file here or click below
          </p>
        )}

        <input
          type="file"
          className="mt-4 w-full text-sm"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          onClick={handleScan}
          disabled={loading}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 py-3 rounded-lg font-semibold flex justify-center items-center gap-2"
        >
          {loading && <Loader2 className="animate-spin" size={18} />}
          {loading ? "Scanning..." : "Scan File"}
        </button>
      </div>

      {/* ================= FOLDER SCAN UI (SAME STYLE) ================= */}
      <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center bg-gray-900 hover:border-indigo-500 transition">
        {folderFiles.length > 0 ? (
          <div className="flex flex-col items-center gap-2">
            <Folder size={40} className="text-indigo-400" />
            <p className="text-sm text-gray-300">
              {folderFiles.length} files selected
            </p>
          </div>
        ) : (
          <p className="text-gray-400">
            Drag & drop a folder here or click below
          </p>
        )}

        <input
          type="file"
          webkitdirectory="true"
          multiple
          className="mt-4 w-full text-sm"
          onChange={(e) => setFolderFiles([...e.target.files])}
        />

        <button
          onClick={handleFolderScan}
          disabled={loading}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 py-3 rounded-lg font-semibold flex justify-center items-center gap-2"
        >
          {loading && <Loader2 className="animate-spin" size={18} />}
          {loading ? "Scanning Folder..." : "Scan Folder"}
        </button>

        {progress && (
          <p className="mt-2 text-xs text-gray-400">
            Scanning {progress.current} / {progress.total}
          </p>
        )}
      </div>

      {/* ================= RESULT CARD (FILE ONLY) ================= */}
      {result && (
        <div
          className={`mt-6 p-4 rounded-xl border transition-all duration-300
          ${
            result.malicious
              ? "border-red-600 bg-red-900/30"
              : "border-green-600 bg-green-900/30"
          }`}
        >
          <p><b>File:</b> {result.filename}</p>
          <p><b>Status:</b> {result.threat_level}</p>
          <p><b>Detections:</b> {result.detections}</p>
        </div>
      )}
    </div>
  );
}
