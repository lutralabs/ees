import React from 'react';

const FEATURES = [
  {
    title: 'Recognition',
    description:
      'Endorse the best people you know, help them get grow reputation and get recognized as their first supporter!',
  },
  {
    title: 'Cross-platform Reputation',
    description:
      'Build a single reputation for all your web3 accounts, and use it across multiple platforms!',
  },
  {
    title: 'Social Graph',
    description:
      'Endorsements build a social graph to help demistify connections and gain valuable insight in web3 space!',
  },
];

export const Features = () => {
  return (
    <div className="mt-32 ">
      <div className="flex text-3xl text-center font-semibold justify-center">
        Why Endorsements Matter?
      </div>
      <div className="mt-12 flex gap-x-16 justify-center md:items-top max-md:flex-col gap-y-8 max-md:items-center">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="w-[360px] px-8 py-4 rounded-lg bg-primary-50 shadow-md"
          >
            <h2 className="text-2xl font-medium tracking-tight text-center text-primary">
              {feature.title}
            </h2>
            <div className="text-lg mt-4 font-medium tracking-tight text-center text-gray-700">
              {feature.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
