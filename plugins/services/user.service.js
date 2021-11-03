class UserService {
  async getCurrentUserInfo() {
    try {
      const res = await this.$axios.get('user')
      return res.data
    } catch (error) {
      console.log(error)
    }
  }
}

export default new UserService()
