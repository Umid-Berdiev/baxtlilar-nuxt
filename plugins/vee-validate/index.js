import { configure, extend } from "vee-validate";
import {
  required,
  length,
  email,
  min,
  max,
  regex,
} from "vee-validate/dist/rules";

export default function ({ app }) {
  configure({
    defaultMessage: (field, values) => {
      // override the field name.
      values._field_ = app.i18n.t(`fields.${field}`);
      return app.i18n.t(`validation.${values._rule_}`, values);
    },
  });
}

extend("required", required);

extend("email", email);

extend("length", length);

extend("min", min);

extend("max", max);

extend("regex", regex);
