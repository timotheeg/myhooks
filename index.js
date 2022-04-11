import { Component } from './MyHooks.js';
import { Person } from './Person.js';

const p1 = new Component(Person);
const p2 = new Component(Person);

setTimeout(() => {
    p1.data.setName('Tim');
    p1.data.setAge(44);

    p2.data.setName('Tristan');
    p2.data.setAge(15);
    p2.data.setName('Tristan1');
    p2.data.setName('Tristan2');
    p2.data.setName('Tristan3');
    p2.data.setName('Tristan4');
}, 0);

setTimeout(() => {
    p2.runEffects();
}, 500);