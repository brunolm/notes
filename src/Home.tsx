import Nullstack, { NullstackClientContext } from 'nullstack'

import { existsSync, readFileSync, type Stats, statSync } from 'fs'
import prismjs from 'prismjs'
import { Remarkable } from 'remarkable'
import remarkableMeta from 'remarkable-meta'

declare const Prism: { highlight: (code: string, grammar: any, language: string) => string }

class Home extends Nullstack<any> {

  html: string
  meta: Record<string, string>
  stat: Stats
  file: string

  static async getArticleByKey({ key }) {
    await import('prismjs/components/prism-jsx.min')
    let file = `content/${key}.md`

    if (!existsSync(file)) {
      file = 'content/404.md'
    }
    const text = readFileSync(file, 'utf-8')
    const stat = statSync(file)

    const md = new Remarkable({
      highlight: (code) => Prism.highlight(code, prismjs.languages.jsx, 'javascript'),
    })
    md.use(remarkableMeta)
    md.use((m) => {
      const originalRender = m.renderer.rules.link_open
      m.renderer.rules.link_open = function () {
        // eslint-disable-next-line prefer-spread, prefer-rest-params
        let result = originalRender.apply(null, arguments)
        const regexp = /href="([^"]*)"/
        const href = regexp.exec(result)[1]
        if (!href.startsWith('/')) {
          result = result.replace('>', ' target="_blank" rel="noopener">')
        }
        return result
      }
    })
    md.use((m) => {
      m.renderer.rules.heading_open = function (tokens, i) {
        const { content } = tokens[i + 1]
        const { hLevel } = tokens[i]
        const id = content
          .toLowerCase()
          .split(/[^a-z]/)
          .join('-')
        return `<h${hLevel} id="${id}"><a href="#${id}">`
      }
      m.renderer.rules.heading_close = function (tokens, i) {
        const { hLevel } = tokens[i]
        return `</a></h${hLevel}>`
      }
    })

    return {
      html: md.render(text),
      meta: md.meta,
      stat,
      file,
    }
  }

  prepare({ project, page }: NullstackClientContext<any>) {
    page.title = `${project.name}`
    page.description = `${project.name} was made with Nullstack`
  }

  async initiate({ router }) {
    const { html, meta, stat, file } = await Home.getArticleByKey({ key: router.path.slice(1) })

    this.html = html
    this.meta = meta
    this.stat = stat
    this.file = file
  }

  render() {
    if (!this.html) {
      return <>loading...</>
    }

    const date = new Date(this.stat.mtime)
    const formatter = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    })

    const [
      { value: mo },
      ,
      { value: da },
      ,
      { value: ye },
      ,
      { value: ho },
      ,
      { value: mi },
      ,
      { value: se },
      ,
      { value: dayPeriod },
    ] = formatter.formatToParts(date)

    const formattedDate = `${ye}-${mo}-${da}, ${ho}:${mi}:${se} ${dayPeriod}`

    return (
      <>
        <section class="w-full max-w-5xl min-h-screen my-0 mx-auto flex flex-col gap-6 p-6 flex-wrap md:flex-nowrap">
          <div>
            <h1>{this.meta?.name}</h1>
            <div class="text-sm italic ml-1 -mt-2 mb-8">Last edited at: {formattedDate}</div>
            <div html={this.html} />
          </div>
        </section>
      </>
    )
  }

}

export default Home
