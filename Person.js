import { useState, useEffect } from './MyHooks.js'

export function Person(props) {
    const [name, setName] = useState('Name')
    const [age, setAge] = useState(0);

    useEffect(
        () => console.log('render effect', name, age),
        [name, age]
    )

    const view = `${name} is ${age} years old`;

    console.log(view);

    return {
        view,
        setName,
        setAge
    };
}