import { selectElement } from './selectElement'
import { State, state } from './main'

export const renameElement = () => {
  if (!state.selectedElement) {
    alert('Выберите файл для переименования')
    return
  }
  const name = prompt('Введите имя директории', '')

  // переименовываем в tree
  if (name !== null && name.trim() !== '') {
    const label = state.selectedElement?.querySelector('.label')
    if (label) {
      label.textContent = name

      // переименовываем в табах
      if (state.selectedTab?.tabElement) {
        const el = state.selectedTab.tabElement.querySelector('.label')
        if (el) {
          el.textContent = name
        }
      }

      // переименовываем в state
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
