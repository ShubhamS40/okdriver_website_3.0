// src/components/Stats.tsx
import React from "react";

const Stats = () => {
  return (
    <section className="w-full bg-black text-white section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold mb-2">100+</h3>
            <p className="text-gray-300">Registered Drivers</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-2">10+</h3>
            <p className="text-gray-300">Subscription Plans</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-2">24/7</h3>
            <p className="text-gray-300">Support</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-2">98%</h3>
            <p className="text-gray-300">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
