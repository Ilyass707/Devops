import React, { useState } from 'react';
import bg1 from '../assets/bg1.jpg';
import bgImg from '../assets/bg.jpg';
import losingImg from '../assets/losing.jpg';
import mtImg from '../assets/mt.jpg';
import CalorieCalculator from '../components/CalorieCalculator';
import BackButton from '../components/BackButton';


const muscleExercises = {
  Shoulders: ['Overhead Press', 'Lateral Raise', 'Front Raise', 'Arnold Press', 'Rear Delt Fly', 'Upright Row'],
  Back: ['Deadlift', 'Pull-up', 'Bent Over Row', 'Lat Pulldown', 'Seated Cable Row', 'T-Bar Row'],
  Biceps: ['Barbell Curl', 'Hammer Curl', 'Concentration Curl', 'Preacher Curl', 'Cable Curl', 'Incline Dumbbell Curl'],
  Triceps: ['Tricep Pushdown', 'Overhead Extension', 'Close-grip Bench Press', 'Skull Crushers', 'Dips', 'Kickbacks'],
  Legs: ['Squats', 'Lunges', 'Leg Press', 'Romanian Deadlift', 'Leg Curl', 'Leg Extension'],
  Chest: ['Bench Press', 'Incline Dumbbell Press', 'Chest Fly', 'Cable Crossover', 'Push-ups', 'Dumbbell Pullover'],
};

const programs = [
  {
    id: 1,
    name: 'Bulking',
    description: 'Gain muscle mass with high calorie intake and strength training.',
    image: bgImg,
    price: '$49',
    details: { mealsPerDay: 5, workoutsPerWeek: 6 },
  },
  {
    id: 2,
    name: 'Losing Weight',
    description: 'Reduce fat through calorie deficit and cardio exercises.',
    image: losingImg,
    price: '$39',
    details: { mealsPerDay: 4, workoutsPerWeek: 5 },
  },
  {
    id: 3,
    name: 'Maintenance',
    description: 'Maintain your current physique with balanced nutrition.',
    image: mtImg,
    price: '$29',
    details: { mealsPerDay: 3, workoutsPerWeek: 3 },
  },
];

const Programs = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [activeMuscle, setActiveMuscle] = useState('Shoulders');
  const [selectedDuration, setSelectedDuration] = useState(1);

  const toggleDetails = (id) => {
    if (expandedId === id) {
      // Collapse if already selected
      setExpandedId(null);
    } else {
      setExpandedId(id);
      setActiveMuscle('Shoulders');
      setSelectedDuration(1);
    }
  };

  const displayedPrograms = expandedId
    ? programs.filter((p) => p.id === expandedId)
    : programs;

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4 md:p-8"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      <BackButton />
      <h1 className="text-4xl font-bold text-white mb-10 text-center">Our Programs</h1>

      <div className={`mx-auto ${expandedId ? 'max-w-6xl' : 'grid gap-8 md:grid-cols-3'}`}>
        {displayedPrograms.map(({ id, name, description, image, price, details }) => {
          const numericPrice = parseInt(price.replace('$', ''), 10);
          const total = (numericPrice * selectedDuration).toFixed(2);

          return (
            <div
              key={id}
              className={`bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer p-6 flex flex-col ${
                expandedId ? 'w-full max-w-screen-xl mx-auto' : ''
              }`}
              onClick={() => toggleDetails(id)}
            >
              <img
                src={image}
                alt={name}
                className={`object-cover rounded mb-4 ${
                  expandedId ? 'w-full h-[400px]' : 'w-full h-48'
                }`}
              />

              <h2 className="text-2xl font-semibold">{name}</h2>
              <p className="text-gray-700 mt-2">{description}</p>
              <p className="text-green-600 font-bold text-lg mt-2">{price}/month</p>

              {expandedId === id && (
                <>
                  <div className="mt-4 text-sm text-gray-800 space-y-1" onClick={(e) => e.stopPropagation()}>
                    <p><strong>Meals per Day:</strong> {details.mealsPerDay}</p>
                    <p><strong>Workouts per Week:</strong> {details.workoutsPerWeek}</p>
                  </div>

                  {/* Duration and Buy */}
                  <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                    <label className="block font-medium mb-1">Select Duration (months):</label>
                    <select
                      className="border rounded p-2 mb-2"
                      value={selectedDuration}
                      onChange={(e) => setSelectedDuration(parseInt(e.target.value, 10))}
                    >
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} month{i + 1 > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>

                    <p className="text-green-700 font-semibold mb-2">Total: ${total}</p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`You selected ${name} for ${selectedDuration} month(s).\nTotal: $${total}.\nProceed to payment...`);
                      }}
                      className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded transition"
                    >
                      Buy Now
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="mt-6" onClick={(e) => e.stopPropagation()}>
                    <h3 className="text-xl font-semibold mb-4">Exercises by Muscle Group</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Object.keys(muscleExercises).map((muscle) => (
                        <button
                          key={muscle}
                          onClick={() => setActiveMuscle(muscle)}
                          className={`px-4 py-1 rounded ${
                            activeMuscle === muscle
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-300 text-gray-800'
                          }`}
                        >
                          {muscle}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {muscleExercises[activeMuscle].map((exercise, idx) => (
                        <div key={idx} className="bg-gray-100 p-3 rounded">
                          <p className="font-medium">{exercise}</p>
                          <p className="text-green-700 text-sm">3 sets, 5–8 reps to failure</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Calorie Calculator */}
                  <CalorieCalculator programName={name} />
                </>
              )}
            </div>
          );
        })}
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
