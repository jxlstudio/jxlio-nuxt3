import { marked } from 'marked'

export default function (markdown: any) {
    const html = marked.parse(markdown)
    return html
}