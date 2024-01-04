import {
  File,
  btnAddFolder,
  btnRemoveFolder,
  btnUploadFile,
  state,
} from './main'
import { showFileContent } from './showFileContent'
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

  const elementType = state.selectedElement.getAttribute('data-type')

  if (state.tabs) {
    console.log('selectedTab')
    state.selectedTab = state.tabs?.find((item) => item.$el === element)
  }
  updateTabSelection()
  btnRemoveFolder.disabled =
    document.getElementById('tree-container') ===
    state.selectedElement.parentElement

  if (elementType === 'file') {
    btnRemoveFolder.disabled = true
    btnAddFolder.disabled = true
    btnUploadFile.disabled = true

    console.log(state.selectedElement, state.selectedTab, state.tabs)

    // const fileName =
    //   state?.selectedElement?.querySelector('.label')?.textContent
    // const selectedFile = state?.uploadedFiles.find(
    //   (file) => file.fileName === fileName
    // ) as File

    // if (selectedFile) {
    //   // Вызовите функцию showFileContent, передавая выбранный файл
    //   showFileContent(selectedFile)
    // }
  }
}
