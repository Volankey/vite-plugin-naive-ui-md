import { convertMd2VueTemplateSource } from './loader'
import {Plugin,} from 'vite'
import { Options } from './interface'

const fileRegex = /\.(md)$/

export default function naiveUIMDLoader(options?:Options): Plugin {
    return {
        name: 'vite-plugin-md',
        enforce: 'pre',
        transform (code, id) {
            if (fileRegex.test(id)) {
                return convertMd2VueTemplateSource(code,options)
            }
        },
        async handleHotUpdate(ctx) {
            if (fileRegex.test(ctx.file)) {
                const defaultRead = ctx.read
                ctx.read = async function() {
                  return convertMd2VueTemplateSource(await defaultRead(),options)
                }
                return ctx.modules
            }
          },
    }
}
