/* ====================
Library providing the magic module
==================== */

const [Component, useState, useEffect] = (function module() {

    class ComponentsManager {
        constructor() {
            this.currentComponent = null;
            this.components = [];
            this.renderStack = [];
        }

        renderAll() {
            for (const component of this.components) {
                this.render(component);
            }
        }

        render(component) {
            if (this.currentComponent) {
                this.renderStack.push(currentComponent);
            }

            this.currentComponent = component;
            component.render();

            this.currentComponent = this.renderStack.pop(); // component or undefined
        }
    }

    class Component {
        constructor(render) {
            this._render = render;
            this.states = [];
            this.effects = [];
            manager.components.push(this);
        }

        render() {
            this.stateIndex = 0;
            this.effectIndex = 0;
            this.data = this._render();
        }

        useState(initialValue) {
            if (this.states.length <= this.stateIndex) {
                const setter = (newValue) => {
                    state[0] = newValue;
                    manager.render(this);
                }
                const state = [ initialValue, setter ];
                this.states.push(state);
            }

            return [...this.states[this.stateIndex++]]
        }

        useEffect(effectFunc, memoArgs) {
            if (this.effects.length <= this.effectIndex) {
                const effect = [ effectFunc, memoArgs ];
                this.effects.push(effect);
            }
            else {
                const effect = this.effects[this.effectIndex];
                if (memoArgs.length !== effect[1].length || !memoArgs.every((val, idx) => val === effect[1][idx])) {
                    effect[0] = effectFunc;
                }
            }

            return this.effects[this.effectIndex++][0];
        }
    }

    // module global, this is the magic
    const manager = new ComponentsManager();

    // hooks which can retrieve current component from manager, itself retrieved from scope
    function useState(initialValue) {
        return manager.currentComponent.useState(initialValue);
    }

    function useEffect(effect, memoArgs=[]) {
        return manager.currentComponent.useEffect(effect, memoArgs);
    }

    setTimeout(() => manager.renderAll(), 0);

    return [Component, useState, useEffect];
})();


/* ====================
Client code to build function components
==================== */

function Person(props) {
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

const p1 = new Component(Person);
const p2 = new Component(Person);

setTimeout(() => {
    p1.data.setName('Tim');
    p1.data.setAge(44);

    p2.data.setName('Tristan');
    p2.data.setAge(15);
}, 0);