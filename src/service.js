export async function getData() {
  return fetch("https://covid-193.p.rapidapi.com/statistics", {
    method: "GET",
    headers: {
      "x-rapidapi-key": "99175d6217msh4377edfae5be1d8p18965fjsn0855611f2508",
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.response;
    });
}
export async function getWorld() {
  return fetch("https://covid-193.p.rapidapi.com/statistics?country=all", {
    method: "GET",
    headers: {
      "x-rapidapi-key": "99175d6217msh4377edfae5be1d8p18965fjsn0855611f2508",
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.response;
    });
}
