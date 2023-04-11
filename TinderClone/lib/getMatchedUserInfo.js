const getMatchedUserInfo = (users, userLoggedIn) => {
  const newUsers = {...users};
  delete newUsers[userLoggedIn];

  // Object.entries(newUsers).flat() returns an array
  // with the first element being the id and
  // the second element being the user object itself
  const [id, user] = Object.entries(newUsers).flat();
  return {id, ...user};
};

export default getMatchedUserInfo;
