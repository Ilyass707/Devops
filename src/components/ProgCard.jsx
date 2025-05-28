import React, { useState } from 'react';
import bg1 from '../assets/bg1.jpg';
import bgImg from '../assets/bg.jpg';
import losingImg from '../assets/losing.jpg';
import mtImg from '../assets/mt.jpg';

const programs = [
  {
    id: 1,
    name: 'Bulking',
    description: 'Gain muscle mass with high calorie intake and strength training.',
    image: bgImg,
    price: '$49/month',
    details: {
      mealsPerDay: 5,
      workoutsPerWeek: 6,
      muscleGroups: {
        Chest: ['Bench Press - 5-8 reps to failure', 'Incline Bench - 5-8 reps to failure', 'Dumbbell Fly - 5-8 reps to failure', 'Push-ups - 5-8 reps to failure', 'Cable Crossover - 5-8 reps to failure', 'Chest Press Machine - 5-8 reps to failure'],
        Back: ['Deadlift - 5-8 reps to failure', 'Pull-ups - 5-8 reps to failure', 'Barbell Row - 5-8 reps to failure', 'Lat Pulldown - 5-8 reps to failure', 'T-Bar Row - 5-8 reps to failure', 'Seated Row - 5-8 reps to failure'],
        Shoulders: ['Overhead Press - 5-8 reps to failure', 'Lateral Raises - 5-8 reps to failure', 'Front Raise - 5-8 reps to failure', 'Rear Delt Fly - 5-8 reps to failure', 'Arnold Press - 5-8 reps to failure', 'Barbell Shrugs - 5-8 reps to failure'],
        Biceps: ['Barbell Curl - 5-8 reps to failure', 'Dumbbell Curl - 5-8 reps to failure', 'Hammer Curl - 5-8 reps to failure', 'Concentration Curl - 5-8 reps to failure', 'Preacher Curl - 5-8 reps to failure', 'Cable Curl - 5-8 reps to failure'],
        Triceps: ['Tricep Pushdown - 5-8 reps to failure', 'Overhead Tricep Extension - 5-8 reps to failure', 'Skull Crushers - 5-8 reps to failure', 'Dips - 5-8 reps to failure', 'Close Grip Bench - 5-8 reps to failure', 'Rope Pushdown - 5-8 reps to failure'],
        Legs: ['Squats - 5-8 reps to failure', 'Leg Press - 5-8 reps to failure', 'Lunges - 5-8 reps to failure', 'Leg Curl - 5-8 reps to failure', 'Leg Extension - 5-8 reps to failure', 'Calf Raises - 5-8 reps to failure'],
      }
    }
  },
  {
    id: 2,
    name: 'Losing Weight',
    description: 'Reduce fat through calorie deficit and cardio exercises.',
    image: losingImg,
    price: '$39/month',
    details: {
      mealsPerDay: 4,
      workoutsPerWeek: 5,
      muscleGroups: {}
    }
  },
  {
    id: 3,
    name: 'Maintenance',
    description: 'Maintain your current physique with balanced nutrition.',
    image: mtImg,
    price: '$29/month',
    details: {
      mealsPerDay: 3,
      workoutsPerWeek: 3,
      muscleGroups: {}
    }
  }
];

const Programs = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    weight: '',
    age: '',
    height: '',
    trainingPerWeek: '',
  });
  const [calorieResult, setCalorieResult] = useState(null);

  const toggleDetails = (id) => {
    setExpandedId(expandedId === id ? null : id);
    setCalorieResult(null);
    setFormData({ weight: '', age: '', height: '', trainingPerWeek: '' });
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const calculateCalories = (program) => {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    const age = parseFloat(formData.age);
    const training = parseInt(formData.trainingPerWeek, 10);

    if (!weight || !height || !age || !training) {
      alert('Please fill all fields correctly.');
      return;
    }

    let maintenance = 10 * weight + 6.25 * height - 5 * age + 5;

    let activityFactor = 1.2;
    if (training <= 2) activityFactor = 1.2;
    else if (training <= 4) activityFactor = 1.375;
    else if (training <= 6) activityFactor = 1.55;
    else activityFactor = 1.725;

    maintenance = maintenance * activityFactor;

    let adjustedCalories = maintenance;

    if (program.name === 'Bulking') {
      adjustedCalories += 300;
    } else if (program.name === 'Losing Weight') {
      adjustedCalories -= 300;
    }

    setCalorieResult(Math.round(adjustedCalories));
  };

  const displayedPrograms = expandedId
    ? programs.filter((p) => p.id === expandedId)
    : programs;

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      <h1 className="text-4xl font-bold text-white mb-10 text-center">Our Programs</h1>
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
        {displayedPrograms.map(({ id, name, description, image, price, details }) => (
          <div
            key={id}
            className="bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer p-6 flex flex-col"
            onClick={() => toggleDetails(id)}
          >
            <img src={image} alt={name} className="w-full h-48 object-cover rounded" />
            <h2 className="text-2xl font-semibold mt-4">{name}</h2>
            <p className="text-gray-700 mt-2">{description}</p>
            <p className="text-green-600 font-bold text-lg mt-2">{price}</p>

            {expandedId === id && (
              <>
                <div className="mt-4 text-sm text-gray-800 space-y-1">
                  <p><strong>Meals per Day:</strong> {details.mealsPerDay}</p>
                  <p><strong>Workouts per Week:</strong> {details.workoutsPerWeek}</p>

                  {details.muscleGroups && Object.keys(details.muscleGroups).length > 0 && (
                    <div>
                      <strong className="block mt-2">Exercises by Muscle Group:</strong>
                      <div className="mt-2">
                        {Object.entries(details.muscleGroups).map(([muscle, exercises], idx) => (
                          <div key={idx} className="mb-2">
                            <h4 className="font-semibold">{muscle}:</h4>
                            <ul className="list-disc list-inside ml-4">
                              {exercises.map((ex, i) => (
                                <li key={i}>{ex}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 border-t pt-6" onClick={(e) => e.stopPropagation()}>
                  {!showForm && (
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
                  )}

                  {showForm && (
                    <>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          calculateCalories({ name });
                        }}
                        className="flex flex-wrap gap-6 items-end mt-4"
                      >
                        <div className="flex flex-col flex-1 min-w-[140px]">
                          <label className="mb-1 font-medium" htmlFor="weight">Weight (kg):</label>
                          <input
                            type="number"
                            name="weight"
                            id="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            className="p-2 border rounded"
                            required
                          />
                        </div>

                        <div className="flex flex-col flex-1 min-w-[140px]">
                          <label className="mb-1 font-medium" htmlFor="height">Height (cm):</label>
                          <input
                            type="number"
                            name="height"
                            id="height"
                            value={formData.height}
                            onChange={handleInputChange}
                            className="p-2 border rounded"
                            required
                          />
                        </div>

                        <div className="flex flex-col flex-1 min-w-[140px]">
                          <label className="mb-1 font-medium" htmlFor="age">Age (years):</label>
                          <input
                            type="number"
                            name="age"
                            id="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            className="p-2 border rounded"
                            required
                          />
                        </div>

                        <div className="flex flex-col flex-1 min-w-[140px]">
                          <label className="mb-1 font-medium" htmlFor="trainingPerWeek">
                            Training Sessions per Week:
                          </label>
                          <input
                            type="number"
                            name="trainingPerWeek"
                            id="trainingPerWeek"
                            value={formData.trainingPerWeek}
                            onChange={handleInputChange}
                            className="p-2 border rounded"
                            required
                            min={1}
                          />
                        </div>

                        <button
                          type="submit"
                          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                        >
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
              </>
            )}
          </div>
        ))}
      </div>

      {expandedId && (
        <div className="text-center mt-8">
          <button
            onClick={() => setExpandedId(null)}
            className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900 transition"
          >
            Show All Programs
          </button>
        </div>
      )}
    </div>
  );
};

export default Programs;
