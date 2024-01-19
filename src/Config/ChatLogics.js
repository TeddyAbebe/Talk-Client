export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getSender = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id
    ? capitalizeFirstLetter(users[1].name)
    : users[0].name;
};

export const getSenderProfile = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0].name;
};
