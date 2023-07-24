import React from 'react'

import img2 from '../images/img2.jpg'

import img_1 from '../images/img_1.png'
import img_2 from '../images/img_2.jpg'
import img_3 from '../images/img_3.jpg'
import img_4 from '../images/img_4.png'
import img_5 from '../images/img_5.png'
import img_6 from '../images/img_6.jpg'
import img_7 from '../images/img_7.jpg'
import img_8 from '../images/img_8.png'
import img_9 from '../images/img_9.png'
import img_10 from '../images/img_10.png'

export default function Home() {
  return (
    <div>
        <section className='py-6 px-10'>
            <img src={img2} alt="Home" className='rounded-xl' />

            <div className='mx-auto lg:w-[70%] py-8'>
                <span className='text-xs my-2 mr-4 p-2 bg-pink-400 rounded-2xl font-bold '>COMMUNITY</span>
                <span className='text-xs text-gray-600'>5 MIN READ</span>
                <p className='text-3xl md:text-6xl text-indigo-950 font-bold my-8'>The Power of Screen-Free Social Connection: A Remedy for Today’s Loneliness Epidemic?</p>
                <p>The illusion of digital community From the day I downloaded my smartphone, my relationship to social connection was never the same. Playdates were replaced with FaceTimes, affirmations replaced w…</p>
                <span className="inline-block text-xs my-6 text-gray-600">2 WEEKS AGO</span>
            </div>
        </section>
        
        <div  className='h-[5px] w-full bg-gray-400/50 px-8'/>

        <section className='p-10' >
            <div className='text-lg'>
              <h3 className='text-3xl font-bold'>NEWS & TRENDS</h3>
              <p className='text-2xl py-8'>Stay up-to-date on the latest in live events with our exclusive insights, trends, surveys, and reports.</p>
            </div>

            <div className='flex  gap-10 flex-wrap md:flex-nowrap '>
                <div>
                  <img src={img_1} alt="Home" className='min-w-[300px] min-h-auto rounded-lg' />

                  <div className='w-[100%] pt-8'>
                      <span className='text-xs my-2 mr-4 p-2 bg-blue-600 rounded-2xl font-bold text-white'>REPORTS</span>
                      <span className='text-xs text-gray-600'>10 MIN READ</span>
                      <p className='lg:text-3xl text-lg text-indigo-950 font-bold my-8'>2022 Events-App Survey Recap: How Creators Organize and Market Events, and How Attendees Find Them</p>
                      <p className='max-w-[80%]'>A few times each year, Events-App's research team launches surverys to find out more about you --- the people who organize events on Events-App and your event attendees. Your invaluable input guides us...</p>
                      <span className="inline-block text-xs my-6 text-gray-600">JAN 26 2023</span>
                  </div>
                </div>

                <div className='flex gap-6'>

                  <div className='min-w-[150px] max-w-[300px]'>

                    <div className='mb-20 md:mb-4 h-[267px]'>
                      <img className='rounded-md  mb-2 max-h-[250px]' src={img_2} alt={img_2} />
                      <span className='text-white text-xs bg-blue-800 py-1 px-2 my-6 rounded-2xl'>TERNDS</span>
                      <h6 className='font-bold my-2 text-indigo-950'>Emerging Trends: Buisinesses Use Events to Prevent Employee Burnout
                      </h6>
                      <span className='text-xs text-gray-600 py-6 rounded-2xl'>SEP 18 2022</span>
                    </div>

                    <div className='max-h-[267px] mb-20 md:mb-4'>
                      <img className='rounded-md mb-2' src={img_3} alt="" />
                      <span className='text-white text-xs bg-blue-800 py-1 px-2 my-6 rounded-2xl'>TERNDS</span>
                      <h6 className='font-bold my-2 text-indigo-950'>5 Travel Trends to Consider for Your Attraction</h6>
                      <span className='text-xs text-gray-600 p-2 rounded-2xl'>JUN 13 2022</span>
                    </div>

                    <div className='max-h-[267px]'>
                      <img className='rounded-md mb-2' src={img_6} alt="" />
                      <span className='text-white text-xs bg-blue-800 py-1 px-2 my-6 rounded-2xl'>NEWS & TERNDS</span>
                      <h6 className='font-bold my-2 text-indigo-950'>Eventbrite Releases 2022 Summer Trends Report</h6>
                      <span className='text-xs text-gray-600 p-2 rounded-2xl'>JUN 17 2022</span>
                    </div>
                  </div>

                  <div className='min-w-[150px] max-w-[300px]'>

                    <div className='mb-20 md:mb-4 h-[267px]'>
                      <img className='rounded-md  mb-2' src={img_4} alt="" />
                      <span className='text-white text-xs bg-blue-800 py-1 px-2 my-6 rounded-2xl'>TERNDS</span>
                      <h6 className='font-bold my-2 text-indigo-950'>What'S Old Is New: Tips for Managing No-Shows in 2022</h6>
                      <span className='text-xs text-gray-600p-2 rounded-2xl'>JUL 28 2022</span>
                    </div>

                    <div className='max-h-[267px]'>
                      <img className='rounded-md  mb-2' src={img_5} alt="" />
                      <span className='text-white text-xs bg-blue-800 py-1 px-2 my-6 rounded-2xl'>NEWS</span>
                      <h6 className='font-bold my-2 text-indigo-950'>Eventbrite's Music Council on Perseverting Through Continued Uncertainty</h6>
                      <span className='text-xs text-gray-600  p-2 rounded-2xl'>JUN 8 2022</span>
                    </div>
                  </div>
                </div>
            </div>
        </section>
        <div  className='h-[5px] w-full bg-gray-400/50 px-8'/>

        <section className='py-12 px-10'>
          <h3 className='text-2xl font-bold pb-8'>TRENDING</h3>
          <div className='flex gap-6 flex-wrap md:flex-nowrap '>

            <div className='min-w-[200px] max-w-[670px] flex gap-6'>

              <div className='min-h-[300px]'>
                <img className='rounded-md mb-2 max-h-[250px]' src={img_7} alt={img_2} />
                <span className='text-white text-xs bg-blue-800 py-1 px-2 my-6 rounded-2xl'>TERNDS</span>
                <h6 className='font-bold my-2 text-indigo-950'>Emerging Trends: Buisinesses Use Events to Prevent Employee Burnout
                </h6>
                <span className='text-xs text-gray-600 py-6 rounded-2xl'>SEP 18 2022</span>
              </div>

              <div className='min-h-[300px]'>
                <img className='rounded-md mb-2' src={img_8} alt="" />
                <span className='text-white text-xs bg-blue-800 py-1 px-2 my-6 rounded-2xl'>NEWS & TERNDS</span>
                <h6 className='font-bold my-2 text-indigo-950'>Eventbrite Releases 2022 Summer Trends Report</h6>
                <span className='text-xs text-gray-600 p-2 rounded-2xl'>JUN 17 2022</span>
              </div>

            </div>

            <div className='min-w-[200px] max-w-[670px] flex gap-6'>

              <div className='min-h-[300px]'>
                <img className='rounded-md  mb-2' src={img_9} alt="" />
                <span className='text-white text-xs bg-blue-800 py-1 px-2 my-6 rounded-2xl'>TERNDS</span>
                <h6 className='font-bold my-2 text-indigo-950'>What'S Old Is New: Tips for Managing No-Shows in 2022</h6>
                <span className='text-xs text-gray-600 p-2 rounded-2xl'>JUL 28 2022</span>
              </div>

              <div className='min-h-[300px]'>
                <img className='rounded-md mb-2' src={img_10} alt="" />
                <span className='text-white text-xs bg-blue-800 py-1 px-2 my-6 rounded-2xl'>NEWS</span>
                <h6 className='font-bold my-2 text-indigo-950'>Eventbrite's Music Council on Perseverting Through Continued Uncertainty</h6>
                <span className='text-xs text-gray-600  p-2 rounded-2xl'>JUN 8 2022</span>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}
