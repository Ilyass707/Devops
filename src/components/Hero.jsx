import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col items-start justify-center px-6 md:px-16 
                    lg:px-24 xl:px-32 text-white bg-[url("/src/assets/bg1.jpg")] 
                    bg-no-repeat bg-cover bg-center h-screen'>
    <p className='bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20'>The Ultimate Coaching Guide </p>
    <h1 className='font-playfair text-2xl md:text-5xl md:text-[46px] md:leading-[56px]
     font-bold md:font-extrabold max-w-xl mt-4'>Achieve Your Dream Body with Personalized 
        Fitness and Nutrition Plans Designed Just for You</h1>
    </div>
  )
}

export default Hero