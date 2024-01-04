import { File } from './main'

export const saveFile = (file: File) => {
  // Создаем Blob с текстовым содержимым файла
  const blob = new Blob([file.fileContent], { type: 'text/plain' })

  // Создаем ссылку на Blob
  const blobUrl = URL.createObjectURL(blob)

  // Создаем ссылку для скачивания файла
  const downloadLink = document.createElement('a')
  downloadLink.href = blobUrl
  downloadLink.download = file.fileName

  // Добавляем ссылку на документ и эмулируем клик по ней для скачивания файла
  document.body.appendChild(downloadLink)
  downloadLink.click()

  // Удаляем ссылку из документа
  document.body.removeChild(downloadLink)

  // Освобождаем ресурсы Blob
  URL.revokeObjectURL(blobUrl)
}
