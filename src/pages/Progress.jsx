import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-react';
import { db } from '../firebase';
import DailyInput from './DailyInput'; // Import the DailyInput component

const Progress = () => {
  const { user } = useUser();

  const [dailyData, setDailyData] = useState([]);

  const fetchDailyData = async () => {
    if (!user) return;
    try {
      const q = query(
        collection(db, 'dailyProgress'),
        where('userId', '==', user.id),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate ? doc.data().date.toDate() : new Date(doc.data().date),
      }));
      setDailyData(data);
    } catch (error) {
      console.error('Error fetching daily data:', error);
    }
  };

  useEffect(() => {
    fetchDailyData();
  }, [user]);

  // Prepare data for charts
  const workoutCounts = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
  const hoursSleptByDay = { Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: [] };

  dailyData.forEach(entry => {
    const dayName = entry.date.toLocaleDateString('en-US', { weekday: 'short' });
    if (dayName in workoutCounts) {
      if (entry.didTrain) workoutCounts[dayName] += 1;
      if (entry.hoursSlept) hoursSleptByDay[dayName].push(entry.hoursSlept);
    }
  });

  const avgHoursSleptData = Object.entries(hoursSleptByDay).map(([day, hoursArray]) => {
    const avg = hoursArray.length
      ? hoursArray.reduce((a, b) => a + b, 0) / hoursArray.length
      : 0;
    return { day, avgHoursSlept: Number(avg.toFixed(1)) };
  });

  const workoutData = Object.entries(workoutCounts).map(([day, count]) => ({
    day,
    workouts: count,
  }));

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6 text-white"
      style={{ backgroundImage: `url(${assets.bg1})` }}
    >
        
      <div className="bg-black/70 p-6 rounded-xl max-w-5xl mx-auto">
        {/* Daily input form, with refresh callback */}
        <DailyInput onNewEntry={fetchDailyData} />
        <h1 className="text-3xl font-bold mb-6">Your Progress</h1>
        <p className="mb-6">Track your workouts, goals, and achievements below.</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Workout Frequency Line Chart */}
          <div className="bg-white p-4 rounded-lg text-gray-800">
            <h2 className="text-xl font-semibold mb-4">Weekly Workout Frequency</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={workoutData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="workouts" stroke="#8884d8" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Average Hours Slept Bar Chart */}
          <div className="bg-white p-4 rounded-lg text-gray-800">
            <h2 className="text-xl font-semibold mb-4">Average Hours Slept per Day</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={avgHoursSleptData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 12]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgHoursSlept" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
