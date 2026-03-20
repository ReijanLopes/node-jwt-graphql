export function isValidLength(text: string){
  if(!text || text.trim().length < 3){
    return true
  }
  return false
}