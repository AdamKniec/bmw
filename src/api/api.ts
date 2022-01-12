const getStackData = () => {
  return fetch(
    "https://api.stackexchange.com/2.3/users/12259643?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=reputation&filter=default"
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export default getStackData;
