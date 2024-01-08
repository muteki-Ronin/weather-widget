import { startWidget } from "./modules/widgetService.js";

const initWidget = (app) => {
  const widget = startWidget();
  app.append(widget);
};

const app = document.querySelector("#widget-app");
initWidget(app);
