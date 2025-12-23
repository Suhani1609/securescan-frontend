import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/scan/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) {
    return <p className="text-gray-400">Loading stats...</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <p className="text-gray-400">Total Scans</p>
          <h2 className="text-3xl font-bold text-blue-500">
            {stats.total_scans}
          </h2>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <p className="text-gray-400">Malware Found</p>
          <h2 className="text-3xl font-bold text-red-500">
            {stats.malware_found}
          </h2>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <p className="text-gray-400">Safe Files</p>
          <h2 className="text-3xl font-bold text-green-500">
            {stats.safe_files}
          </h2>
        </div>
      </div>
    </>
  );
}
