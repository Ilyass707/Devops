// src/components/CalorieCalculator.jsx
import React, { useState } from 'react';

const CalorieCalculator = ({ programName }) => {
  const [formData, setFormData] = useState({ weight: '', age: '', height: '', trainingPerWeek: '' });
  const [calorieResult, setCalorieResult] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const calculateCalories = () => {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    const age = parseFloat(formData.age);
    const training = parseInt(formData.trainingPerWeek, 10);

    if (!weight || !height || !age || !training) {
      alert('Please fill all fields correctly.');
      return;
    }

    let maintenance = 10 * weight + 6.25 * height - 5 * age + 5;
    let activityFactor = training <= 2 ? 1.2 : training <= 4 ? 1.375 : training <= 6 ? 1.55 : 1.725;
    maintenance *= activityFactor;

    let adjustedCalories = maintenance;
    if (programName === 'Bulking') adjustedCalories += 300;
    else if (programName === 'Losing Weight') adjustedCalories -= 300;

    setCalorieResult(Math.round(adjustedCalories));
  };

  return (
    <div className="mt-6 border-t pt-6" onClick={(e) => e.stopPropagation()}>
      {!showForm ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowForm(true);
            setCalorieResult(null);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
        >
          Calculate Daily Calorie Intake
        </button>
      ) : (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              calculateCalories();
            }}
            className="flex flex-wrap gap-6 items-end mt-4"
          >
            {['weight', 'height', 'age', 'trainingPerWeek'].map((field) => (
              <div key={field} className="flex flex-col flex-1 min-w-[140px]">
                <label className="mb-1 font-medium" htmlFor={field}>
                  {field === 'weight'
                    ? 'Weight (kg):'
                    : field === 'height'
                    ? 'Height (cm):'
                    : field === 'trainingPerWeek'
                    ? 'Training Sessions per Week:'
                    : `${field.charAt(0).toUpperCase() + field.slice(1)}:`}
                </label>
                <input
                  type="number"
                  name={field}
                  id={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                  required
                />
              </div>
            ))}

            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
              Calculate
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowForm(false);
                setCalorieResult(null);
                setFormData({ weight: '', age: '', height: '', trainingPerWeek: '' });
              }}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
            >
              Cancel
            </button>
          </form>

          {calorieResult !== null && (
            <p className="mt-4 text-lg font-semibold text-green-700">
              Your daily calorie intake: {calorieResult} kcal
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CalorieCalculator;
