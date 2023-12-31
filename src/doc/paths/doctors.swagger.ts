export const createDoctor = {
  post: {
    description: "Cria um médico",
    summary: "Criação de um médico",
    tags: ["Médicos"],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              email: {
                type: "string",
              },
              password: {
                type: "string",
              },
            },
          },
          example: {
            name: "Doctor John doe",
            email: "doctorjhondoe@example.com",
            password: "123456",
          },
        },
      },
    },
    responses: {
      "201": {
        content: {
          "application/json": {
            example: {
              id: "uuid",
              name: "Doctor John doe",
              email: "doctorjhondoe@example.com",
              password: "hashed-password",
              active: true,
              created_at: "2023-07-02T02:06:14.860Z",
              updated_at: "2023-07-02T02:06:14.860Z",
            },
          },
        },
      },
      "400": {
        content: {
          "application/json": {
            example: {
              message: "Email address already used.",
            },
          },
        },
      },
    },
  },
};
