export const useOgTextFit = () => {
  const clampTitle = (text: string) =>
    text.length > 60 ? text.slice(0, 60) + '…' : text

  const clampDescription = (text: string) =>
    text.length > 120 ? text.slice(0, 120) + '…' : text

  return {
    clampTitle,
    clampDescription
  }
}
