export const createTreeElement = (label: string, type: string) => {
  const li = document.createElement('li')

  const toggleIcon = document.createElement('span')
  toggleIcon.classList.add('toggle-icon')
  li.classList.add(type)
  li.append(toggleIcon)

  const wrapperLabel = document.createElement('div')
  wrapperLabel.className = 'wrapper-label'

  const typeIcon = document.createElement('span')
  typeIcon.classList.add('type-icon')
  wrapperLabel.append(typeIcon)

  const span = document.createElement('span')
  span.textContent = label
  span.classList.add('label')
  wrapperLabel.append(span)

  li.appendChild(wrapperLabel)

  const ul = document.createElement('ul')
  li.append(ul)

  li.setAttribute('data-type', type)

  return li
}
