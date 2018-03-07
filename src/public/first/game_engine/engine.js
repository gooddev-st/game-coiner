"use strict";

import Step from './step.js'

export default {
    name: 'game_engine',

    steps: [],
    currentID: 0,
    currentStep: null,
    maxSize: 300,

    map: [],

    getStep(id){
        let get_id = this.currentID - id -1;

        if(get_id >= 0 && get_id < this.currentID){
            return this.steps[get_id % this.maxSize].content;
        }
        return null;
    },

    newStep(content){
        let step = new Step(content);
        this.currentID++;
        if(this.currentID < this.maxSize) {
            this.steps.push(step);
        }
        else{
            this.steps[(this.currentID-1) % this.maxSize] = step;
        }
        this.currentStep = step;
    }
}