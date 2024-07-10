export const getGreeting = () => {
    const date = new Date()
    const hours = date.getHours()

    if (hours >= 6 && hours < 12) {
      return 'Buenos días'
    }
    if (hours >= 12 && hours < 18) {
      return 'Buenas tardes'
    }
    return 'Buenas noches'
  }