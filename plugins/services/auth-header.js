export default function authHeader() {
  let accessToken = JSON.parse(localStorage.getItem("accessToken"));
  // let user = JSON.parse(localStorage.getItem("user"));

  // if (user && accessToken) {
  if (accessToken) {
    return { Authorization: "Bearer " + accessToken };
  } else {
    return {};
  }
}
