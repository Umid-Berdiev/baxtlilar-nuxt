export default function ({ $axios, redirect, $auth }) {
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {
      if ($auth.loggedIn) {
        $auth.logout();
      }
      redirect("/");
    }
  });
}
