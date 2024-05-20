import axios from "axios";

export const registerUser = async ({ name, email, password }) => {
  try {
    const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/auth/register`;

    const response = await axios.post(reqUrl, { name, email, password });

    let result;
    // if (response?.data?.isExistingUser) {
    //   result = response?.data?.isExistingUser;
    // }
    if (response?.data?.isRegistered) {
      result = response?.data?.isRegistered;
    }

    console.log(response);
    return result;
  } catch (error) {
    console.log(error);
    // alert("Something went wrong");
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;

    const response = await axios.post(reqUrl, { email, password });

    localStorage.setItem("quizzieToken", response?.data?.token);

    return response?.data?.name;
  } catch (error) {
    console.log(error);
    // alert("Something went wrong");
  }
};
