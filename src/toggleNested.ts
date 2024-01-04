// Функция для переключения видимости вложенного списка
export const toggleNested = (element: HTMLElement) => {
  const nestedList = element?.parentElement?.querySelector('ul')

  if (nestedList) {
    nestedList.classList.toggle('nested')
  }
}
