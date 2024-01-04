import { File, state } from './main'
import { removeTab } from './removeTab'
import { selectElement } from './selectElement'
// import { onClickTab } from './onClickTab'
import { updateTabSelection } from './updateTabSelection'

export const createEditorTab = (file: File) => {
  if (state.tabs?.includes(file)) return

  const editorTabs = document.querySelector('.file-editor__tabs')

  // Создаем новый элемент списка (li) для таба
  const li = document.createElement('li')
  li.textContent = file.fileName
  li.classList.add('file-editor__tab')

  const span = document.createElement('span')
  span.textContent = 'x'
  span.classList.add('close-icon')
  li.append(span)

  // Добавляем файл к массиву табов в состоянии
  state?.tabs?.push(file)

  // Сохраняем ссылку на DOM-элемент в объекте файла
  file.tabElement = li

  // Добавляем таб в редактор
  editorTabs?.append(li)

  state.selectedTab = file

  updateTabSelection()

  const onClickTab = (e: MouseEvent) => {
    const file = state.tabs?.find((item) => item.tabElement === e.target)
    if (file) {
      state.selectedTab = file
      updateTabSelection()

      // state.selectedElement = file.$el
      if (file.$el) {
        selectElement(file.$el)
      }
    }
  }

  span.addEventListener('click', removeTab)

  li.addEventListener('click', (e) => {
    onClickTab(e)
  })
}
