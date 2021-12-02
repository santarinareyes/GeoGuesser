import { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "exopulse",
  webDir: "build",
  bundledWebRuntime: false,
  server: {
    url: "http://192.168.0.34:3000",
  },
}

export default config
