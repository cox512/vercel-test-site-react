"use client";

import { useState } from "react";
import { boot } from "@intercom/messenger-js-sdk";

export default function UserDataForm() {
  const [formData, setFormData] = useState({
    user_id: "",
    name: "",
    email: "",
    company_id: "",
    company: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create boot data object, only including non-empty values
    const bootData = {
      app_id: process.env.NEXT_PUBLIC_INTERCOM_APP_ID,
    };

    // Only add user_id if it's not empty
    if (formData.user_id) {
      bootData.user_id = formData.user_id;
    }

    // Only add name if it's not empty
    if (formData.name) {
      bootData.name = formData.name;
    }

    // Only add email if it's not empty
    if (formData.email) {
      bootData.email = formData.email;
    }

    // Only add company if either id or name is present
    if (formData.company_id || formData.company) {
      bootData.company = {
        id: formData.company_id || undefined,
        name: formData.company || undefined,
      };
      // Remove undefined values from company object
      Object.keys(bootData.company).forEach(
        (key) =>
          bootData.company[key] === undefined && delete bootData.company[key]
      );
    }

    // Boot the user in Intercom using the official SDK
    try {
      boot(bootData);
      console.log("Intercom booted with data:", bootData);
    } catch (error) {
      console.error("Error booting Intercom:", error);
    }
  };

  const clearForm = () => {
    setFormData({
      user_id: "",
      name: "",
      email: "",
      company_id: "",
      company: "",
    });
  };

  return (
    <div className="form-container">
      <h3>User Authentication</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="user_id">User ID:</label>
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company_id">Company ID:</label>
          <input
            type="text"
            id="company_id"
            name="company_id"
            value={formData.company_id}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company Name:</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button type="submit" className="submit-btn">
            Boot User
          </button>
          <button type="button" className="clear-btn" onClick={clearForm}>
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}
