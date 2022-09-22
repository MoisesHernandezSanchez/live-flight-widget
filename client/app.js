const tableBody = document.getElementById('table-body')

const getFlights = () => {
  fetch('http://localhost:8000/flights')
    .then((response) => response.json())
    .then((flights) => {
      populateTable(flights)
    })
    .catch((error) => console.log(error))
}

getFlights()

const populateTable = (flights) => {
  for (const flight of flights) {
    const tableIcon = document.createElement('td')
    const tableRow = document.createElement('tr')
    tableIcon.textContent = '✈️'
    tableRow.append(tableIcon)

    const flightDetails = {
      time: flight.departing.slice(0, 5),
      destination: flight.destination.toUpperCase(),
      flight: flight.flightNumber.shift(),
      gate: flight.gate,
      remarks: flight.status.toUpperCase(),
    }

    for (const flightDetail in flightDetails) {
      const tableCell = document.createElement('td')
      const word = Array.from(flightDetails[flightDetail])

      for (const [index, letter] of word.entries()) {
        const letterElem = document.createElement('div')

        setTimeout(() => {
          letterElem.classList.add('flip')
          letterElem.textContent = letter
          tableCell.append(letterElem)
        }, 100 * index)
      }
      tableRow.append(tableCell)
    }

    tableBody.append(tableRow)
  }
}
