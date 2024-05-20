import { NestFactory } from "@nestjs/core"
import { ConfigService } from "@nestjs/config"
import { Logger, ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { AppModule } from "./app.module"
import { AppService } from "./app.service"

const logger = new Logger("Main")

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  const configService: ConfigService = app.get(ConfigService)
  const name: string = configService.get<string>("SERVICE_NAME")
  const version: string = configService.get<string>("SERVICE_VERSION") ?? "0.0.0"
  const port: number = configService.get<number>("app.port") ?? 3000
  const host: string = configService.get<string>("app.host") ?? "127.0.0.1"

  // Enable global validation pipes
  // https://www.prisma.io/blog/nestjs-prisma-validation-7D056s1kOla1
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  // Enable JSON pretty print REST
  // https://stackoverflow.com/questions/60624042/make-a-nestjs-route-send-in-response-a-pretty-formatted-json
  if (configService.get<boolean>("app.pretty")) {
    app.getHttpAdapter().getInstance().set("json spaces", 2)
  }

  // Enable swagger spec entrypoint
  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription("Locking Service API documentation.")
    .setVersion(version)
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  // Collect metrics on startup
  await app.get(AppService).collect()

  await app.listen(port, host, async () => {
    logger.log(`Application ${name}@${version} is running on: ${host}:${port}`)
  })
}

bootstrap()
