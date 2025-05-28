import React from "react";
import { Link } from "react-router-dom";
import bg1 from "../assets/bg1.jpg"; // background image
import sam from "../assets/sam.jpg"; // new hero image
import track from "../assets/track.png"; 
import BackButton from '../components/BackButton';
// local track progress icon

const About = () => {
  return (
    <div
      className="pt-20 px-4 md:px-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg1})` }}
    >
        <BackButton />
      {/* Overlay */}
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Transform Your Fitness Journey
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We're here to help you achieve your goals — whether it's gaining muscle, losing weight, or maintaining a healthy lifestyle.
          </p>
          <img
            src={sam}
            alt="Fitness Hero"
            className="mx-auto mt-8 rounded-xl shadow-md max-w-3xl"
          />
        </section>

        {/* Mission Section */}
        <section className="text-center mb-20">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Our mission is to make personalized fitness accessible to everyone, no matter their experience or location. We blend expert coaching with smart technology to create results-driven programs tailored just for you.
          </p>
        </section>

        {/* How It Works Section */}
        <section className="mb-24">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-gray-800">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center">
              <img
                src="https://img.icons8.com/ios-filled/50/program.png"
                alt="Choose Program"
                className="h-14 mb-4"
              />
              <h3 className="text-lg font-medium">1. Choose a Program</h3>
              <p className="text-sm text-gray-600 mt-2">
                Select your fitness goal: gain muscle, lose fat, or maintain health.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://img.icons8.com/ios-filled/50/dumbbell.png"
                alt="Get Workouts"
                className="h-14 mb-4"
              />
              <h3 className="text-lg font-medium">2. Get Custom Workouts</h3>
              <p className="text-sm text-gray-600 mt-2">
                Receive daily personalized workouts and meal plans from expert coaches.
              </p>
            </div>
            <div className="flex flex-col items-center">
              {/* Use local track.png */}
              <img
                src={track}
                alt="Track Progress"
                className="h-14 mb-4"
              />
              <h3 className="text-lg font-medium">3. Track Your Progress</h3>
              <p className="text-sm text-gray-600 mt-2">
                Monitor your progress, stay motivated, and achieve lasting results.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Ready to Start?
          </h2>
          <p className="text-gray-600 mb-6">
            Join our platform and get your first personalized program today.
          </p>
          <Link
            to="/programs"
            className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-900 transition"
          >
            Explore Programs
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;
