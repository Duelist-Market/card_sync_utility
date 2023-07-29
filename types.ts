const ygoTypes = [
  "Normal Monster",
  "Normal Tuner Monster",
  "Effect Monster",
  "Tuner Monster",
  "Flip Monster",
  "Flip Effect Monster",
  "Flip Tuner Effect Monster",
  "Spirit Monster",
  "Union Effect Monster",
  "Gemini Monster",
  "Pendulum Effect Monster",
  "Pendulum Normal Monster",
  "Pendulum Tuner Effect Monster",
  "Ritual Monster",
  "Ritual Effect Monster",
  "Toon Monster",
  "Fusion Monster",
  "Synchro Monster",
  "Synchro Tuner Monster",
  "Synchro Pendulum Effect Monster",
  "XYZ Monster",
  "XYZ Pendulum Effect Monster",
  "Link Monster",
  "Pendulum Flip Effect Monster",
  "Pendulum Effect Fusion Monster",
];

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

const types = ygoTypes
  .map((type) => type.split(" "))
  .flat()
  .filter(onlyUnique)
  .map((type) => `INSERT INTO sub_type (name) VALUE ('${type}');`);

console.log(types);
