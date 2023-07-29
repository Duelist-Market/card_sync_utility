CREATE TABLE card_type(
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (name)
);

INSERT INTO card_type(name) VALUES ('monster');
INSERT INTO card_type(name) VALUES ('spell');
INSERT INTO card_type(name) VALUES ('trap');

CREATE TABLE sub_type(
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (name)
);


/* Monster Sub Types */
INSERT INTO subtype(name) VALUES ('normal');
INSERT INTO subtype(name) VALUES ('effect');
INSERT INTO subtype(name) VALUES ('flip');
INSERT INTO subtype(name) VALUES ('fusion');
INSERT INTO subtype(name) VALUES ('toon');
INSERT INTO subtype(name) VALUES ('tuner');
INSERT INTO subtype(name) VALUES ('union');
INSERT INTO subtype(name) VALUES ('gemini');
INSERT INTO subtype(name) VALUES ('spirit');
INSERT INTO subtype(name) VALUES ('ritual');
INSERT INTO subtype(name) VALUES ('synchro');
INSERT INTO subtype(name) VALUES ('xyz');
INSERT INTO subtype(name) VALUES ('pendulum');
INSERT INTO subtype(name) VALUES ('link');


CREATE TABLE monster_type(
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (name)
);

INSERT INTO monster_type (name) VALUES ('aqua');
INSERT INTO monster_type (name) VALUES ('beast');
insert into monster_type (name) values ('beast-warrior');
insert into monster_type (name) values ('cyberse');
insert into monster_type (name) values ('creator-god');
insert into monster_type (name) values ('dinosaur');
insert into monster_type (name) values ('divine-beast');
insert into monster_type (name) values ('dragon');
INSERT INTO monster_type (name) VALUES ('fairy');
INSERT INTO monster_type (name) VALUES ('fiend');
INSERT INTO monster_type (name) VALUES ('fish');
INSERT INTO monster_type (name) VALUES ('insect');
INSERT INTO monster_type (name) VALUES ('machine');
INSERT INTO monster_type (name) VALUES ('plant');
INSERT INTO monster_type (name) VALUES ('psychic');
INSERT INTO monster_type (name) VALUES ('pyro');
INSERT INTO monster_type (name) VALUES ('reptile');
INSERT INTO monster_type (name) VALUES ('rock');
INSERT INTO monster_type (name) VALUES ('sea serpent');
INSERT INTO monster_type (name) VALUES ('spellcaster');
INSERT INTO monster_type (name) VALUES ('thunder');
INSERT INTO monster_type (name) VALUES ('warrior');
INSERT INTO monster_type (name) VALUES ('winged beast');
INSERT INTO monster_type (name) VALUES ('wyrm');
INSERT INTO monster_type (name) VALUES ('zombie');

CREATE TABLE attribute(
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (name)
);

INSERT INTO attribute (name) VALUES ('dark');
INSERT INTO attribute (name) VALUES ('divine');
INSERT INTO attribute (name) VALUES ('earth');
INSERT INTO attribute (name) VALUES ('fire');
INSERT INTO attribute (name) VALUES ('light');
INSERT INTO attribute (name) VALUES ('water');
INSERT INTO attribute (name) VALUES ('wind');

/* Spell and Trap Cards */
INSERT INTO attribute(name) VALUES ('continuous');
INSERT INTO attribute(name) VALUES ('equip');
INSERT INTO attribute(name) VALUES ('field');
INSERT INTO attribute(name) VALUES ('quick-play');
INSERT INTO attribute(name) VALUES ('counter');




CREATE TABLE card(
    id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    card_type VARCHAR(50) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    attack INT,
    defense INT,
    level INT,
    monster_type VARCHAR(50),
    attribute VARCHAR(50) NOT NULL,
    full_image_url VARCHAR(255) NOT NULL,
    small_image_url VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (name),
    FOREIGN KEY (card_type) REFERENCES card_type(name),
    FOREIGN KEY (monster_type) REFERENCES monster_type(name),
    FOREIGN KEY (attribute) REFERENCES attribute(name)
);

CREATE TABLE card_sub_type(
    card_id INT NOT NULL,
    sub_type VARCHAR(50) NOT NULL,
    PRIMARY KEY (card_id, sub_type),
    FOREIGN KEY (card_id) REFERENCES card(id),
    FOREIGN KEY (subtype) REFERENCES subtype(name)
);