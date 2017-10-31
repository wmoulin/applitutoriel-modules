import { HornetEvent } from "hornet-js-core/src/event/hornet-event";

export interface CountChangeEventDetail {
    count: number;
}

export let COUNT_CHANGE_EVENT = new HornetEvent<CountChangeEventDetail>("COUNT_CHANGE");
