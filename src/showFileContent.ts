import { File } from './main'
import hljs from 'highlight.js'

export const showFileContent = (file: File) => {
  const fileContentContainer = document.querySelector(
    '.file_editor__file-content'
  )

  if (fileContentContainer) {
    fileContentContainer.innerHTML = ''

    // Создайте элемент <pre> для отображения текста с подсветкой синтаксиса
    const pre = document.createElement('pre')
    pre.innerHTML = `<code>${escapeHtml(file.fileContent)}</code>`

    fileContentContainer.append(pre)

    // Вызовите highlight.js для подсветки синтаксиса
    hljs.highlightAll()
  }
}

// Функция для экранирования HTML-сущностей
const escapeHtml = (unsafe: string): string => {
  return unsafe.replace(/[&<"'>]/g, (match) => {
    switch (match) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      case "'":
        return '&#039;'
      default:
        return match
    }
  })
}
