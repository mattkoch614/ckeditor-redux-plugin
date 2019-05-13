import React from "react";
import ReactDOM from "react-dom";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { toWidget } from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";
import CustomButtonComponent from "./CustomButtonComponent";

export default class CustomButtonEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    console.log("CustomButtonEditing#init() got called");

    this._defineSchema();

    this._defineConverters();
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register("custombutton", {
      // Allow wherever text is allowed:
      allowWhere: "$text",

      // The placeholder will acts as an inline node:
      isInline: true,

      // The inline-widget is self-contained so cannot be split by the caret and can be selected:
      isObject: true,

      // The placeholder can have many types, like date, name, surname, etc:
      allowAttributes: ["name"]
    });
  }

  _defineConverters() {
    // ADDED
    const conversion = this.editor.conversion;

    conversion.for("upcast").elementToElement({
      view: {
        name: "span",
        classes: ["custombutton"]
      },
      model: (viewElement, modelWriter) => {
        // Extract the "name" from "{name}".
        const name = viewElement.getChild(0).data.slice(1, -1);

        return modelWriter.createElement("custombutton", { name });
      }
    });

    conversion.for("editingDowncast").elementToElement({
      model: "custombutton",
      view: (modelItem, viewWriter) => {
        const widgetElement = createPlaceholderView(modelItem, viewWriter);

        // Enable widget handling on placeholder element inside editing view.
        return toWidget(widgetElement, viewWriter);
      }
    });

    conversion.for("dataDowncast").elementToElement({
      model: "custombutton",
      view: createPlaceholderView
    });

    // Helper method for both downcast converters.
    function createPlaceholderView(modelItem, viewWriter) {
      const name = modelItem.getAttribute("name");

      console.log(name);
      const section = viewWriter.createContainerElement("span", {
        class: "custombutton outline-none",
        "data-name": name
      });

      const reactWrapper = viewWriter.createUIElement(
        "span",
        {
          class: ""
        },
        function(domDocument) {
          const domElement = this.toDomElement(domDocument);

          ReactDOM.render(<CustomButtonComponent name={name} />, domElement);

          return domElement;
        }
      );

      viewWriter.insert(viewWriter.createPositionAt(section, 0), reactWrapper);

      return section;
    }
  }
}
