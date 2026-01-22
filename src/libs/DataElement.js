const typeChart = [
  {
    name: "Normal",
    strongAgainst: [],
    weakAgainst: ["Fighting"],
    resists: [],
    noEffectFrom: ["Ghost"]
  },
  {
    name: "Fire",
    strongAgainst: ["Grass", "Ice", "Bug", "Steel"],
    weakAgainst: ["Water", "Ground", "Rock"],
    resists: ["Fire", "Grass", "Ice", "Bug", "Steel", "Fairy"],
    noEffectFrom: []
  },
  {
    name: "Water",
    strongAgainst: ["Fire", "Ground", "Rock"],
    weakAgainst: ["Electric", "Grass"],
    resists: ["Fire", "Water", "Ice", "Steel"],
    noEffectFrom: []
  },
  {
    name: "Electric",
    strongAgainst: ["Water", "Flying"],
    weakAgainst: ["Ground"],
    resists: ["Electric", "Flying", "Steel"],
    noEffectFrom: []
  },
  {
    name: "Grass",
    strongAgainst: ["Water", "Ground", "Rock"],
    weakAgainst: ["Fire", "Ice", "Poison", "Flying", "Bug"],
    resists: ["Water", "Electric", "Grass", "Ground"],
    noEffectFrom: []
  },
  {
    name: "Ice",
    strongAgainst: ["Grass", "Ground", "Flying", "Dragon"],
    weakAgainst: ["Fire", "Fighting", "Rock", "Steel"],
    resists: ["Ice"],
    noEffectFrom: []
  },
  {
    name: "Fighting",
    strongAgainst: ["Normal", "Ice", "Rock", "Dark", "Steel"],
    weakAgainst: ["Flying", "Psychic", "Fairy"],
    resists: ["Bug", "Rock", "Dark"],
    noEffectFrom: []
  },
  {
    name: "Poison",
    strongAgainst: ["Grass", "Fairy"],
    weakAgainst: ["Ground", "Psychic"],
    resists: ["Grass", "Fighting", "Poison", "Bug", "Fairy"],
    noEffectFrom: []
  },
  {
    name: "Ground",
    strongAgainst: ["Fire", "Electric", "Poison", "Rock", "Steel"],
    weakAgainst: ["Water", "Grass", "Ice"],
    resists: ["Poison", "Rock"],
    noEffectFrom: ["Electric"]
  },
  {
    name: "Flying",
    strongAgainst: ["Grass", "Fighting", "Bug"],
    weakAgainst: ["Electric", "Ice", "Rock"],
    resists: ["Grass", "Fighting", "Bug"],
    noEffectFrom: ["Ground"]
  },
  {
    name: "Psychic",
    strongAgainst: ["Fighting", "Poison"],
    weakAgainst: ["Bug", "Ghost", "Dark"],
    resists: ["Fighting", "Psychic"],
    noEffectFrom: []
  },
  {
    name: "Bug",
    strongAgainst: ["Grass", "Psychic", "Dark"],
    weakAgainst: ["Fire", "Flying", "Rock"],
    resists: ["Grass", "Fighting", "Ground"],
    noEffectFrom: []
  },
  {
    name: "Rock",
    strongAgainst: ["Fire", "Ice", "Flying", "Bug"],
    weakAgainst: ["Water", "Grass", "Fighting", "Ground", "Steel"],
    resists: ["Normal", "Fire", "Poison", "Flying"],
    noEffectFrom: []
  },
  {
    name: "Ghost",
    strongAgainst: ["Psychic", "Ghost"],
    weakAgainst: ["Ghost", "Dark"],
    resists: ["Poison", "Bug"],
    noEffectFrom: ["Normal", "Fighting"]
  },
  {
    name: "Dragon",
    strongAgainst: ["Dragon"],
    weakAgainst: ["Ice", "Dragon", "Fairy"],
    resists: ["Fire", "Water", "Electric", "Grass"],
    noEffectFrom: []
  },
  {
    name: "Dark",
    strongAgainst: ["Psychic", "Ghost"],
    weakAgainst: ["Fighting", "Bug", "Fairy"],
    resists: ["Ghost", "Dark"],
    noEffectFrom: ["Psychic"]
  },
  {
    name: "Steel",
    strongAgainst: ["Ice", "Rock", "Fairy"],
    weakAgainst: ["Fire", "Fighting", "Ground"],
    resists: ["Normal", "Grass", "Ice", "Flying", "Psychic", "Bug", "Rock", "Dragon", "Steel", "Fairy"],
    noEffectFrom: ["Poison"]
  },
  {
    name: "Fairy",
    strongAgainst: ["Fighting", "Dragon", "Dark"],
    weakAgainst: ["Poison", "Steel"],
    resists: ["Fighting", "Bug", "Dark"],
    noEffectFrom: ["Dragon"]
  }
];

export default typeChart;
