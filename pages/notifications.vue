<template>
  <div class="template_main_right" id="content">
    <h1>{{ $t("notifications") }}</h1>

    <a
      v-for="(item, index) in notifications"
      :key="index"
      href="javascript:;"
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
    <b-modal id="notificationModal">
      <template #modal-header="{ close }">
        <h5 class="modal-title" id="notificationModalLabel"></h5>
        <b-button size="sm" variant="outline-danger" @click="close()">X</b-button>
      </template>
      <template #default>{{ notification.data && notification.data.message }}</template>
      <template #modal-footer="{ cancel }">
        <b-button
          size="sm"
          variant="danger"
          @click="cancel()"
          v-text="$t('Close')"
          class="btn btn-secondary"
        />
      </template>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";

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

      this.$bvModal.show('notificationModal');

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
