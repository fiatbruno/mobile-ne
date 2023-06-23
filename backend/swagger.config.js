module.exports = {
  info: {
    title: "EUCL System",
    description:
      "A system that helps EUCL clients to purchase electricity .\n\nMade with ❤️ by Fiat Bruno",
    version: "1.0.0",
  },
  host: "localhost:4000", // Replace with your API's host
  basePath: "/", // Replace with the base path of your API
  schemes: ["http", "https"], // Specify the protocols used by your API
  consumes: ["application/json"], // Specify the accepted request content types
  produces: ["application/json"], // Specify the supported response content types
  routes: ["./src/routes/*.js"], // Specify the path to your API routes
  outputFile: "./swagger.json", // Specify the output file path for the Swagger specification
};
