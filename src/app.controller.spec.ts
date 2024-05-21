import { Test, TestingModule } from "@nestjs/testing"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ConfigModule } from "@nestjs/config"
import { makeGaugeProvider } from "@willsoto/nestjs-prometheus"
import { ScheduleModule } from "@nestjs/schedule"

describe("AppController", () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), ScheduleModule.forRoot()],
      controllers: [AppController],
      providers: [
        AppService,
        makeGaugeProvider({
          name: "opnsense_dhcpv4_lease",
          help: "OPNsense DHCPv4 lease online status",
          labelNames: ["address", "mac", "hostname"],
        }),
      ],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe("root", () => {
    it("should return `{ service: unknown, version: unknown }`", () => {
      expect(appController.getIdentifier()).toStrictEqual({ service: undefined, version: undefined })
    })
  })
  describe("health", () => {
    it('should return "Service operating normally."', () => {
      expect(appController.getHealth()).toBe("Service operating normally.")
    })
  })
})
