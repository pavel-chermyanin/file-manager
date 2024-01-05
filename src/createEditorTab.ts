import { File, state } from './main'
import { onClickTab } from './onClickTab'
import { removeTab } from './removeTab'
import { updateTabSelection } from './updateTabSelection'

export const createEditorTab = (file: File) => {
  if (state.tabs?.includes(file)) return

  const editorTabs = document.querySelector('.file-editor__tabs')

  const li = document.createElement('li')
  li.classList.add('file-editor__tab')

  const label = document.createElement('span')
  label.classList.add('label')
  label.textContent = file.fileName
  li.append(label)

  const span = document.createElement('span')
  span.classList.add('close-icon')
  li.append(span)

  state?.tabs?.push(file)

  file.tabElement = li

  editorTabs?.append(li)

  state.selectedTab = file

  updateTabSelection()

  span.addEventListener('click', removeTab)

  li.addEventListener('click', onClickTab)
}
