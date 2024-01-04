// Функция для обновления состояния вложенности при создании нового элемента
export const updateNestedState = (element: HTMLElement) => {
  // Начинаем с текущего элемента и поднимаемся вверх по иерархии
  let currentElement = element
  while (currentElement && currentElement.tagName.toLowerCase() === 'li') {
    // Находим вложенный список и добавляем ему класс nested
    const nestedList = currentElement.querySelector('ul')

    if (nestedList) {
      nestedList.classList.add('nested')
    }
    // Переходим к родительскому элементу
    currentElement = currentElement.parentElement as HTMLElement
  }
}
