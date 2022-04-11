/* ====================
Library providing the magic module
==================== */

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

export class Component {
    constructor(render) {
        this._render = render;
        this.states = [];
        this.effects = [];
        this.memos = [];
        manager.components.push(this);
    }

    render() {
        this.stateIndex = 0;
        this.effectIndex = 0;
        this.memoIndex = 0;
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
                this.effects[this.effectIndex] = [ effectFunc, memoArgs ];
            }
        }
        return this.effects[this.effectIndex++][0];
    }

    useMemo(memoFunc, memoArgs) {
        if (this.memos.length <= this.memoIndex) {
            const memo = [ memoFunc(), memoArgs ];
            this.memos.push(memo);
        }
        else {
            const memo = this.memos[this.memoIndex];
            if (memoArgs.length !== memo[1].length || !memoArgs.every((val, idx) => val === memo[1][idx])) {
                this.memos[this.memoIndex] = [ memoFunc(), memoArgs ];
            }
        }

        return this.memos[this.memoIndex++][0];
    }


    runEffects() {
        this.effects.forEach(effect => effect[0]());
    }
}

// module global, this is the magic
const manager = new ComponentsManager();

// hooks which can retrieve current component from manager, itself retrieved from scope
export function useState(initialValue) {
    return manager.currentComponent.useState(initialValue);
}

export function useEffect(effect, memoArgs=[]) {
    return manager.currentComponent.useEffect(effect, memoArgs);
}

export function useMemo(computer, memoArgs=[]) {
    return manager.currentComponent.useMemo(computer, memoArgs);
}

export function useRef(initialValue) {
    return useMemo(() => { current: initialValue }, []);
}

setTimeout(() => manager.renderAll(), 0);
