import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
    openapi: "3.0.0",
    info: {
      title: "API documentation for Practiie report",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
      schemas: {
        user: {
          type: "object",
          required: ["email", "name", "lastname", "password"],
          properties: {
            email: {
              type: "string",
            },
            name: {
                type: "string",
              },
            lastname: {
                type: "string",
              },
            password: {
                type: "string",
              },
          },
        },
      },
    },
  };

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ["./src/routes/*.ts"],
  };
  
  export default swaggerJSDoc(swaggerOptions);