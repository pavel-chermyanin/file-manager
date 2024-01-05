import { createEditorTab } from './createEditorTab'
import {
  btnAddFolder,
  btnDownloadFile,
  btnRemoveFile,
  btnRemoveFolder,
  btnUploadFile,
  state,
} from './main'
import { updateTabSelection } from './updateTabSelection'

export const selectElement = (element: HTMLLIElement) => {
  if (state.selectedElement) {
    state.selectedElement.classList.remove('selected')
  }

  state.selectedElement = element
  state.selectedElement.classList.add('selected')

  btnRemoveFolder.disabled = false
  btnAddFolder.disabled = false
  btnUploadFile.disabled = false
  btnDownloadFile.disabled = false
  btnRemoveFile.disabled = false

  const elementType = state.selectedElement.getAttribute('data-type')

  // если выбран файл из tree
  if (elementType === 'file') {
    // проверим есть ли элемент в массиве табов
    const selectedItem = state?.tabs?.find((item) => item.$el === element)

    if (!selectedItem) {
      // создадим новую табу
      const temp = state.uploadedFiles.find((item) => item.$el === element)
      if (temp) {
        createEditorTab(temp)
      }
    }

    if (state.tabs) {
      // если табы есть
      // выбранный таб становится с родителем element
      state.selectedTab = state.tabs?.find((item) => item.$el === element)
    }

    btnRemoveFolder.disabled = true
    btnAddFolder.disabled = true
    btnUploadFile.disabled = true
  }

  if (elementType === 'folder') {
    btnDownloadFile.disabled = true
    btnRemoveFile.disabled = true

    // папку root нельзя удалить
    btnRemoveFolder.disabled =
      document.getElementById('tree-container') ===
      state.selectedElement.parentElement
  }
  updateTabSelection()
}
