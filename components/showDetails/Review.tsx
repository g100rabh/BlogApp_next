
import React from "react";

const Review = () => {
  return (
    <form className="mx-auto mt-8 max-w-3xl  rounded-md border p-6 shadow-md">
      <div className=" flex ">
        <label
          htmlFor="showName"
          className="mb-2 mr-20 block rounded text-sm font-bold  text-gray-700"
        >
          Show Name
        </label>
        <label
          htmlFor="showType"
          className="mb-2 ml-28 block text-sm font-bold text-gray-700"
        >
          Show Type
        </label>
      </div>
      <div className="mb-4 flex">
        <input type="text" id="showName" className="input rounded  " />
        <input type="text" id="showType" className="input ml-6 rounded" />
      </div>

      <div className="flex ">
        <label
          htmlFor="showDateTime"
          className="mb-1 mr-10 block text-sm font-bold text-gray-700"
        >
          Show Date and Time
        </label>
        <label
          htmlFor="numberOfTickets"
          className="mb-2 ml-24 block text-sm font-bold text-gray-700"
        >
          Number of Tickets
        </label>
      </div>

      <div className="mb-4 flex">
        <input type="number" id="numberOfTickets" className="input rounded " />
        <input
          type="datetime-local"
          id="showDateTime"
          className="input ml-6 w-60 rounded"
        />
      </div>

      {/* <div className="mb-4">
        <label className="mb-2 block text-sm font-bold text-gray-700">
          Show Mode
        </label>
        <div>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="showMode"
              value="online"
              className="form-radio"
            />
            <span className="ml-2">Online</span>
          </label>
          <label className="ml-6 inline-flex items-center">
            <input
              type="radio"
              name="showMode"
              value="offline"
              className="form-radio "
            />
            <span className="ml-2">Offline</span>
          </label>
          <label className="ml-6 inline-flex items-center">
            <input
              type="radio"
              name="showMode"
              value="both"
              className="form-radio"
            />
            <span className="ml-2">Both</span>
          </label>
        </div>
      </div> */}

<div>
          <label className="mr-4 inline-flex items-center">
            <input
              type="radio"
              value="ONLINE"
            //   checked={showMode === "ONLINE"}
            //   onChange={handleShowModeChange}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2">Online</span>
          </label>
          <label className="mr-4 inline-flex items-center">
            <input
              type="radio"
              value="OFFLINE"
            //   checked={showMode === "OFFLINE"}
            //   onChange={handleShowModeChange}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2">Offline</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="BOTH"
            //   checked={showMode === "BOTH"}
            //   onChange={handleShowModeChange}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2">Both</span>
          </label>
        </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold text-gray-700">
          Categories
        </label>
        <div>
          <div className="mb-2 flex">
            <input
              type="text"
              placeholder="Name"
              className="input w-60 rounded "
            />
            <input
              type="number"
              placeholder="Quantity"
              className="input ml-4 w-56 rounded"
            />
            <input
              type="number"
              placeholder="Price"
              className="input ml-4 w-56 rounded"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="rounded bg-blue-500 px-2 py-2 font-bold text-white hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default Review;
