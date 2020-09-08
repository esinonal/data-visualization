/* import { select } from 'd3-selection'
import { csv } from 'd3-fetch'
import { scaleSequential, scaleQuantile } from 'd3-scale'
import { extent, max } from 'd3-array'
import { interpolateBlues } from 'd3-scale-chromatic'

export default function Chart5Map () {
  Promise.all([
    fetch('./data/obesity.json').then(d => d.json()),
    csv('./data/hexmap.csv').then(data =>
      data.map(d => ({
        ...d,
        HexCol: Number(d.HexCol),
        HexRow: Number(d.HexRow)
      }))
    )
  ]).then(d => map(d[0], d[1]))
}

const hexWidth = 39.5
// some hexagon utilities
function prepareHexagons (hexLocations) {
  return hexLocations.map(loc => {
    const { HexRow, HexCol } = loc
    const pos = [
      hexWidth * (-2 + HexCol + 0.5 * HexRow),
      1 + hexWidth * (-0.3 + 0.5 * Math.sqrt(3) * HexRow)
    ]
    return { ...loc, pos }
  })
}
const hexPath = (dx, dy, HY) =>
  `M${-dx},${dy} l${dx},${dy} l${dx},${-dy} l0,${-HY} l${-dx},${-dy} l${-dx},${dy} Z`

// constants
const height = 310
const width = 600
const margin = { left: 10, top: 10, right: 10, bottom: 10 }
const scaling = 1
const dx = (scaling * hexWidth) / 2
const HY = (scaling * hexWidth) / Math.sqrt(3)
const dy = HY / 2

// the function where the state will be held, and will decide which of the maps to render
function map (obesityData, hexLocations) {
  const useHex = false
  // 1. construct a button container and a map container
  // YOUR WORK - approx 8 lines

  // 2. create functions drawContents and renderButtons.
  // draw contents will simply call drawMap with appropriate arguments (1 lines)
  // while renderButtons will coditionally added a selected-view view class to the selected button
  // in order to communicate to the user the current state (see main.css)
  // it will also modify the useHex depend on what's been clicked (17 lines)

  // 3. call renderButtons, drawContents, and also insert a tooltip container - 8 lines
}

function drawMap (mapContainer, obesityData, hexLocations, useHex) {
  // 1. create mappings between state name and rate, as well as StateAbbr and StateName
  // in the obesityData and hexLocations respectively
  // YOUR WORK - approx 7 lines

  // 2. create color and emojii scales, make sure to include zeroes as your base!
  // YOUR WORK - approx 6 lines

  // 3. create a selection of hex containers containing g elements that have been translated as approrpiate
  // don't forget to include mouseover interactions, such that when the mouseenter event is called on a state
  // it sets the tooltip as appropriate and when it leaves it un-sets it!
  // YOUR WORK - approx 10 lines

  // 4.  into those g containers append appropriate paths, and text
  // hint the text should very based on whether or not useHex is true or false
  // YOUR WORK - approx 10 lines
}
*/