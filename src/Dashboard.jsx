import React, { useState } from 'react';
import AvailabilityFilter from './AvailabilityFilter';
import PartsStatistics from './PartsStatistics';
import ModelStatistics from './ModelStatistics';
import PriceRangeStatistics from './PriceRangeStatistics';
import ManufacturerStatistics from './ManufacterStatistics';

const Dashboard = () => {
  const [isAvailabilityFilterVisible, setAvailabilityFilterVisibility] = useState(false);
  const [isPartsStatisticsVisible, setPartsStatisticsVisibility] = useState(false);
  const [isModelStatisticsVisible, setModelStatisticsVisibility] = useState(false);
  const [isPriceRangeStatisticsVisible, setPriceRangeStatisticsVisibility] = useState(false);
  const [isManufacturerStatisticsVisible, setManufacturerStatisticsVisibility] = useState(false);

  return (
    <div>
        
      <button onClick={() => setAvailabilityFilterVisibility(!isAvailabilityFilterVisible)}>
        Toggle Availability Filter
      </button><br></br>
      {isAvailabilityFilterVisible && <AvailabilityFilter />}

      <button onClick={() => setPartsStatisticsVisibility(!isPartsStatisticsVisible)}>
        Toggle Parts Statistics
      </button><br></br>
      {isPartsStatisticsVisible && <PartsStatistics />}

      <button onClick={() => setModelStatisticsVisibility(!isModelStatisticsVisible)}>
        Toggle Model Statistics
      </button><br></br>
      {isModelStatisticsVisible && <ModelStatistics />}

      <button onClick={() => setPriceRangeStatisticsVisibility(!isPriceRangeStatisticsVisible)}>
        Toggle Price Range Statistics
      </button><br></br>
      {isPriceRangeStatisticsVisible && <PriceRangeStatistics />}

      <button onClick={() => setManufacturerStatisticsVisibility(!isManufacturerStatisticsVisible)}>
        Toggle Manufacturer Statistics
      </button>
      {isManufacturerStatisticsVisible && <ManufacturerStatistics />}
    </div>
  );
};

export default Dashboard;
