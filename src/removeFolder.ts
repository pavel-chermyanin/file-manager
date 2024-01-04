import {
  btnAddFolder,
  btnDownloadFile,
  btnRemoveFile,
  btnRemoveFolder,
  btnUploadFile,
  state,
} from './main'

export const removeFolder = () => {
  if (!state.selectedElement) {
    alert('Выберите элемент, который хотите удалить.')
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
  state.selectedElement = null
  btnRemoveFolder.disabled = false
  btnAddFolder.disabled = false
  btnUploadFile.disabled = false
  btnDownloadFile.disabled = false
  btnRemoveFile.disabled = false
}
