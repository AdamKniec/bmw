import React from "react";

interface StatisticsProps {
  apiData: {
    stackRep: number;
  };
}

const Statistics = (props: StatisticsProps) => {
  const { apiData } = props;
  return (
    <section className="statistics">
      <h2>
        blog w <span className="text-red">liczbach</span>
      </h2>
      <div className="stats-inner-wrapper">
        <div className="numberBox">
          <p className="number-value">
            {apiData.stackRep !== 0 ? apiData.stackRep : "Wczytuję..."}
          </p>
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
