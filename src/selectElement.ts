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
  const selectedItem = state?.tabs?.find((item) => item.$el === element)

  if (!selectedItem) {
    const temp = state.uploadedFiles.find((item) => item.$el === element)
    console.log('create')
    if (temp) {
      createEditorTab(temp)
    }
  }

  if (state.tabs) {
    state.selectedTab = state.tabs?.find((item) => item.$el === element)
  }

  updateTabSelection()
  btnRemoveFolder.disabled =
    document.getElementById('tree-container') ===
    state.selectedElement.parentElement

  if (elementType === 'folder') {
    btnDownloadFile.disabled = true
    btnRemoveFile.disabled = true
  }

  if (elementType === 'file') {
    btnRemoveFolder.disabled = true
    btnAddFolder.disabled = true
    btnUploadFile.disabled = true
  }
}
