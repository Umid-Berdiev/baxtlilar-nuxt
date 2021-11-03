class AuthService {
  async login(user) {
    const response = await this.$axios.post('auth/login', {
      username: user.username,
      password: user.password,
      lang: user.lang,
    })
    if (response.data.accessToken) {
      localStorage.setItem(
        'accessToken',
        JSON.stringify(response.data.accessToken)
      )
      // localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data
  }

  logout() {
    this.$axios.post('auth/logout', {})
    localStorage.removeItem('accessToken')
  }

  async register(user) {
    return await this.$axios.post('auth/register', {
      username: user.username,
      gender: user.gender,
      phone: user.phone,
      password: user.password,
      lang: user.lang,
    })
  }
}

export default new AuthService()
