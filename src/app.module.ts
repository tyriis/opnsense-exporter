import { Module } from "@nestjs/common"
import { PrometheusModule, makeGaugeProvider } from "@willsoto/nestjs-prometheus"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { configurationModule } from "./utils/configuration/configuration.module"
import { ScheduleModule } from "@nestjs/schedule"

@Module({
  imports: [configurationModule, PrometheusModule.register(), ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    makeGaugeProvider({
      name: "opnsense_dhvp4_lease",
      help: "OPNsense DHCPv4 lease online status",
      labelNames: ["address", "mac", "hostname"],
    }),
  ],
})
export class AppModule {}
