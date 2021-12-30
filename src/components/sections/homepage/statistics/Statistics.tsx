import React from "react";

const Statistics = () => {
  return (
    <section className="statistics">
      <h2>
        blog w <span className="text-red">liczbach</span>
      </h2>
      <div className="stats-inner-wrapper">
        <div className="numberBox">
          <p className="number-value">97</p>
          <p className="service">ohMyDev</p>
        </div>
        <div className="numberBox">
          <p className="number-value">1320</p>
          <p className="service">Stack Overflow</p>
        </div>
        <div className="numberBox">
          <p className="number-value">366</p>
          <p className="service">Stack Overflow - code review</p>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
