import { File, state } from './main'
import { selectElement } from './selectElement'
// import { onClickTab } from './onClickTab'
import { updateTabSelection } from './updateTabSelection'

export const createEditorTab = (file: File) => {
  if (state.tabs?.includes(file)) return

  console.log('createEditorTab')
  const editorTabs = document.querySelector('.file-editor__tabs')

  // Создаем новый элемент списка (li) для таба
  const li = document.createElement('li')
  li.textContent = file.fileName
  li.classList.add('file-editor__tab')

  // Добавляем файл к массиву табов в состоянии
  state?.tabs?.push(file)

  // Сохраняем ссылку на DOM-элемент в объекте файла
  file.tabElement = li

  // Добавляем таб в редактор
  editorTabs?.append(li)

  state?.tabs?.push(file)
  state.selectedTab = file

  updateTabSelection()

  const onClickTab = (e: MouseEvent) => {
    // e.stopPropagation()
    console.log(e.target)
    const file = state.tabs?.find((item) => item.tabElement === e.target)
    if (file) {
      state.selectedTab = file
      updateTabSelection()

      console.log(state.selectedElement, file.$el)
      // state.selectedElement = file.$el
      if (file.$el) {
        selectElement(file.$el)
      }
    }
  }

  // Добавляем слушатель события клика
  li.addEventListener('click', (e) => {
    onClickTab(e)
  })
}
