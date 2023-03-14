import { marked } from 'marked'

export default function (markdown: any) {
    const html = marked(markdown)
    return html
}