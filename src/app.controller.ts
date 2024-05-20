import { Controller, Get, Header, HttpCode } from "@nestjs/common"
import { AppService } from "./app.service"

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Return the service name and version information.
   * @returns {unknown} The service identifier.
   */
  @Get()
  @Header("Content-Type", "application/json")
  getIdentifier(): unknown {
    return this.appService.getIdentifier()
  }

  /**
   * Return a basic health check message.
   * @returns {string} The health check message.
   */
  @Get("/health")
  @Header("Content-Type", "text/plain;charset=utf-8")
  @HttpCode(200)
  getHealth(): string {
    return "Service operating normally."
  }
}
