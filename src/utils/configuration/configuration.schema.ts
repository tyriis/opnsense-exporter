import * as Joi from "joi"

export const envValidationSchema: Joi.ObjectSchema = Joi.object({
  NODE_ENV: Joi.string().valid("development", "production", "test").required(),

  CONFIG_PATH: Joi.string().optional(),
})

export const configValidationSchema: Joi.ObjectSchema = Joi.object().keys({
  app: Joi.object({
    host: Joi.string()
      .ip({
        version: ["ipv4"],
        cidr: "forbidden",
      })
      .default("127.0.0.1"),
    port: Joi.number().port().default(3000),
    pretty: Joi.boolean().default(false),
  }).unknown(false),
  opnsense: Joi.object()
    .keys({
      url: Joi.string().uri().required(),
      apiKey: Joi.string().required(),
      apiSecret: Joi.string().required(),
    })
    .required(),
})
