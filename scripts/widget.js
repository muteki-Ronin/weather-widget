import { cityServiceSearch } from "./modules/cityServiceSearch.js";
import { startWidget } from "./modules/widgetService.js";

const initWidget = async (app) => {
  const city = "Киев";
  const widget = await startWidget(city);
  app.append(widget);

  cityServiceSearch(widget);
};

const app = document.querySelector("#widget-app");
initWidget(app);
