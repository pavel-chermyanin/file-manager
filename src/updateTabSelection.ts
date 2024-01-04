import { File, state } from './main'
import { showFileContent } from './showFileContent'

// Функция для обновления выбранного таба и добавления/удаления класса "selected"
export const updateTabSelection = () => {
  state.tabs?.forEach(el => {
    el.tabElement?.classList.remove('selected')
  })


  // Добавляем класс "selected" к текущему табу
  state.selectedTab?.tabElement?.classList.add('selected')

  if(state.selectedTab) {
    showFileContent(state.selectedTab)
  }


}
