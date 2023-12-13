"use client";

import React, { FormEvent, useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Import the styles

interface UserData {
  email?: string;
  mobile_number?: string;
  first_name?: string;
  last_name?: string;
  address?: string;
}

const ProfileCompleteForm: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({});
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [fName, setFName] = useState<string>("");
  const [lName, setLName] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const getUserData = async () => {
    try {
      const res = await fetch("/api/user/", {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setUserData({ ...data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    setPhoneNumber(userData.mobile_number || "");
    setFName(userData.first_name || "");
    setLName(userData.last_name || "");
    setAddress(userData.address || "");
  }, [userData]);

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("submit");

    const setValues = async () => {
      let updatedUserNewData = {};

      if (phoneNumber) {
        updatedUserNewData = {
          ...updatedUserNewData,
          mobile_number: phoneNumber,
        };
      }
      if (fName) {
        updatedUserNewData = { ...updatedUserNewData, first_name: fName };
      }
      if (lName) {
        updatedUserNewData = { ...updatedUserNewData, last_name: lName };
      }
      if (address) {
        updatedUserNewData = { ...updatedUserNewData, address };
      }
      return updatedUserNewData;
    };

    const data = await setValues();

    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify({ ...data }),
      });

      if (res.ok) {
      }
    } catch (error) {}
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 w-11/12 rounded-md bg-gray-100 p-4 md:w-3/4 lg:w-2/3 xl:w-1/2"
    >
      <h1 className="mb-4 text-2xl font-semibold">Complete Your Profile</h1>
      <div className="p-4">
        <div className="mb-4 flex flex-col md:flex-row md:justify-between">
          <div className="mb-4 md:w-1/2 md:pr-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              <span className="text-red-600">*</span>Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input-field"
              value={userData.email}
              readOnly
            />
          </div>
        </div>

        <div className="mb-4 flex flex-col md:flex-row md:justify-between">
          <div className="mb-4 md:w-1/2 md:pr-2">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-600"
            >
              <span className="text-red-600">*</span>First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="input-field"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
            />
          </div>

          <div className="mb-4 md:w-1/2 md:pl-2">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-600"
            >
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="input-field"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4 flex flex-col md:flex-row md:justify-between">
          <div className="mb-4 md:w-1/2 md:pr-2">
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-600"
            >
              <span className="text-red-600">*</span>Mobile Number:
            </label>
            <PhoneInput
              international
              defaultCountry="US"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className="input-field w-full flex-1"
            />
          </div>

          <div className="mb-4 md:w-1/2 md:pl-2">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-600"
            >
              Location/Address:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="input-field"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="profilePic"
            className="block text-sm font-medium text-gray-600"
          >
            Profile Picture:
          </label>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            className="input-field"
          />
        </div>

        <button
          type="submit"
          className="btn-primary mt-4 rounded-sm bg-blue-800 px-4 py-2 font-bold text-white"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ProfileCompleteForm;
