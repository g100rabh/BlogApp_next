"use client";

import React, { FormEvent, useEffect, useState } from "react";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Import the styles
import { useRouter } from "next/navigation";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { City, Country } from "country-state-city";
import CityDropdown from "../location/CityDropdown";
// import "react-dropdown/style.css";

interface UserData {
  pincode: string;
  state: string;
  city: string;
  country: string;
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
  const [error, setError] = useState<string>();
  const router = useRouter();

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

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
    setCountry(userData.country || "");
    setCity(userData.city || "");
    setState(userData.state || "");
    setPincode(userData.pincode || "");
  }, [userData]);

  const handlePhoneChange = (value: string) => {
    if (value) {
      const parsedPhoneNumber = parsePhoneNumber(value);
      if (parsedPhoneNumber && parsedPhoneNumber.nationalNumber.length > 10) {
        setError("Phone number should not more than 10 digits");
        setTimeout(() => setError(""), 10000);
        return;
      }
    }
    setPhoneNumber(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const parsedPhoneNumber = phoneNumber && parsePhoneNumber(phoneNumber);
    if (parsedPhoneNumber && parsedPhoneNumber.nationalNumber.length !== 10) {
      console.log(parsedPhoneNumber.nationalNumber);
      setError("Phone number should not less than 10 digits");
      setTimeout(() => setError(""), 10000);
      return;
    }

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
      if (country) {
        updatedUserNewData = { ...updatedUserNewData, country: country };
      }
      if (state) {
        updatedUserNewData = { ...updatedUserNewData, state };
      }
      if (city) {
        updatedUserNewData = { ...updatedUserNewData, city };
      }
      if (pincode) {
        updatedUserNewData = { ...updatedUserNewData, pincode };
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
        const resData = await res.json();
        if (resData.error) {
          setError(resData.error);
          setTimeout(() => setError(""));
          return;
        }
        router.refresh();
      }
    } catch (error) {}
  };
  const handleCityChange = (c: string) => {
    setCity(c);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 w-11/12 rounded-md bg-gray-100 p-4 md:w-3/4 lg:w-2/3 xl:w-1/2"
    >
      <h1 className="mb-4 text-2xl font-semibold">Complete Your Profile</h1>
      <div className="p-4">
        <div className="mb-4 flex flex-col md:flex-row md:justify-between">
          <div className="mb-4 flex items-center gap-4 md:w-1/2 md:pr-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              <span className="text-red-600">*</span>Email:
            </label>
            <span>{userData.email}</span>
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
              defaultCountry="IN"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className="input-field w-full flex-1"
            />
            {error?.includes("10") && (
              <p className="text-sm text-red-500">*{error}</p>
            )}
          </div>

          <div className="mb-4 md:w-1/2 md:pl-2">
            <label>
              <span className="text-red-600">*</span>Country:
            </label>
            <CountryDropdown
              value={country}
              onChange={(val) => setCountry(val)}
            />
          </div>
        </div>
        <div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-600"
            >
              <span className="text-red-600">*</span>Location/Address:
            </label>
            {/* <LocationInput /> */}
            <input
              type="text"
              id="location"
              name="location"
              className="input-field"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label>
              {" "}
              <span className="text-red-600">*</span>State:
            </label>
            <RegionDropdown
              country={country}
              value={state}
              onChange={(val) => setState(val)}
            />
          </div>
          <div>
            <label>
              {" "}
              <span className="text-red-600">*</span>City:
            </label>
            <CityDropdown
              country={country}
              state={state}
              val={city}
              onSelect={handleCityChange}
            />
          </div>
          <div>
            <label>
              {" "}
              <span className="text-red-600">*</span>Pin code:
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              className="input-field"
              value={pincode}
              maxLength={6}
              onChange={(e) => setPincode(e.target.value)}
            />
            {error?.includes("Pincode") && (
              <p className="text-sm text-red-500">*{error}</p>
            )}
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
