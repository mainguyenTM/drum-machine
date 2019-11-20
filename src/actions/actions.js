import { POWER, VOLUME, DISPLAY, BANK } from '../mock/enum';

export const switchPower = (currentState) => {
    return {
      type: POWER,
      power: !currentState
    } 
};
export const changeVolume = (newVolume) => {
    return {
        type: VOLUME,
        volume: newVolume
    }   
};
export const updateDisplay = (newDisplay) => {
    return {
        type: DISPLAY,
        display: newDisplay
    } 
};
export const switchBank = (currentBank) => {
    return {
        type: BANK,
        bank: !currentBank
    } 
};