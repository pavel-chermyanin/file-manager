import { state } from './main'
import { selectElement } from './selectElement'
import { updateTabSelection } from './updateTabSelection'

export const onClickTab = (e: MouseEvent) => {
  e.preventDefault()
  console.log(e.currentTarget)
  // по клику на табу
  // находим file из state
  const file = state.tabs?.find((item) => {
    const el = item.tabElement
    if (el) {
      return el === (e.currentTarget as HTMLElement)
    }
  })

  // назначаем новую выбранную табу
  if (file) {
    state.selectedTab = file

    // выбираем элемент из tree
    if (file.$el) {
      selectElement(file.$el)

      // раскрываем дерево если свернуто
      file.$el.parentElement?.classList.add('nested')
    }
  }
  updateTabSelection()
}
