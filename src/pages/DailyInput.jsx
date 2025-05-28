import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-react';

const muscleGroups = [
  "Chest",
  "Back",
  "Legs",
  "Shoulders",
  "Biceps",
  "Triceps"
];

const DailyInput = ({ onNewEntry }) => {
  const { user } = useUser();

  // Get today's date and day string
  const today = new Date();
  const dayString = today.toLocaleDateString('en-US', { weekday: 'short' }); // e.g., "Mon"

  const [didTrain, setDidTrain] = useState(false);
  const [muscles, setMuscles] = useState([]);
  const [hoursSlept, setHoursSlept] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const toggleMuscle = (muscle) => {
    setMuscles(prev =>
      prev.includes(muscle)
        ? prev.filter(m => m !== muscle)
        : [...prev, muscle]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage('You must be signed in to submit data.');
      return;
    }
    if (hoursSlept === '' || Number(hoursSlept) < 0 || Number(hoursSlept) > 24) {
      setMessage('Please enter a valid number of hours slept (0–24).');
      return;
    }
    if (didTrain && muscles.length === 0) {
      setMessage('Please select at least one muscle group if you trained.');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      await addDoc(collection(db, "dailyProgress"), {
        userId: user.id,
        date: Timestamp.fromDate(today),
        day: dayString,  // Save the day here
        didTrain,
        muscles,
        hoursSlept: Number(hoursSlept),
        notes,
      });
      setMessage('Progress saved successfully!');
      // Reset form
      setDidTrain(false);
      setMuscles([]);
      setHoursSlept('');
      setNotes('');

      if (onNewEntry) {
        onNewEntry(); // Tell parent to refresh data!
      }
    } catch (error) {
      setMessage('Error saving progress: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10 text-gray-900">
        
      <h1 className="text-2xl font-bold mb-2">Daily Progress Input</h1>

      {/* Display current day */}
      <p className="mb-4 text-lg font-semibold">
        Today is <span className="text-blue-600">{dayString}</span>
      </p>

      <form onSubmit={handleSubmit} aria-label="Daily progress input form">

        <label className="flex items-center mb-5 cursor-pointer">
          <input
            type="checkbox"
            checked={didTrain}
            onChange={() => setDidTrain(!didTrain)}
            className="mr-2"
            aria-checked={didTrain}
          />
          Did you train today?
        </label>

        {didTrain && (
          <div className="mb-6">
            <p className="font-semibold mb-3">Which muscle groups did you train?</p>
            {muscleGroups.map((muscle) => (
              <label key={muscle} className="flex items-center mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={muscles.includes(muscle)}
                  onChange={() => toggleMuscle(muscle)}
                  className="mr-2"
                  aria-checked={muscles.includes(muscle)}
                />
                {muscle}
              </label>
            ))}
          </div>
        )}

        <label className="block mb-6">
          <span className="font-semibold mb-1 block">Hours slept last night:</span>
          <input
            type="number"
            min="0"
            max="24"
            step="0.1"
            value={hoursSlept}
            onChange={(e) => setHoursSlept(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            aria-required="true"
            aria-label="Hours slept last night"
            placeholder="e.g., 7.5"
          />
        </label>

        <label className="block mb-6">
          <span className="font-semibold mb-1 block">Additional notes:</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="How do you feel? Any comments?"
            aria-label="Additional notes"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
          aria-busy={loading}
        >
          {loading ? 'Saving...' : 'Save Progress'}
        </button>

      </form>

      {message && (
        <p
          className={`mt-6 text-center font-semibold ${
            message.includes('Error') ? 'text-red-600' : 'text-green-600'
          }`}
          role="alert"
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default DailyInput;
