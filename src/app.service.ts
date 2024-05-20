import { Logger, Injectable, BeforeApplicationShutdown } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Cron } from "@nestjs/schedule"
import { InjectMetric } from "@willsoto/nestjs-prometheus"
import { Gauge } from "prom-client"
import { timer } from "execution-time-decorators"

const timerLogger = new Logger("ExecutionTime")

@Injectable()
export class AppService implements BeforeApplicationShutdown {
  private readonly logger = new Logger(AppService.name)

  constructor(
    @InjectMetric("opnsense_dhvp4_lease") public gauge: Gauge<string>,
    private configService: ConfigService,
  ) {}

  beforeApplicationShutdown(signal: string) {
    this.logger.warn(signal)
  }

  @timer({ logger: timerLogger })
  getIdentifier(): any {
    return {
      service: this.configService.get<string>("SERVICE_NAME"),
      version: this.configService.get<string>("SERVICE_VERSION"),
    }
  }

  @timer({ logger: timerLogger })
  async collect(): Promise<undefined> {
    const OPNSENSE_API_URL = `${this.configService.get<string>("opnsense.url")}/api/dhcpv4/leases/searchLease`
    const OPNSENSE_KEY = this.configService.get<string>("opnsense.apiKey")
    const OPNSENSE_SECRET = this.configService.get<string>("opnsense.apiSecret")

    const response = await fetch(OPNSENSE_API_URL, {
      method: "GET",
      headers: {
        Authorization: "Basic " + Buffer.from(OPNSENSE_KEY + ":" + OPNSENSE_SECRET).toString("base64"),
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = (await response.json()) as {
      rows: { address: string; mac: string; hostname: string; status: string }[]
    }
    for (const row of data.rows) {
      this.gauge.set({ address: row.address, mac: row.mac, hostname: row.hostname }, row.status === "online" ? 1 : 0)
    }
  }

  @Cron("0 * * * * *")
  async handleCron() {
    await this.collect()
  }
}
