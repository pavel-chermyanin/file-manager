import { state } from './main'
import { selectElement } from './selectElement'
import { showFileContent } from './showFileContent'
import { updateTabSelection } from './updateTabSelection'

export const removeTab = (e: MouseEvent) => {
  const li = document.querySelectorAll('.tree-container li')
  e.preventDefault()
  const parentElement = e.target as HTMLElement

  if (confirm('Вы уверены, что хотите удалить этот элемент?')) {
    if (parentElement?.parentElement) {
      parentElement.parentElement.remove()
    }
    state.selectedElement = null
  }

  state.tabs = state.tabs?.filter(
    (item) => item.tabElement?.querySelector('span') !== e.target
  )
  if (state.tabs?.length) {
    state.selectedTab = state.tabs[state.tabs.length - 1]
    showFileContent(state.selectedTab)
    updateTabSelection()
    li.forEach((item) => {
      item.classList.remove('selected')
    })
    if (state.selectedTab.$el) {
      selectElement(state.selectedTab.$el)
    }
  } else {
    const fileContentContainer = document.querySelector(
      '.file_editor__file-content'
    )
    if (fileContentContainer) {
      fileContentContainer.innerHTML = ''
    }
    li.forEach((item) => {
      item.classList.remove('selected')
    })
  }
  return
}
