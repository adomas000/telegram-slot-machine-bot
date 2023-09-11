import { slotMachineOutcomeTable } from "../constants/spin.constants"

// Helpers
export const getSlotMachineSpins = (value:number): ISlotMachineSpin => {
  return slotMachineOutcomeTable[value-1]
}

// Types
export interface ISlotMachineSpin {
  value: number,
  first: string,
  second: string,
  third: string
}
