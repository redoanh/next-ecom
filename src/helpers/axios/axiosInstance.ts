import axios from "axios";

const instance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers":
      "Content-Type, X-Amz-Date, Authorization, X-Api-KeyboardEvent, X-Amz-Security-Token",
  },
});

// for post
instance.defaults.headers.post["Content-Type"] = "application/json";
// receive type
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // you can write or call a function here to add auth header
    // example below
    // const accessToken = getFromLocalStorage(authKey);
    const accessToken =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaXRvbmNzZTE1QGdtYWlsLmNvbSIsImlhdCI6MTcwNTkwMDc3NiwiZXhwIjoxNzA2NzY0Nzc2fQ.Wdu6L5arYMB2IATgzxQk4bXiqTDXKTKlR6ooDpkGmvU";

    if (accessToken) {
      // set to header
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  // if any error while make request return error
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
    // return Promise.resolve(responseObject);
  },
  function (error) {
    return error;
    // return Promise.reject(responseObject);
  }
);

export { instance };
