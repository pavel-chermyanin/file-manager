import { createEditorTab } from './createEditorTab'
import { createTreeElement } from './createTreeElement'
import { File, state } from './main'
import { selectElement } from './selectElement'
import { updateNestedState } from './updateNestedState'
import { updateTabSelection } from './updateTabSelection'
// import * as ft from 'file-type'

export const uploadFile = () => {
  if (!state.selectedElement) {
    alert('Выберите элемент, к которому хотите загрузить файл.')
    return
  }

  const fileInput = document.createElement('input')
  fileInput.type = 'file'

  fileInput.addEventListener('change', function (event) {
    // Получаем выбранный файл
    const file = (event.target as HTMLInputElement).files?.[0]
    const fileItem: File = {
      fileContent: '',
      fileName: '',
      $el: null,
    }

    // Если файл выбран
    if (file) {
      // Определяем тип файла на основе магических байтов
      // const fileTypeResult = await fileType.fromBuffer(new Uint8Array(content));
      // Используем file-type для определения типа файла
      // const fileType = await ft.fileTypeFromFile(file.name)

      // if (!fileType || fileType.mime.startsWith('image')) {
      //   alert('Выбранный файл не является поддерживаемым текстовым файлом.')
      //   return
      // }
      // Проверяем тип файла
      if (!file.type.startsWith('image/')) {
        // Создаем новый элемент дерева с типом "file"
        const newElement = createTreeElement(file.name, 'file')
        if (state.selectedElement) {
          state.selectedElement?.classList.add('arrow-down')
        }

        const selectedUl = state?.selectedElement?.querySelector('ul')

        if (
          state?.selectedElement?.tagName.toLowerCase() === 'li' &&
          selectedUl
        ) {
          selectedUl.appendChild(newElement)
          selectedUl.classList.add('nested')
        }

        // Читаем содержимое файла
        const reader = new FileReader()
        reader.onload = function () {
          // Добавляем содержимое файла к элементу
          const content = reader.result as string
          fileItem.fileContent = content
          fileItem.fileName = file.name
          fileItem.$el = newElement

          newElement.addEventListener('click', function (event) {
            event.stopPropagation()
            selectElement(newElement)
          })
          updateNestedState(newElement)
          state.uploadedFiles.push(fileItem)

          createEditorTab(fileItem)
        }

        // Читаем файл как текст
        reader.readAsText(file)
      } else {
        // Файл не текстовый (например, изображение)
        alert('Выбранный файл не является текстовым файлом.')
      }
      console.log(state.uploadedFiles)
    }
  })

  fileInput.click()
}
