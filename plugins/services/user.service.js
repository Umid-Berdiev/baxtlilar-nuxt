class UserService {
  async getCurrentUserInfo() {
    try {
      const res = await this.$axios.get("/api/user");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserService();
