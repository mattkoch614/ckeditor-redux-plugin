import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

import CustomButtonEditing from "./CustomButtonEditing";

export default class CustomButton extends Plugin {
  static get requires() {
    return [CustomButtonEditing];
  }
}
