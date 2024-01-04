import { selectElement } from './selectElement'
import { State, state } from './main'

export const renameElement = () => {
  console.log(state.selectedElement)
  if (!state.selectedElement) {
    alert('Выберите файл для переименования')
    return
  }
  const name = prompt('Введите имя директории', '')

  if (name !== null && name.trim() !== '') {
    // const newElement = createTreeElement(name, 'folder')}

    const label = state.selectedElement?.querySelector('.label')
    if (label) {
      label.textContent = name

      if (state.selectedTab?.tabElement) {
        state.selectedTab.tabElement.textContent = name
      }

      if (state.tabs) {
        state.tabs.forEach((item) => {
          if (item.$el === state.selectedElement) {
            item.fileName = name
              .split('.')
              .slice(0, name.split.length - 1)
              .join('')
            item.ext = name.split('.').pop()
          }
        })
      }
    }
  }
}
