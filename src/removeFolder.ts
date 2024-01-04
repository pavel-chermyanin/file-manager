import { state } from './main'

export const removeFolder = () => {
  if (!state.selectedElement) {
    alert('Выберите элемент, к которому хотите добавить директорию или файл.')
    return
  }
  const parentElement = state.selectedElement.parentElement as HTMLElement

  if (confirm('Вы уверены, что хотите удалить этот элемент?')) {
    parentElement.removeChild(state.selectedElement)
    state.selectedElement = null

    if (!parentElement?.parentElement?.querySelector('ul')?.children?.length) {
      parentElement.parentElement?.classList.remove('arrow-down')
    }
  }
}
