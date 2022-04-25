import { LethargyConfig } from './Lethargy.interface'
import { fillArray } from './utils/fillArray'

export default class Lethargy {
  private config: Required<LethargyConfig> = {
    stability: 8, // Stability is how many records to use to calculate the average
    sensitivity: 100, // The wheelDelta threshold. If an event has a wheelDelta below this value, it will not register
    tolerance: 1.1, // How much the old rolling average have to differ from the new rolling average for it to be deemed significant
    delay: 150, // Threshold for the amount of time between mousewheel events for them to be deemed separate
  }

  // Used internally and should not be manipulated
  private lastUpDeltas: any[] = []
  private lastDownDeltas: any[] = []
  private deltasTimestamp: any[] = []

  constructor(userConfig: LethargyConfig) {
    if (typeof userConfig?.stability !== 'undefined') {
      this.config.stability = Math.abs(userConfig.stability)
    }

    if (typeof userConfig?.sensitivity !== 'undefined') {
      this.config.sensitivity = 1 + Math.abs(userConfig.sensitivity)
    }

    if (typeof userConfig?.tolerance !== 'undefined') {
      this.config.tolerance = 1 + Math.abs(userConfig.tolerance)
    }

    if (typeof userConfig?.delay !== 'undefined') {
      this.config.delay = userConfig.delay
    }

    this.lastUpDeltas = fillArray(this.config.stability * 2, null)
    this.lastDownDeltas = fillArray(this.config.stability * 2, null)
    this.deltasTimestamp = fillArray(this.config.stability * 2, null)

    console.log(this.lastDownDeltas, this.lastUpDeltas, this.deltasTimestamp)
  }
}
