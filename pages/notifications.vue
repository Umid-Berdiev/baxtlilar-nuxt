<template>
  <div class="template_main_right" id="content">
    <h1>{{ $t("notifications") }}</h1>

    <a
      v-for="(item, index) in notifications"
      :key="index"
      href="#"
      class="message_item"
      :class="{ unread: item.read_at === null }"
      @click="handleClick(item.id)"
    >
      <div class="mess_user">
        <p v-text="item.data.message" />
      </div>
      <div class="date_message">
        <span v-text="formatDate(item.created_at)" />
      </div>
    </a>

    <!-- Modal -->
    <div
      class="modal fade"
      id="notificationModal"
      tabindex="-1"
      aria-labelledby="notificationModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="notificationModalLabel"></h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div class="modal-body">
            {{ notification.data && notification.data.message }}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              v-text="$t('Close')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { Modal } from "bootstrap";

export default {
  data() {
    return {
      notifications: [],
      notification: {},
    };
  },
  async asyncData({ $axios }) {
    const res = await $axios.$get("api/notifications");
    const notifications = res.filter(
      (item) => item.type != "App\\Notifications\\MessageCreatedNotification"
    );

    return { notifications };
  },
  methods: {
    async handleClick(id) {
      this.notification = await this.notifications.find(
        (item) => item.id == id
      );

      var myModal = new Modal(document.getElementById("notificationModal"));
      myModal.show();

      if (this.notification.read_at == null) {
        await this.$axios({
          url: "api/mark-as-read",
          method: "PUT",
          data: { id },
        });

        await this.fetchNotifications();
      }
    },

    async fetchNotifications() {
      const res = await this.$axios.$get("api/notifications");
      this.notifications = res.filter(
        (item) => item.type != "App\\Notifications\\MessageCreatedNotification"
      );
    },

    formatDate(date) {
      return moment(date).calendar();
    },
  },
};
</script>

<style scoped>
.unread {
  background-color: #337bae;
  color: white;
}
</style>
