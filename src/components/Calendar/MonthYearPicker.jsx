/**
 * MonthYearPicker.js
 * Description: A React component for selecting a range of months for rentals or bookings.
 * Author: Donald Jans Uy
 * Date: 2024-10-20
 */

//imports
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


// declaring the states
const MonthRangePicker = ({ onSelect, triggerText = "Select Date Range" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectingStart, setSelectingStart] = useState(true);
  

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  //change of the displayed year
  const handleYearChange = (increment) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(prevDate.getFullYear() + increment);
      return newDate;
    });
  };

  // calculating number of days in between start and end dates
  const calculateDaysBetween = (start, end) => {
    if (!start || !end) return 0;
    const date1 = new Date(start.year, start.month - 1);
    const date2 = new Date(end.year, end.month - 1);
    
    // Get the last day of each month
    date2.setMonth(date2.getMonth() + 1, 0);
    
    const diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  //# of month calculation
  const calculateMonthsBetween = (start, end) => {
    if (!start || !end) return 0;
    return (end.year - start.year) * 12 + (end.month - start.month);
  };

  //logic for selecting the month
  const handleMonthSelect = (monthIndex) => {
    const selectedDate = {
      month: monthIndex + 1,
      year: currentDate.getFullYear(),
      formatted: `${months[monthIndex]} ${currentDate.getFullYear()}`
    };

    if (selectingStart) {
      setStartDate(selectedDate);
      setSelectingStart(false);
    } else {
      const newEndDate = selectedDate;
      // Ensure end date is after start date
      if (startDate && (startDate.year > newEndDate.year || 
          (startDate.year === newEndDate.year && startDate.month > newEndDate.month))) {
        setStartDate(newEndDate);
        setEndDate(startDate);
      } else {
        setEndDate(newEndDate);
      }
    }
  };

  //check logic for making sure 3 months difference
  const isValidDateRange = () => {
    if (!startDate || !endDate) return false;
    const monthsDiff = calculateMonthsBetween(startDate, endDate);
    return monthsDiff >= 2; //
  };

  //Logic when confirming the selected date
  const handleConfirm = () => {
    if (!isValidDateRange()) {
      alert("Minimum rental duration is 3 months. Please select a longer duration.");
      return;
    }
    const monthsDiff = calculateMonthsBetween(startDate, endDate);
    onSelect({
      startDate,
      endDate,
      monthsDiff
    });
    setIsOpen(false);
    setSelectingStart(true);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-green-600 hover:text-green-700 font-medium py-2 px-4 rounded-lg transition"
      >
        {triggerText}
      </button>
    );
  }

  //check if a month is in the selected date range
  const isDateInRange = (monthIndex) => {
    if (!startDate || !endDate) return false;
    
    const currentYearMonth = {
      year: currentDate.getFullYear(),
      month: monthIndex + 1
    };
    
    const startYearMonth = {
      year: startDate.year,
      month: startDate.month
    };
    
    const endYearMonth = {
      year: endDate.year,
      month: endDate.month
    };
    
    const isAfterStart = 
      (currentYearMonth.year > startYearMonth.year) || 
      (currentYearMonth.year === startYearMonth.year && currentYearMonth.month >= startYearMonth.month);
      
    const isBeforeEnd = 
      (currentYearMonth.year < endYearMonth.year) || 
      (currentYearMonth.year === endYearMonth.year && currentYearMonth.month <= endYearMonth.month);
      
    return isAfterStart && isBeforeEnd;
  };

  //show the difference between the seleected dates in months and days
  const getDaysBetweenText = () => {
    if (startDate && endDate) {
      const monthsDiff = calculateMonthsBetween(startDate, endDate);
      const days = calculateDaysBetween(startDate, endDate);
      const isValid = monthsDiff >= 2;
      return (
        <div className={`mt-4 text-center ${isValid ? 'text-gray-600' : 'text-red-600'}`}>
          {`${monthsDiff + 1} months (${days} days)`}
          {!isValid && (
            <div className="text-sm mt-1">
              Minimum rental duration is 3 months
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-green-600 hover:text-green-700 font-medium py-2 px-4 rounded-lg transition"
      >
        {startDate && endDate 
          ? `${startDate.formatted} - ${endDate.formatted}`
          : triggerText}
      </button>
    );
  }

  //the UI of the modal
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-center w-full">
            {selectingStart ? "Select Start Month" : "Select End Month"}
          </h2>
          <button
            onClick={() => {
              setIsOpen(false);
              setSelectingStart(true);
              setStartDate(null);
              setEndDate(null);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        
        <div className="p-4">
          {startDate && !selectingStart && (
            <div className="mb-4 text-center text-green-600">
              Start: {startDate.formatted}
            </div>
          )}
          
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => handleYearChange(-1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-xl font-semibold">
              {currentDate.getFullYear()}
            </span>
            <button
              onClick={() => handleYearChange(1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {months.map((month, index) => {
              const isStart = startDate && 
                startDate.month === index + 1 && 
                startDate.year === currentDate.getFullYear();
              
              const isEnd = endDate && 
                endDate.month === index + 1 && 
                endDate.year === currentDate.getFullYear();
              
              const isInRange = isDateInRange(index);

              return (
                <button
                  key={month}
                  onClick={() => handleMonthSelect(index)}
                  className={`h-12 border rounded-lg transition-colors
                    ${isStart || isEnd
                      ? 'bg-green-600 text-white border-green-600'
                      : isInRange
                        ? 'bg-green-100 border-green-200'
                        : 'hover:bg-green-50 hover:text-green-600 hover:border-green-600'}`}
                >
                  {month.slice(0, 3)}
                </button>
              );
            })}
          </div>

          {getDaysBetweenText()}

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => {
                setIsOpen(false);
                setSelectingStart(true);
                setStartDate(null);
                setEndDate(null);
              }}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!startDate || !endDate || !isValidDateRange()}
              className={`px-4 py-2 rounded-lg transition
                ${startDate && endDate && isValidDateRange()
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthRangePicker;