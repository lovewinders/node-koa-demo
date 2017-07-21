import development from './development'
import production from './production'

let config = {};
const env = process.env.NODE_ENV;

if (env === 'development') {
    config = Object.assign(config, development || {})
} else if (env === 'production') {
    config = Object.assign(config, production || {})
}

export default config
