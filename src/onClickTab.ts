import { state } from './main'
import { selectElement } from './selectElement'
import { updateTabSelection } from './updateTabSelection'

export const onClickTab = (e: MouseEvent) => {
  const file = state.tabs?.find((item) => item.tabElement === e.target)
  if (file) {
    state.selectedTab = file

    if (file.$el) {
      selectElement(file.$el)

      file.$el.parentElement?.classList.add('nested')
    }
    updateTabSelection()
  }
}
