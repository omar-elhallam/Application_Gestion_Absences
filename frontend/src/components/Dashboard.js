import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';
import axios from 'axios';

const Dashboard = () => {
  const [attendanceStats, setAttendanceStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:3001/attendance-stats');
        setAttendanceStats(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques.');
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    if (attendanceStats.length > 0) {
      new Chart('attendanceChart', {
        type: 'bar',
        data: {
          labels: attendanceStats.map((stat) => stat.studentName),
          datasets: [
            {
              label: 'Nombre d\'absences',
              data: attendanceStats.map((stat) => stat.absences),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
      });
    }
  }, [attendanceStats]);

  return (
    <div className="dashboard">
      <h2>Statistiques des absences</h2>
      <canvas id="attendanceChart"></canvas>
    </div>
  );
};

export default Dashboard;
