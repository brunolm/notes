import Nullstack, { NullstackClientContext } from 'nullstack'

class Home extends Nullstack<any> {

  prepare({ project, page, greeting }: NullstackClientContext<any>) {
    page.title = `${project.name} - ${greeting}`
    page.description = `${project.name} was made with Nullstack`
  }

  render() {
    return <section class="w-full max-w-3xl min-h-screen my-0 mx-auto flex items-center p-6 flex-wrap md:flex-nowrap" />
  }

}

export default Home
