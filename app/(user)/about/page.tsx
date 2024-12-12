import Feedback from '@/components/feedback/feedback';
import CarouselComponent from '@/components/hero/courolsel'
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
    title: "Mini Project Prepare for final Project ",
    description: "This is About page section",
    openGraph:{
        images:"https://istad.co/resources/img/CSTAD_120.png",
        description:"This is a mini project to prepare for the final project."
    }
  };

  const timeline = [
    {
      name: 'Founded company',
      description:
        'Nihil aut nam. Dignissimos a pariatur et quos omnis. Aspernatur asperiores et dolorem dolorem optio voluptate repudiandae.',
      date: 'Aug 2021',
      dateTime: '2021-08',
    },
    {
      name: 'Secured $65m in funding',
      description:
        'Provident quia ut esse. Vero vel eos repudiandae aspernatur. Cumque minima impedit sapiente a architecto nihil.',
      date: 'Dec 2021',
      dateTime: '2021-12',
    },
    {
      name: 'Released beta',
      description:
        'Sunt perspiciatis incidunt. Non necessitatibus aliquid. Consequatur ut officiis earum eum quia facilis. Hic deleniti dolorem quia et.',
      date: 'Feb 2022',
      dateTime: '2022-02',
    },
    {
      name: 'Global launch of product',
      description:
        'Ut ipsa sint distinctio quod itaque nam qui. Possimus aut unde id architecto voluptatem hic aut pariatur velit.',
      date: 'Dec 2022',
      dateTime: '2022-12',
    },
  ]
export default function Page() {
  return (
<main className="isolate ">
{/* Hero section */}
<div className="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
  <div
    className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
    aria-hidden="true"
  />
  <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
    <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
      <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
        We’re a passionate group of people working from around the world to build the future of ecommerce.
      </h1>
      <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
        <p className="text-lg leading-8 text-gray-600">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
          amet fugiat veniam occaecat fugiat aliqua. Anim aute id magna aliqua ad ad non deserunt sunt. Qui
          irure qui lorem cupidatat commodo.
        </p>
      </div>
      <img 
        src="https://images.unsplash.com/photo-1567532900872-f4e906cbf06a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
        alt=""
        className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
      />
    </div>
  </div>
  <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
</div>

{/* Timeline section */}
<div className="mx-auto -mt-8 max-w-7xl px-6 lg:px-8">
  <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
    {timeline.map((item) => (
      <div key={item.name}>
        <time
          dateTime={item.dateTime}
          className="flex items-center text-sm font-semibold leading-6 text-indigo-600"
        >
          <svg viewBox="0 0 4 4" className="mr-4 h-1 w-1 flex-none" aria-hidden="true">
            <circle cx={2} cy={2} r={2} fill="currentColor" />
          </svg>
          {item.date}
          <div
            className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
            aria-hidden="true"
          />
        </time>
        <p className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{item.name}</p>
        <p className="mt-1 text-base leading-7 text-gray-600">{item.description}</p>
      </div>
    ))}
  </div>
</div>
<div className="mt-32 overflow-hidden sm:mt-40">
          <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
              <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our people</h2>
                <p className="mt-6 text-xl leading-8 text-gray-600">
                  Quasi est quaerat. Sit molestiae et. Provident ad dolorem occaecati eos iste. Soluta rerum quidem
                  minus ut molestiae velit error quod. Excepturi quidem expedita molestias quas.
                </p>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
                  amet fugiat veniam occaecat fugiat. Quasi aperiam sit non sit neque reprehenderit.
                </p>
              </div>
              <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                  <img
                    src="https://images.unsplash.com/photo-1670272502246-768d249768ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&q=80"
                    alt=""
                    className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>
                <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                  <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                    <img
                      src="https://images.unsplash.com/photo-1605656816944-971cd5c1407f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&h=604&q=80"
                      alt=""
                      className="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>
                  <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                    <img
                      src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&h=842&q=80"
                      alt=""
                      className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>
                  <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                    <img
                      src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&h=604&q=80"
                      alt=""
                      className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
</main>
  )
}
