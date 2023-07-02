export const createPatient = {
  post: {
    description:
      "Create a patient. Obs: GenderId 1 = Feminine, GenderId 2 = Masculine",
    tags: ["Patients"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              birthDate: {
                type: "string",
              },
              email: {
                type: "string",
              },
              name: {
                type: "string",
              },
              phone: {
                type: "string",
              },
              genderId: {
                type: "number",
              },
              height: {
                type: "number",
              },
              weight: {
                type: "number",
              },
            },
          },
          example: {
            birthDate: "09/01/2003",
            email: "patient-example@gmail.com",
            genderId: 1,
            height: 170,
            name: "Patient Example",
            phone: "48999999999",
            weight: 68.8,
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
              name: "Patient Example",
              phone: "48999999999",
              email: "patient-example@gmail.com",
              height: 170,
              weight: 68.8,
              birth_date: "2003-09-01T00:00:00.000Z",
              gender_id: 1,
              doctor_id: "uuid",
              active: true,
              created_at: "2023-07-02T02:07:00.373Z",
              updated_at: "2023-07-02T02:07:00.373Z",
            },
          },
        },
      },
      "400": {
        content: {
          "application/json": {
            example: {
              message: "Doctor not found!",
            },
          },
        },
      },
      "401": {
        content: {
          "application/json": {
            example: [
              {
                error: true,
                code: "token.expired",
                message: "Token invalid.",
              },
              {
                error: true,
                code: "token.invalid",
                message: "Token not present.",
              },
            ],
          },
        },
      },
    },
  },
};

export const getPatient = {
  get: {
    description: "Get patient by doctor.",
    tags: ["Patients"],
    parameters: [
      {
        schema: {
          type: "string",
        },
        in: "path",
        name: "patientId",
        required: true,
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      "200": {
        content: {
          "application/json": {
            example: {
              id: "uuid",
              name: "jhon doe",
              phone: "4899999999",
              email: "jhondoe@gmail.com",
              height: 170,
              weight: "68.8",
              birth_date: "2003-09-01",
              gender_id: 1,
              doctor_id: "doctoruuid",
              created_at: "2023-07-02T00:21:07.266Z",
              updated_at: "2023-07-02T00:21:07.266Z",
              active: true,
            },
          },
        },
      },
      "400": {
        content: {
          "application/json": {
            example: [
              {
                message: "Doctor not found!",
              },
              {
                message: "Patient not found!",
              },
            ],
          },
        },
      },
      "401": {
        content: {
          "application/json": {
            example: [
              {
                error: true,
                code: "token.expired",
                message: "Token invalid.",
              },
              {
                error: true,
                code: "token.invalid",
                message: "Token not present.",
              },
            ],
          },
        },
      },
    },
  },
};
