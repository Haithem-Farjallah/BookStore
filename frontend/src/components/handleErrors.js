export const handleErrors = (formData, position) => {
  const newErrors = {};
  if (position === "register") {
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.familyname) newErrors.familyname = "familyname is required";
    if (formData.confirmpassword !== formData.password)
      newErrors.confirmpassword = "Password does not match";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) newErrors.email = "unvalid email";
  if (!formData.email) newErrors.email = "Email is required";
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(formData.password) || formData.password.length < 6)
    newErrors.password =
      "Password must contain letters,numbers and symbol and has min 6 caracters ";
  if (!formData.password) newErrors.password = "Password is required ";

  return newErrors;
};
