import ru from "./locales/ru.json";
import uz from "./locales/uz.json";
import ru_messages from "../vee-validate/ru.json";
import uz_messages from "../vee-validate/uz.json";

export default {
  fallbackLocale: "uz",
  messages: {
    ru: {
      ...ru,
      fields: {
        username: "Имя пользователя",
        phone: "Телефон номер",
        password: "Пароль",
      },
      validation: ru_messages.messages,
    },
    uz: {
      ...uz,
      fields: {
        username: "Foydalanuvchi ismi",
        phone: "Telefon raqami",
        password: "Parol",
      },
      validation: uz_messages.messages,
    },
  },
};
