import Nullstack, { NullstackClientContext, NullstackNode } from 'nullstack'

import '../tailwind.css'
import './Application.scss'
import { readdirSync } from 'fs'

import Home from './Home'
import Menu, { DirectoryStructure } from './Menu'

declare function Head(): NullstackNode

class Application extends Nullstack {

  menuItems: DirectoryStructure

  static async getMenuItems() {
    const getItems = (path: string): { [key: string]: any } => {
      const directoryContent: { [key: string]: any } = {}
      const files = readdirSync(path, { withFileTypes: true })
      for (const file of files) {
        if (file.isDirectory()) {
          directoryContent[file.name] = getItems(`${path}/${file.name}`)
        } else {
          directoryContent[file.name.replace('.md', '')] = file.name
        }
      }
      return directoryContent
    }
    return getItems('content')
  }

  prepare({ page }: NullstackClientContext) {
    page.locale = 'en-US'
  }

  async initiate() {
    const menuItems = await Application.getMenuItems()
    this.menuItems = menuItems
  }

  renderHead() {
    return (
      <head>
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css2?family=Crete+Round&family=Roboto&display=swap" rel="stylesheet" />
        <style>{`html,body{background:#111827}`}</style>
      </head>
    )
  }

  render() {
    return (
      <body class="bg-gray-900 text-zinc-300 font-roboto">
        <Head />
        <div class="flex">
          <aside class="p-10">{this.menuItems && <Menu items={this.menuItems} />}</aside>
          <Home route="/*" />
        </div>
      </body>
    )
  }

}

export default Application
