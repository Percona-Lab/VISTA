import { useState } from "react";
import {
  BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, Cell, ResponsiveContainer
} from "recharts";

const STATUS_COLORS = {
  "To Do": "#9E9E9E",
  "In Progress": "#2196F3",
  "In Review": "#FF9800",
  "Pending Release": "#4CAF50",
  "Blocked/Waiting": "#F44336",
};

const PRIORITY_COLORS = {
  "Urgent": "#F44336",
  "Critical": "#FF6B35",
  "High": "#FF9800",
  "Medium": "#4CAF50",
  "Low": "#2196F3",
};

const statusData = [
  { name: "To Do", value: 68 },
  { name: "In Progress", value: 5 },
  { name: "In Review", value: 9 },
  { name: "Pending Release", value: 14 },
  { name: "Blocked/Waiting", value: 4 },
];

const priorityData = [
  { name: "High", value: 78 },
  { name: "Critical", value: 12 },
  { name: "Urgent", value: 5 },
  { name: "Medium", value: 5 },
];

const assigneeData = [
  { name: "Unassigned", value: 54 },
  { name: "P. Skibinski", value: 5 },
  { name: "O. Lukin", value: 4 },
  { name: "A. Nogueira", value: 4 },
  { name: "K. Holubicki", value: 4 },
  { name: "V. Yalovets", value: 4 },
  { name: "E. Gunes", value: 3 },
  { name: "S. Bodapati", value: 3 },
  { name: "Y. Sorokin", value: 3 },
  { name: "V. Nagaraju", value: 3 },
  { name: "D. Lenev", value: 2 },
  { name: "M. Hansson", value: 2 },
];

const epicData = [
  { name: "OIDC Authentication", key: "PS-10999", status: "Open", issues: 0 },
  { name: "PS 9.7.0-0 Release", key: "PS-10977", status: "In Progress", issues: 2 },
  { name: "PS 8.4.9-9 Release", key: "PS-10969", status: "Open", issues: 1 },
  { name: "PS 8.0.46-37 Release", key: "PS-10961", status: "Open", issues: 1 },
  { name: "Audit Log Filter", key: "PS-10337", status: "In Progress", issues: 2 },
  { name: "Vector Search Integration", key: "PS-10256", status: "In Progress", issues: 0 },
  { name: "BinLog Server (Phase II)", key: "PS-10133", status: "In Progress", issues: 0 },
  { name: "JavaScript Stored Routines (GA)", key: "PS-10160", status: "In Progress", issues: 0 },
  { name: "MyRocks Failures Investigation", key: "PS-10202", status: "In Progress", issues: 0 },
  { name: "KMIP Library", key: "PS-9694", status: "Open", issues: 1 },
  { name: "MySQL Telemetry", key: "PS-10261", status: "Open", issues: 0 },
  { name: "ProxySQL Support (K8S)", key: "K8SPS-662", status: "Open", issues: 0 },
];

const criticalItems = [
  { key: "PS-10913", summary: "PERCONA crashes on multi-table UPDATE ... STRAIGHT_JOIN when widening WHERE predicate", priority: "Critical", status: "Open", assignee: "Unassigned" },
  { key: "PS-10903", summary: "Inconsistent query results when using EXISTS subqueries with MyISAM engine", priority: "Critical", status: "Open", assignee: "Unassigned" },
  { key: "PS-10317", summary: "Error codes appeared as garbled text when outputting error messages", priority: "Critical", status: "Open", assignee: "Unassigned" },
  { key: "PS-10127", summary: "Complex collection query incorrectly missing '0'", priority: "Critical", status: "Open", assignee: "Unassigned" },
  { key: "PS-10124", summary: "Percona Distribution for MySQL Returns Incorrect Results for IN Clause", priority: "Critical", status: "Open", assignee: "Unassigned" },
  { key: "PS-10072", summary: "extend varchar DDL success, but data is corrupted when using column_format", priority: "Critical", status: "Open", assignee: "O. Lukin" },
  { key: "K8SPS-545", summary: "Constantly growing memory consumption with group replication", priority: "Critical", status: "Open", assignee: "E. Gunes" },
];

const recentlyCompleted = [
  { key: "PS-10998", summary: "Telemetry getting installed even when disabling during installation" },
  { key: "PS-10906", summary: "UPDATE IGNORE fails to match rows when combining OR-weakened predicate" },
  { key: "PS-10879", summary: "Multi-table UPDATE with CTE returns zero rows when weakening predicate" },
  { key: "PS-10639", summary: "MySQL 8.4 docker images based on Debian 13" },
  { key: "PS-10876", summary: "MySQL 8.4 optimizer uses full table scan for IN (...) on prefix index" },
  { key: "PS-10578", summary: "Audit log plugin does not log values in DB if session is not started" },
];

const EPIC_STATUS_COLORS = {
  "Open": "#9E9E9E",
  "In Progress": "#2196F3",
  "In QA": "#FF9800",
  "On Hold": "#F44336",
};

export default function TeamStatusDashboard() {
  const [showAllCritical, setShowAllCritical] = useState(false);
  const displayedCritical = showAllCritical ? criticalItems : criticalItems.slice(0, 5);

  return (
    <div className="p-6 bg-white min-h-screen max-w-6xl mx-auto">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-1">
        Team Status Dashboard: MySQL
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Jira data as of April 2, 2026 | Projects: PS, K8SPS, MYR, DISTMYSQL
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-400">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Total Active</p>
          <p className="text-3xl font-bold text-gray-900">100</p>
          <p className="text-xs text-gray-400">across 4 projects</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
          <p className="text-xs text-gray-500 uppercase tracking-wide">In Progress</p>
          <p className="text-3xl font-bold text-blue-700">5</p>
          <p className="text-xs text-gray-400">+ 9 in review</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Pending Release</p>
          <p className="text-3xl font-bold text-green-700">14</p>
          <p className="text-xs text-gray-400">ready to ship</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Urgent + Critical</p>
          <p className="text-3xl font-bold text-orange-700">17</p>
          <p className="text-xs text-red-500">5 urgent, 12 critical</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Completed (14d)</p>
          <p className="text-3xl font-bold text-purple-700">30</p>
          <p className="text-xs text-gray-400">last 2 weeks</p>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Status Distribution</h3>
        <ResponsiveContainer width="100%" height={80}>
          <BarChart data={[{
            "To Do": 68, "In Progress": 5, "In Review": 9,
            "Pending Release": 14, "Blocked/Waiting": 4
          }]} layout="vertical" barSize={36}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" hide />
            <Tooltip formatter={(value, name) => [`${value} issues`, name]} />
            {Object.entries(STATUS_COLORS).map(([key, color]) => (
              <Bar key={key} dataKey={key} stackId="status" fill={color} radius={0} />
            ))}
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-2">
          {statusData.map(s => (
            <div key={s.name} className="flex items-center gap-1.5 text-xs text-gray-600">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: STATUS_COLORS[s.name] }} />
              {s.name}: {s.value}
            </div>
          ))}
        </div>
      </div>

      {/* Two Column: Priority + Assignees */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Priority Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={priorityData} dataKey="value" nameKey="name" cx="50%" cy="50%"
                   innerRadius={50} outerRadius={90} paddingAngle={2}>
                {priorityData.map(entry => (
                  <Cell key={entry.name} fill={PRIORITY_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} issues`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Top Assignees</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={assigneeData} layout="vertical" margin={{ left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={75} />
              <Tooltip />
              <Bar dataKey="value" name="Active Issues" radius={[0, 4, 4, 0]}>
                {assigneeData.map((entry) => (
                  <Cell key={entry.name}
                    fill={entry.name === "Unassigned" ? "#F44336" : "#1A4D2E"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Epics */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Active Epics & Initiatives ({epicData.length})
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium text-gray-600">Epic</th>
                <th className="text-left p-3 font-medium text-gray-600">Key</th>
                <th className="text-left p-3 font-medium text-gray-600">Status</th>
                <th className="text-right p-3 font-medium text-gray-600">Child Issues</th>
              </tr>
            </thead>
            <tbody>
              {epicData.map((epic) => (
                <tr key={epic.key} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-900">{epic.name}</td>
                  <td className="p-3 text-gray-500">{epic.key}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: EPIC_STATUS_COLORS[epic.status] || "#9E9E9E" }} />
                      {epic.status}
                    </span>
                  </td>
                  <td className="p-3 text-right text-gray-600">{epic.issues}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Note: 86 of 100 active issues are not linked to an epic (standalone/ungrouped)
        </p>
      </div>

      {/* Critical/Urgent Items */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          <span className="text-red-600">⚠</span> Urgent & Critical Items ({criticalItems.length})
        </h3>
        <div className="space-y-2">
          {displayedCritical.map(item => (
            <div key={item.key} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${item.priority === "Urgent" ? "bg-red-600 text-white" : "bg-orange-500 text-white"}`}>
                {item.priority}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-gray-900">{item.key}</span>
                <span className="text-sm text-gray-600 ml-2">{item.summary}</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded ${item.assignee === "Unassigned" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"}`}>
                {item.assignee}
              </span>
            </div>
          ))}
        </div>
        {criticalItems.length > 5 && (
          <button onClick={() => setShowAllCritical(!showAllCritical)}
                  className="mt-2 text-sm text-blue-600 hover:underline">
            {showAllCritical ? "Show less" : `Show all ${criticalItems.length} items`}
          </button>
        )}
      </div>

      {/* Recently Completed */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Recently Completed (last 14 days) — {30} items
        </h3>
        <div className="space-y-1">
          {recentlyCompleted.map(item => (
            <div key={item.key} className="flex items-center gap-2 py-1.5 text-sm">
              <span className="text-green-500">✓</span>
              <span className="font-medium text-gray-500">{item.key}</span>
              <span className="text-gray-700">{item.summary}</span>
            </div>
          ))}
          <p className="text-xs text-gray-400 mt-1">... and 24 more</p>
        </div>
      </div>

      {/* Key Findings */}
      <div className="bg-gray-50 rounded-lg p-5 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Findings</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• <strong>54% of issues are unassigned</strong> (54/100) — significantly above the 40% threshold. Triage and assignment needed.</li>
          <li>• <strong>17 urgent/critical bugs are open</strong>, including server crashes (PS-10913, PS-8958) and data corruption (PS-10072). Most are unassigned.</li>
          <li>• <strong>68% of active issues are still in "To Do"</strong> — only 5 are actively in progress. May indicate capacity constraints or backlog grooming needed.</li>
          <li>• <strong>6 active epics are in progress:</strong> PS 9.7.0 Release, Audit Log Filter, Vector Search, BinLog Server Phase II, JavaScript Stored Routines, MyRocks investigation.</li>
          <li>• <strong>30 items completed in the last 14 days</strong> — healthy throughput. Includes Debian 13 docker images and multiple query correctness fixes.</li>
        </ul>
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-400">
        Data source: Jira (perconadev.atlassian.net) | Projects: PS, K8SPS, MYR, DISTMYSQL |
        Generated by VISTA on {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
