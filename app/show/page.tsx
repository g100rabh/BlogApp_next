"use client";

import Review from "@/components/showDetails/Review";
import ShowDetails, { showDetails } from "@/components/showDetails/showDetails";
import ShowTickets, { Category } from "@/components/showDetails/showTickets";
import Stepper from "@/components/showDetails/stepper";
import React, { useState } from "react";

const Route = () => {
  const [currentStep, setCurrentStep] = useState(3);
  const [formData, setFormData] = useState({
    showName: "",
    showType: "",
    showDateAndTime: "",
    noOfTickets: undefined,
  });
  const [showMode, setShowMode] = useState<string>("ONLINE");
  const [categories, setCategories] = useState("");
  
  const handleStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Data saved:");
    }
  };

  const handleShowDetailsSubmit = (data: showDetails) => {
    setFormData(data);
    handleStep();
  };

  const handleTicketsDetailsSubmit = async (data: {
    showMode: string;
    categories: Category[];
  }) => {

    handleStep();
    const response = await fetch("/api/showDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        showName: formData.showName,
        showType: formData.showType,
        showDateAndTime: formData.showDateAndTime,
        noOfTickets: formData.noOfTickets,
        showMode: data.showMode,
        categories: JSON.stringify(data.categories),
      }),
    });
  };

  

  return (
    <div className="flex w-full items-start justify-start">
      <div>
        <Stepper currentStep={currentStep} />
      </div>


      {currentStep === 1 ? (
        <div className="mx-auto">
          <ShowDetails onSubmit={handleShowDetailsSubmit} />
        </div>
      ) : currentStep === 2 ? (
        <div className="mx-auto">
          <ShowTickets onSubmit={handleTicketsDetailsSubmit} />
        </div>
      ) : (
        <div className="text-3xl font-extrabold">
          {" "}
          YOU Will SEE ALL DATA HERE SOON...
          <Review />
        </div>
      )}
    </div>
  );
};

export default Route;
