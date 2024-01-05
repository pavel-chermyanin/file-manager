import { state } from './main'
import { selectElement } from './selectElement'
import { showFileContent } from './showFileContent'
import { updateTabSelection } from './updateTabSelection'

export const removeTab = (e: MouseEvent) => {
  const li = document.querySelectorAll('.tree-container li')
  e.preventDefault()
  const parentElement = e.target as HTMLElement

  if (confirm('Вы уверены, что хотите удалить этот элемент?')) {
    // удаляем из dom/state
    if (parentElement?.parentElement) {
      parentElement.parentElement.remove()
    }
    state.selectedElement = null
  }

  // убираем из state закрытую табу
  state.tabs = state.tabs?.filter(
    (item) => item.tabElement?.querySelector('.close-icon') !== e.target
  )

  // табы удалены все
  if (!state.tabs?.length) {
    console.log(state.tabs)
    const fileContentContainer = document.querySelector(
      '.file_editor__file-content'
    )
    // чистим file-editor view
    if (fileContentContainer) {
      fileContentContainer.innerHTML = ''
    }
    // чистим из state табу
    state.selectedTab = null

    li.forEach((item) => {
      item.classList.remove('selected')
    })
  }

  // если табы еще есть
  if (state.tabs?.length) {
    // выбранной табой делаем последнюю в массиве
    state.selectedTab = state.tabs[state.tabs.length - 1]
    // рисуем содержимое файла
    showFileContent(state.selectedTab)

    li.forEach((item) => {
      item.classList.remove('selected')
    })
    // так же делаем выбранным соответсвующий элемент из tree
    if (state.selectedTab.$el) {
      selectElement(state.selectedTab.$el)
    }
  }
  updateTabSelection()
  return
}
