import flower from './Item_Thunderbird\'s_Mercy.png'
import plume from './Item_Survivor_of_Catastrophe.png'
import sands from './Item_Hourglass_of_Thunder.png'
import goblet from './Item_Omen_of_Thunderstorm.png'
import circlet from './Item_Thunder_Summoner\'s_Crown.png'
let artifact = {
  name: "Thundering Fury", rarity: [4, 5], pieces: {
    flower: "Thunderbird's Mercy",
    plume: "Survivor of Catastrophe",
    sands: "Hourglass of Thunder",
    goblet: "Omen of Thunderstorm",
    circlet: "Thunder Summoner's Crown"
  },
  icons: {
    flower,
    plume,
    sands,
    goblet,
    circlet
  },
  sets: {
    2: {
      text: "Electro DMG Bonus +15%",
      stats: { electro_ele_dmg: 15 }
    },
    4: {
      text: "Increases damage caused by Overloaded, Electro-Charged, and Superconduct DMG by 40%. Triggering such effects decreases Elemental Skill CD by 1s. Can only occur once every 0.8s.",
      stats: {}
    }
  }
}
export default artifact