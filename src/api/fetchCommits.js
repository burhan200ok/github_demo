import { BASE_URL, repos, commits } from "../constants";

export function fetchCommits(user, repo) {
  return fetch(`${BASE_URL}/${repos}/${user}/${repo}/${commits}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((responseJSON) => {
      return responseJSON;
    })
    .catch((error) => {});
}
