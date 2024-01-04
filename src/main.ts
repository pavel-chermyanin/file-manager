import { selectElement } from './selectElement'
import { createTreeElement } from './createTreeElement'
import { createDirectory } from './createDirectory'
import { updateNestedState } from './updateNestedState'
import { toggleNested } from './toggleNested'
import { removeFolder } from './removeFolder'
import { uploadFile } from './uploadFile'
import { saveFile } from './saveFile'

export interface File {
  fileName: string
  fileContent: string
  $el: HTMLLIElement | null
  tabElement?: HTMLElement | null
  ext?: string
}

export interface State {
  selectedElement: HTMLLIElement | null
  uploadedFiles: File[]
  selectedTab?: File | null
  tabs?: File[]
}

export const state: State = {
  selectedElement: null,
  uploadedFiles: [],
  selectedTab: null,
  tabs: [],
}

export const btnAddFolder = document.querySelector(
  '.btn-add-folder'
) as HTMLButtonElement
btnAddFolder?.addEventListener('click', createDirectory)

export const btnRemoveFolder = document.querySelector(
  '.btn-remove-folder'
) as HTMLButtonElement
btnRemoveFolder?.addEventListener('click', removeFolder)

export const btnUploadFile = document.querySelector(
  '.upload-file'
) as HTMLButtonElement
btnUploadFile?.addEventListener('click', uploadFile)

export const btnDownloadFile = document.querySelector(
  '.btn-download-file'
) as HTMLButtonElement
btnDownloadFile?.addEventListener('click', saveFile)

document.addEventListener('DOMContentLoaded', () => {
  const root = createTreeElement('Root', 'folder')
  root.addEventListener('click', function (event) {
    event.stopPropagation()
    selectElement(root)
  })
  const toggleIcon = root.querySelector('.toggle-icon') as HTMLElement
  toggleIcon.addEventListener('click', (event) => {
    event.stopPropagation()
    if (toggleIcon) {
      toggleNested(toggleIcon)
    }
  })
  updateNestedState(root)
  document.getElementById('tree-container')?.append(root)
})
