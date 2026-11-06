import React, { useState } from 'react';

const Booking = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your free quote request has been received. We will contact you shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Request a Free Quote
        </h1>
        <p className="text-center text-gray-600 mb-8">
          First-time clients only. Please give us as much detail as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Address *
            </label>
            <input
              type="text"
              name="address"
              required
              placeholder="Street, City, State, ZIP"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none"
            />
          </div>

          {/* Rooms + Bathrooms + Floors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Number of Rooms *
              </label>
              <input
                type="number"
                name="rooms"
                min="1"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Number of Bathrooms *
              </label>
              <input
                type="number"
                name="bathrooms"
                min="1"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Number of Floors *
              </label>
              <input
                type="number"
                name="floors"
                min="1"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none"
              />
            </div>
          </div>

          {/* Pets */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Are there pets in the home? *
            </label>
            <select
              name="pets"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none"
            >
              <option value="">Select...</option>
              <option value="No">No</option>
              <option value="Yes - Dogs">Yes - Dogs</option>
              <option value="Yes - Cats">Yes - Cats</option>
              <option value="Yes - Dogs and Cats">Yes - Dogs and Cats</option>
              <option value="Yes - Other pets">Yes - Other pets</option>
            </select>
          </div>

          {/* Service Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Type of Cleaning Needed *
            </label>
            <select
              name="service"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none"
            >
              <option value="">Select...</option>
              <option value="Move-out Cleaning">Move-out Cleaning</option>
              <option value="Move-in Cleaning">Move-in Cleaning</option>
              <option value="One-time Deep Cleaning">One-time Deep Cleaning</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Extra Details */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Additional Details
            </label>
            <textarea
              name="details"
              rows="5"
              placeholder="Please tell us anything else that will help (condition of the home, special requests, preferred days, square footage, etc.)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-4 rounded-lg text-lg transition"
          >
            Request Free Quote
          </button>

          <p className="text-center text-sm text-gray-500">
            This form is only for first-time free quote requests.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Booking;
