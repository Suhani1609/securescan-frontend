import { useEffect, useState } from "react";
import API from "../services/api";

export default function History() {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    API.get("/scan/history").then(res => setScans(res.data));
  }, []);

  const formatSize = (bytes) => {
    if (!bytes) return "-";
    return (bytes / 1024 / 1024).toFixed(2) + " MB";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="p-8 bg-gray-950 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Scan History</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-gray-900 rounded-xl overflow-hidden">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="p-3 text-left">File</th>
              <th>Size</th>
              <th>Date</th>
              <th>Status</th>
              <th>Detections</th>
            </tr>
          </thead>

          <tbody>
            {scans.map((s, i) => (
              <tr key={i} className="border-t border-gray-800">
                <td className="p-3">{s.filename}</td>
                <td>{formatSize(s.filesize)}</td>
                <td>{formatDate(s.scanned_at)}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${s.malicious ? "bg-red-600" : "bg-green-600"}`}
                  >
                    {s.malicious ? "MALWARE" : "SAFE"}
                  </span>
                </td>

                <td>{s.detections}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
