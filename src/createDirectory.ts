import { createTreeElement } from './createTreeElement'
import { state } from './main'
import { selectElement } from './selectElement'
import { toggleNested } from './toggleNested'
import { updateNestedState } from './updateNestedState'

export const createDirectory = () => {
  if (!state.selectedElement) {
    alert('Выберите элемент, к которому хотите добавить директорию или файл.')
    return
  }

  const name = prompt('Введите имя директории', '')

  if (name !== null && name.trim() !== '') {
    const newElement = createTreeElement(name, 'folder')

    const selectedUl = state.selectedElement.querySelector('ul')
    state.selectedElement.classList.add('arrow-down')
    const toggleIcon = newElement.querySelector('.toggle-icon') as HTMLElement

    // Если выбрана директория, добавляем вложенный элемент
    if (state.selectedElement.tagName.toLowerCase() === 'li' && selectedUl) {
      selectedUl.appendChild(newElement)
      selectedUl.classList.add('nested')
      // updateNestedState(newElement)
    }

    // Добавляем обработчик события для нового элемента
    newElement.addEventListener('click', function (event) {
      event.stopPropagation()
      selectElement(newElement)
    })

    toggleIcon.addEventListener('click', (event) => {
      event.stopPropagation()
      if (toggleIcon) {
        toggleNested(toggleIcon)
      }
    })
    updateNestedState(newElement)
  }
}
