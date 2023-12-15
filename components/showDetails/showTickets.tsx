"use client";

import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import validator from "validator";

export type Category = {
  categoryName: string;
  quantity: string;
  price: string;
};

const ShowTickets = ({onSubmit}) => {
  const [showMode, setShowMode] = useState<string>("ONLINE");
  const [categories, setCategories] = useState<Category[]>([
    { categoryName: "", quantity: "", price: "" },
  ]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showModeError, setShowModeError] = useState<string>("");

  const handleShowModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowMode(e.target.value);
    validateShowMode();
  };

  const handleCategoryChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const sanitizedValue =
    field === 'quantity' || field === 'price'
      ? value.replace(/[^0-9.]/g, '')
      : value;

  const updatedCategories = [...categories];
  updatedCategories[index][field] = sanitizedValue;
  setCategories(updatedCategories);
  validateCategory(index, field, value);

  };

  const validateCategory = (index: number, field: string, value: string) => {
    const newErrors = { ...errors };
    if (!validator.trim(value)) {
      newErrors[`${index}_${field}`] = `${field} is required`;
    } else {
      delete newErrors[`${index}_${field}`];
    }
    setErrors(newErrors);
  };

  const validateShowMode = () => {
    if (!showMode) {
      setShowModeError("Show Mode is required");
    } else {
      setShowModeError("");
    }
  };

  const handleAddCategory = () => {
    setCategories([
      ...categories,
      { categoryName: "", quantity: "", price: "" },
    ]);
    setErrors({
      ...errors,
      [`${categories.length}_categoryName`]: "",
      [`${categories.length}_quantity`]: "",
      [`${categories.length}_price`]: "",
    });
  };

  const handleRemoveCategory = (index: number) => {
    if (categories.length > 1) {
      const updatedCategories = [...categories];
      updatedCategories.splice(index, 1);
      setCategories(updatedCategories);
      const newErrors = { ...errors };
      delete newErrors[`${index}_categoryName`];
      delete newErrors[`${index}_quantity`];
      delete newErrors[`${index}_price`];
      setErrors(newErrors);
    }
  };

  const validateAllFields = () => {
    const newErrors: { [key: string]: string } = {};

    categories.forEach((category, index) => {
      if (!validator.trim(category.categoryName)) {
        newErrors[`${index}_categoryName`] = "Category Name is required";
      }
      if (!validator.trim(category.quantity)) {
        newErrors[`${index}_quantity`] = "Quantity is required";
      }
      if (!validator.trim(category.price)) {
        newErrors[`${index}_price`] = "Price is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    validateShowMode();
    const isValid = validateAllFields() && !showModeError;

    if (isValid) {
      onSubmit({ showMode, categories });
    } else {
      console.log("Form contains errors. Please fix them before submitting.");
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-md rounded bg-white p-6 shadow-lg">
      <div className="mb-6">
        <label className="mb-2 block font-bold text-gray-700">Show Mode:</label>

        <div>
          <label className="mr-4 inline-flex items-center">
            <input
              type="radio"
              value="ONLINE"
            checked={showMode === "ONLINE"}
              onChange={handleShowModeChange}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2">Online</span>
          </label>
          <label className="mr-4 inline-flex items-center">
            <input
              type="radio"
              value="OFFLINE"
              checked={showMode === "OFFLINE"}
              onChange={handleShowModeChange}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2">Offline</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="BOTH"
              checked={showMode === "BOTH"}
              onChange={handleShowModeChange}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2">Both</span>
          </label>
        </div>
        <div className="mt-1 text-sm font-semibold text-red-600">
          {showModeError}
        </div>
      </div>
      <div>
        <label className="mb-2 block font-bold text-gray-700">
          Ticket Categories:
        </label>
        {categories.map((category, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center space-x-4">
              <div>
                <input
                  type="text"
                  placeholder="Category Name"
                  value={category.categoryName}
                  onChange={(e) =>
                    handleCategoryChange(index, "categoryName", e.target.value)
                  }
                  className="w-36 rounded border px-3 py-2 transition duration-300 focus:border-blue-500 focus:outline-none"
                />
                <div className="mt-1 text-sm font-semibold text-red-600">
                  {errors[`${index}_categoryName`]}
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Quantity"
                  value={category.quantity}
                  onChange={(e) =>
                    handleCategoryChange(index, "quantity", e.target.value)
                  }
                  className="w-24 rounded border px-3 py-2 transition duration-300 focus:border-blue-500 focus:outline-none"
                />
                <div className="mt-1 text-sm font-semibold text-red-600 ">
                  {errors[`${index}_quantity`]}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Price"
                  value={category.price}
                  onChange={(e) =>
                    handleCategoryChange(index, "price", e.target.value)
                  }
                  className="w-24 rounded border px-3 py-2 transition duration-300 focus:border-blue-500 focus:outline-none"
                />
                <div className="mt-1 text-sm font-semibold text-red-600">
                  {errors[`${index}_price`]}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(index)}
                  className={`rounded-md border hover:border-red-700 hover:bg-red-200 ${
                    categories.length === 1
                      ? "cursor-not-allowed"
                      : "border-red-500"
                  } p-1 text-red-500`}
                  disabled={categories.length === 1}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddCategory}
          className="rounded bg-green-500 px-4 py-2 text-white"
        >
          Add More Category
        </button>
      </div>
      <div className="mt-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded bg-blue-500 ml-20 px-10 py-2 text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ShowTickets;
