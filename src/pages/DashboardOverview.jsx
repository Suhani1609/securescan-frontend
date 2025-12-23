import { useEffect, useState } from "react";
import API from "../services/api";

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    total: 0,
    malware: 0,
    safe: 0,
  });

  useEffect(() => {
    API.get("/scan/history").then(res => {
      const scans = res.data;
      const malware = scans.filter(s => s.malicious).length;
      const safe = scans.filter(s => !s.malicious).length;

      setStats({
        total: scans.length,
        malware,
        safe,
      });
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Scans" value={stats.total} />
        <StatCard title="Malware Found" value={stats.malware} color="red" />
        <StatCard title="Safe Files" value={stats.safe} color="green" />
      </div>
    </div>
  );
}

function StatCard({ title, value, color = "blue" }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <p className="text-gray-400">{title}</p>
      <h2 className={`text-3xl font-bold text-${color}-500`}>
        {value}
      </h2>
    </div>
  );
}
