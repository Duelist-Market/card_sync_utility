import cards from "./cards.json";
import { YgoCardEntry } from "./types/YgoCardEntry";

function createCardsSQL() {
  (cards as any).data.forEach((card: YgoCardEntry) => {
    if (card.type.includes("Monster")) {
      createMonsterCardSQL(card);
    } else if (card.type.includes("Spell")) {
      createSpellCardSQL(card);
    } else {
      createTrapCardSQL(card);
    }
  });
}

function createMonsterCardSQL(card: YgoCardEntry) {
  const id = card.id;
  const name = card.name.replace(/'/g, "''");
  const cardType = "monster";
  const description = card.desc.replace(/'/g, "''");
  const attack = card.atk;
  const defense = card.def;
  const level = card.level;
  const monsterType = card.race.toLocaleLowerCase();
  const attribute = card.attribute.toLocaleLowerCase();
  const { small: smallImageUrl, full: fullImageUrl } = getImageURLs(id);

  const monsterCardSQL = `INSERT INTO card (id, name, card_type, description, attack, defense, level, monster_type, attribute, small_image_url, full_image_url) VALUES (${id}, '${name}', '${cardType}', '${description}', ${attack}, ${defense}, ${level}, '${monsterType}', '${attribute}', '${smallImageUrl}', '${fullImageUrl}');`;

  console.log(monsterCardSQL);

  card.type.split(" ").forEach((type) => {
    if (type !== "Monster") {
      createCardSubtypeSQL(id, type.toLocaleLowerCase());
    }
  });
}

function createCardSubtypeSQL(cardId: number, subtype: string) {
  const cardSubtypeSQL = `INSERT INTO card_subtype (card_id, subtype) VALUES (${cardId}, '${subtype}');`;

  console.log(cardSubtypeSQL);
}

function createSpellCardSQL(card: YgoCardEntry) {
  const id = card.id;
  const name = card.name.replace(/'/g, "''");
  const cardType = "spell";
  const description = card.desc.replace(/'/g, "''");
  const attribute = card.race.toLowerCase();
  const { small: smallImageUrl, full: fullImageUrl } = getImageURLs(id);

  console.log(
    `INSERT INTO card (id, name, card_type, description, attribute, small_image_url, full_image_url) VALUES (${id}, '${name}', '${cardType}', '${description}', '${attribute}', '${smallImageUrl}', '${fullImageUrl}');`
  );
}

function createTrapCardSQL(card: YgoCardEntry) {
  const id = card.id;
  const name = card.name.replace(/'/g, "''");
  const cardType = "trap";
  const description = card.desc.replace(/'/g, "''");
  const attribute = card.race.toLowerCase();
  const { small: smallImageUrl, full: fullImageUrl } = getImageURLs(id);

  console.log(
    `INSERT INTO card (id, name, card_type, description, attribute, small_image_url, full_image_url) VALUES (${id}, '${name}', '${cardType}', '${description}', '${attribute}', '${smallImageUrl}', '${fullImageUrl}');`
  );
}

function getImageURLs(id: number) {
  const small = `https://duelistmarketimages.s3.amazonaws.com/card_images/small/${id}.jpg`;
  const full = `https://duelistmarketimages.s3.amazonaws.com/card_images/full/${id}.jpg`;

  return { small, full };
}

createCardsSQL();
