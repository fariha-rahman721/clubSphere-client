import React, { useState } from "react";
import toast from "react-hot-toast";

const MembershipCard = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    userEmail: "",
    clubId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    


    const membershipData = {
      userEmail: formData.userEmail,
      clubId: formData.clubId,
      status: "pendingPayment", 
      paymentId: null, 
      joinedAt: new Date(),
      expiresAt: null, 
    };

    if (onSubmit) onSubmit(membershipData);

    toast.success("Membership request submitted!");
  };

  return (
    <div className="w-5/12 mx-auto mt-10 mb-10">
      <div className="bg-[#FFAA6E] text-white p-6 rounded-t-lg">
        <h1 className="text-center text-3xl font-extrabold">
          Join Club Membership
        </h1>
      </div>

      <div className="card bg-base-100 w-full shadow-2xl rounded-b-lg">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset w-full space-y-4">

              <div>
                <label className="label">Your Email</label>
                <input
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleChange}
                  className="input w-full"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="label">Club Name</label>
                <input
                  type="text"
                  name="clubId"
                  value={formData.clubId}
                  onChange={handleChange}
                  className="input w-full"
                  placeholder="Enter Club Name"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn bg-[#FFAA6E] hover:bg-orange-600 text-white w-full mt-4"
              >
                Continue to Membership
              </button>

            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;
