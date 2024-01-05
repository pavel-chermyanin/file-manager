import { createTreeElement } from './createTreeElement'
import { state } from './main'
import { selectElement } from './selectElement'
import { toggleNested } from './toggleNested'
import { updateNestedState } from './updateNestedState'

// функция создания элемента дерева с типом папка
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
    }

    // для каждого элемента дерева слушатель клике
    newElement.addEventListener('click', function (event) {
      event.stopPropagation()
      selectElement(newElement)
    })

    // для каждой иконки сворачивания директорий
    toggleIcon.addEventListener('click', (event) => {
      event.stopPropagation()
      if (toggleIcon) {
        toggleNested(toggleIcon)
      }
    })
    updateNestedState(newElement)
  }
}
