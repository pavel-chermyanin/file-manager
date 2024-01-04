import { File, state } from './main'

export const saveFile = () => {
  if (!state.selectedElement) {
    alert('Выберите файл для сохранения')
    return
  }
  const fileItem = state.selectedTab

  if (fileItem) {
    // Создаем Blob с текстовым содержимым файла
    const blob = new Blob([fileItem.fileContent], { type: 'text/plain' })

    // Создаем ссылку на Blob
    const blobUrl = URL.createObjectURL(blob)

    // Создаем ссылку для скачивания файла
    const downloadLink = document.createElement('a')
    downloadLink.href = blobUrl
    downloadLink.download = generateFileName(fileItem)

    // Добавляем ссылку на документ и эмулируем клик по ней для скачивания файла
    document.body.appendChild(downloadLink)
    downloadLink.click()

    // Удаляем ссылку из документа
    document.body.removeChild(downloadLink)

    // Освобождаем ресурсы Blob
    URL.revokeObjectURL(blobUrl)
  }
}

function generateFileName(fileItem: File) {
  // Проверка наличия расширения и формирование имени файла
  if (fileItem.ext) {
    return `${fileItem.fileName}.${fileItem.ext}`
  } else {
    return fileItem.fileName
  }
}
