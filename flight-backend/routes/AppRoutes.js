class AppRoutes {
  flight = (flightController) => {
    app.post("/flight", flightController.create); 
    app.get("/flight", flightController.readAll);
    app.get("/flight/:id", flightController.readById);
    app.put("/flight/:id", flightController.update);
    app.delete("/flight/:id", flightController.remove);
  }
  root = (appController) => {
    app.get("/", appController.serverRootAction);
  }
}
module.exports = AppRoutes;
