export default function ({ $axios, redirect, $auth }) {
  $axios.onError(async (error) => {
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {
      console.log("in axios plugin");
      await $auth.logout();
      // redirect("/auth/register");
    }
  });
}
