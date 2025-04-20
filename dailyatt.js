import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const weeklyAttendanceData = [
  {
    week: "April 15-19, 2025",
    days: [
      { day: "Monday", date: "April 15", status: "absent", checkIn: null, checkOut: null },
      { day: "Tuesday", date: "April 16", status: "absent", checkIn: null, checkOut: null },
      { day: "Wednesday", date: "April 17", status: "leave", checkIn: null, checkOut: null },
      { day: "Thursday", date: "April 18", status: "leave", checkIn: null, checkOut: null },
      { day: "Friday", date: "April 19", status: "pending", checkIn: null, checkOut: null }
    ]
  },
  {
    week: "April 8-12, 2025",
    days: [
      { day: "Monday", date: "April 8", status: "present", checkIn: "08:38 AM", checkOut: "03:30 PM" },
      { day: "Tuesday", date: "April 9", status: "present", checkIn: "08:42 AM", checkOut: "03:30 PM" },
      { day: "Wednesday", date: "April 10", status: "present", checkIn: "08:40 AM", checkOut: "03:30 PM" },
      { day: "Thursday", date: "April 11", status: "present", checkIn: "08:50 AM", checkOut: "03:30 PM" },
      { day: "Friday", date: "April 12", status: "present", checkIn: "08:45 AM", checkOut: "03:30 PM" }
    ]
  },
];

const DailyAttendance = () => {
  const [expandedWeek, setExpandedWeek] = useState("April 15-19, 2025");

  const toggleWeek = (week) => {
    setExpandedWeek(expandedWeek === week ? null : week);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "present":
        return <span className="badge bg-success">Present</span>;
      case "absent":
        return <span className="badge bg-danger">Absent</span>;
      case "leave":
        return <span className="badge bg-warning text-dark">Leave</span>;
      case "pending":
        return <span className="badge bg-secondary">Pending</span>;
      default:
        return <span className="badge bg-light text-dark">Unknown</span>;
    }
  };

  return (
    <div className="card">
            <h5 className="card-title mb-0">📋✅ Daily Attendance</h5>

      <div className="card-header">
        <small className="text-muted">View your daily attendance records by week</small>
      </div>
      <div className="card-body">
        {weeklyAttendanceData.map((weekData) => (
          <div key={weekData.week} className="mb-3 border rounded">
            <div 
              className="bg-light p-3 d-flex justify-content-between align-items-center" 
              style={{ cursor: 'pointer' }}
              onClick={() => toggleWeek(weekData.week)}
            >
              <strong>{weekData.week}</strong>
              <span className="text-primary">
                {expandedWeek === weekData.week ? "Hide" : "Show"} Details
              </span>
            </div>

            {expandedWeek === weekData.week && (
              <div className="table-responsive">
                <table className="table table-bordered mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Day</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weekData.days.map((day) => (
                      <tr key={day.date}>
                        <td><strong>{day.day}</strong></td>
                        <td>{day.date}</td>
                        <td>{getStatusBadge(day.status)}</td>
                        <td>{day.checkIn || "—"}</td>
                        <td>{day.checkOut || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyAttendance;