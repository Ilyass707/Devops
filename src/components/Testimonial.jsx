import React from 'react';
import { testimonials } from '../assets/assets';
import StartRating from './StartRating';

const updatedTestimonials = testimonials.map((t, index) => {
  const fitnessTestimonials = [
    {
      name: "Emily R.",
      address: "Los Angeles, CA",
      review: "StayFit helped me build a consistent routine. I’ve gained strength and confidence thanks to the personalized programs!"
    },
    {
      name: "James K.",
      address: "Brooklyn, NY",
      review: "I love how StayFit keeps me on track. The progress tracking and coach tips really push me to stay focused."
    },
    {
      name: "Sofia M.",
      address: "Austin, TX",
      review: "StayFit makes fitness feel achievable. I finally feel in control of my health and my body again!"
    }
  ];
  return {
    ...t,
    ...fitnessTestimonials[index]
  };
});

const Testimonial = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30'>
      <div className="text-center">
        <h2 className="text-3xl font-bold">What Our Users Say</h2>
        <p className="text-gray-600 mt-2">Discover why people trust StayFit to reach their fitness goals</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 mt-20 mb-10">
        {updatedTestimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow max-w-xs">
            <div className="flex items-center gap-3">
              <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
              <div>
                <p className="font-playfair text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <StartRating />
            </div>
            <p className="text-gray-500 max-w-90 mt-4">"{testimonial.review}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
