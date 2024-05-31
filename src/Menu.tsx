import Nullstack, { NullstackClientContext, NullstackNode } from 'nullstack'

declare function FolderClosed(): NullstackNode
declare function FolderOpened(): NullstackNode
declare function FileIcon(): NullstackNode

export type DirectoryStructure = {
  [key: string]: string | DirectoryStructure
}

class Menu extends Nullstack {

  isOpen = true

  renderFolderClosed() {
    return (
      <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 8.2C3 7.07989 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H9.67452C10.1637 5 10.4083 5 10.6385 5.05526C10.8425 5.10425 11.0376 5.18506 11.2166 5.29472C11.4184 5.4184 11.5914 5.59135 11.9373 5.93726L12.0627 6.06274C12.4086 6.40865 12.5816 6.5816 12.7834 6.70528C12.9624 6.81494 13.1575 6.89575 13.3615 6.94474C13.5917 7 13.8363 7 14.3255 7H17.8C18.9201 7 19.4802 7 19.908 7.21799C20.2843 7.40973 20.5903 7.71569 20.782 8.09202C21 8.51984 21 9.0799 21 10.2V15.8C21 16.9201 21 17.4802 20.782 17.908C20.5903 18.2843 20.2843 18.5903 19.908 18.782C19.4802 19 18.9201 19 17.8 19H6.2C5.07989 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2Z"
          stroke="#FFFFFF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    )
  }

  renderFolderOpened() {
    return (
      <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1 5C1 3.34315 2.34315 2 4 2H8.55848C9.84977 2 10.9962 2.82629 11.4045 4.05132L11.7208 5H20C21.1046 5 22 5.89543 22 7V9.00961C23.1475 9.12163 23.9808 10.196 23.7695 11.3578L22.1332 20.3578C21.9603 21.3087 21.132 22 20.1654 22H3C1.89543 22 1 21.1046 1 20V5ZM20 9V7H11.7208C10.8599 7 10.0956 6.44914 9.82339 5.63246L9.50716 4.68377C9.37105 4.27543 8.98891 4 8.55848 4H4C3.44772 4 3 4.44772 3 5V12.2709L3.35429 10.588C3.54913 9.66249 4.36562 9 5.31139 9H20ZM3.36634 20C3.41777 19.9109 3.4562 19.8122 3.47855 19.706L5.31139 11L21 11H21.8018L20.1654 20L3.36634 20Z"
          fill="#FFFFFF"
        />
      </svg>
    )
  }

  renderFileIcon() {
    return (
      <svg width="20px" height="20px" viewBox="-8.47 0 88.9 88.9" xmlns="http://www.w3.org/2000/svg">
        <g id="Group_18" data-name="Group 18" transform="translate(-652 -672)">
          <path
            id="Path_37"
            data-name="Path 37"
            d="M718.8,717.1V691.8L702.4,674H664.5A10.5,10.5,0,0,0,654,684.5v63.9a10.5,10.5,0,0,0,10.5,10.5h43.8a10.5,10.5,0,0,0,10.5-10.5v-8"
            fill="none"
            stroke="#FFFFFF"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="4"
          />
          <path
            id="Path_38"
            data-name="Path 38"
            d="M697.3,675.1v16.4s-.2,5.8,3.5,5.8h16.4"
            fill="none"
            stroke="#FFFFFF"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="4"
          />
          <path
            id="Path_39"
            data-name="Path 39"
            d="M721.9,729.2a3.172,3.172,0,0,1-3.7,3.7,3.209,3.209,0,0,1-2.5-2.5,3.172,3.172,0,0,1,3.7-3.7A3.512,3.512,0,0,1,721.9,729.2Z"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            stroke-miterlimit="10"
            stroke-width="4"
          />
        </g>
      </svg>
    )
  }

  render({
    items,
    depth = 0,
    parentKey = '',
  }: NullstackClientContext<{ items: DirectoryStructure; depth: number; parentKey: string }>) {
    return (
      <div class="select-none">
        {Object.keys(items).map((key) => {
          const value = items[key]
          if (typeof value === 'string') {
            return (
              <div class={`${depth ? 'pl-2' : '-ml-1'}`}>
                <span>
                  <a
                    href={`/${parentKey}${key.replace(/[.]md$/i, '')}`}
                    class="flex items-center gap-2 hover:bg-blue-950 hover:rounded-lg p-1 cursor-pointer"
                  >
                    <FileIcon /> {key}
                  </a>
                </span>
              </div>
            )
          }

          return (
            <ul style={`padding-left: ${depth ? 16 : 0}px`}>
              <li class="list-none">
                <span class="flex gap-2 cursor-pointer">
                  {this.isOpen ? <FolderOpened /> : <FolderClosed />}
                  {key}
                </span>

                <div class="border-l border-opacity-75 border-gray-400 mb-1">
                  <Menu items={value} depth={depth + 1} parentKey={`${parentKey}${key}/`} isOpen={this.isOpen} />
                </div>
              </li>
            </ul>
          )
        })}
      </div>
    )
  }

}

export default Menu
