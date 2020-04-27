import { createContainer } from 'unstated-next'
import useThem from './them'
import usePlay from './play'
// import useUer from './user'


const composeHooks = (...hooks) => () => hooks.reduce((acc, hook) => ({...acc, ...hook() }), {})

const Store = createContainer(composeHooks(useThem, usePlay))

export {
    Store,
}