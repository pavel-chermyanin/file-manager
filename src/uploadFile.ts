import { createEditorTab } from './createEditorTab'
import { createTreeElement } from './createTreeElement'
import { File, state } from './main'
import { selectElement } from './selectElement'
import { updateNestedState } from './updateNestedState'
import { updateTabSelection } from './updateTabSelection'

function getFileExtension(fileName: string) {
  return fileName.split('.').pop()
}

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
      ext: file ? getFileExtension(file.name) : '',
    }

    // Если файл выбран
    if (file) {
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

        // Ищем комментарий summary в текстовом содержимом
        const summaryRegex = /\/\/<summary>\s*\/\/\/([^.]*)\/\/\/<\/summary>/
        // const match = textContent?.match(summaryRegex)

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

          newElement.addEventListener('mouseover', function (event) {
            if (fileItem && fileItem.fileContent.match(summaryRegex)) {
              const match = fileItem.fileContent.match(summaryRegex)
              newElement.title = match ? match[1] : ''
            }
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
    }
  })

  fileInput.click()
}
