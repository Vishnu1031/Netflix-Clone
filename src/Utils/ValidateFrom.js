import React from "react";

export const ValidateFrom = (email, password) => {
  const IsValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const IsValidPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!IsValidEmail) return "Email Id is incorrect";
  if (!IsValidPassword) return "Password is incorrect, Try another";

  return null;
};
