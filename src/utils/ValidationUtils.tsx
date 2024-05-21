export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePasswordLength = (password: string) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  return regex.test(password);
};

export const validatePasswordEntry = (
  password: string,
  name: string,
  email: string
) => {
  if (!validatePasswordLength(password)) {
    return { msg: "Password length must be 8 to 20 characters", result: false };
  }
  if (name && password.toLowerCase().includes(name.toLowerCase())) {
    return { msg: "Must not contain user's name", result: false };
  }

  if (email && password.toLowerCase().includes(email.toLowerCase())) {
    return { msg: "Must not contain user's email id", result: false };
  }

  return { msg: "Passed Local Test!", result: true };
};

export const formatDate = (timestamp: any) => {
  "worklet";
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

export const convertUnixTimestamp = (timestamp: number) => {
  const dateObj = new Date(timestamp * 1000);

  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  let period = "AM";
  if (hours >= 12) {
    period = "PM";
    hours -= 12;
  }
  if (hours === 0) {
    hours = 12;
  }

  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;

  return formattedTime;
};

export const convertUnixTimeWorklet = (timestamp: number) => {
  "worklet";
  const dateObj = new Date(timestamp * 1000);

  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  let period = "AM";
  if (hours >= 12) {
    period = "PM";
    hours -= 12;
  }
  if (hours === 0) {
    hours = 12;
  }

  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;

  return formattedTime;
};
