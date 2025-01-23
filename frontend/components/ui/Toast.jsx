import butterup from 'butteruptoasts'

export function showToast ({ title, type }) {
  butterup.options.toastLife = 3000
  butterup.options.maxToasts = 1

  return butterup.toast({
    title,
    type,
    dismissable: true,
    location: 'bottom-right'
  })
}
