"use client";

import React, { useState } from "react";
import { GoArrowRight, GoCheck } from "react-icons/go";


const Stepper = ({currentStep}:{currentStep:number}) => {
//   const [currentStep, setCurrentStep] = useState(1);

//   const handleNext = () => {
//     if (currentStep < 3) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       console.log("Data saved:");
//     }
//   };

  return (
    <div className=" px-5 border-r-2 mr-10 border-b-yellow-950 ">
      <ol className="w-72 space-y-4">
        <li>
          <div
            className={`w-full p-4 ${
              currentStep === 1
                ? "rounded-lg border border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-800 dark:bg-gray-800 dark:text-blue-400"
                : currentStep > 1 ? 'text-green-700 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:border-green-800 dark:text-green-400' : ''
            }`}
            role="alert"
          >
            <div className="flex items-center justify-between">
              <span className="sr-only"> Show Details</span>
              <h3 className="font-medium">1. Show Details</h3>
              {currentStep === 1 ? (
                <GoArrowRight className="text-xl font-extrabold	"/>
              ) : currentStep >= 1 ? (
                <GoCheck className="text-xl font-extrabold	"/>

              ) : null}
            </div>
          </div>
        </li>
        <li>
          <div
            className={`w-full p-4 ${
               
              currentStep === 2
                ? "rounded-lg border border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-800 dark:bg-gray-800 dark:text-blue-400"
                :  currentStep > 2 ? 'text-green-700 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:border-green-800 dark:text-green-400' : ''
            }`}
            role="alert"
          >
            <div className="flex items-center justify-between">
              <span className="sr-only">Ticket Details</span>
              <h3 className="font-medium">2. Ticket Details</h3>
              {currentStep === 2 ? (
                <GoArrowRight className="text-xl font-extrabold"/>
              ) : currentStep >= 2 ? (
                <GoCheck className="text-xl font-extrabold	"/>

              ) : null}
            </div>
          </div>
        </li>
        <li>
          <div
            className={`w-full p-4 ${
              currentStep === 3
                ? "rounded-lg border border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-800 dark:bg-gray-800 dark:text-blue-400"
                : ""
            }`}
            role="alert"
          >
            <div className="flex items-center justify-between">
              <span className="sr-only">Review</span>
              <h3 className="font-medium">3. Review</h3>
              {currentStep === 3 ? (
                      <GoArrowRight className="text-2xl font-extrabold	" />

              ) : currentStep >= 3 ? (
                <GoCheck className="text-2xl font-extrabold	" />

              ) : null}
            </div>
          </div>
        </li>
      </ol>

      {/* <div className="mt-4">
        <button
          onClick={handleNext}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          {currentStep < 3 ? "Next" : "Save"}
        </button>
      </div> */}
    </div>
  );
};

export default Stepper;
