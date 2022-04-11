import { useState, useEffect, useMemo } from './MyHooks.js'

export function Person(props) {
    const [name, setName] = useState('Name');
    const [age, setAge] = useState(0);

    const twiceMyAge = useMemo(() => {
        console.log('--- useMemo --- ', age);
        return age * 2;
    }, [age])

    useEffect(
        () => console.log('render effect', name, age),
        [name, age]
    )

    const view = `${name} is ${age} years old, twice my age is ${twiceMyAge}`;

    console.log(view);

    return {
        view,
        setName,
        setAge
    };
}

