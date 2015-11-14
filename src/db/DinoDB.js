// Got dino stats from here: http://battlecalculator.com/jurassic-world-creature-statistics/

var advantages = {
    CARNIVORE: {
        HERBIVORE: 1.5,
        AMPHIBIAN: 0.5
    },
    HERBIVORE: {
        CARNIVORE: 0.5,
        PTEROSAUR: 1.5,
    },
    PTEROSAUR: {
        HERBIVORE: 0.5,
        AMPHIBIAN: 1.5
    },
    AMPHIBIAN: {
        PTEROSAUR: 0.5,
        CARNIVORE: 1.5
    }
};

var DinoType = {
    CARNIVORE: "CARNIVORE",
    HERBIVORE: "HERBIVORE",
    PTEROSAUR: "PTEROSAUR",
    AMPHIBIAN: "AMPHIBIAN"

};

module.exports = {
    dinosByCost: function() {
        var all = this.dinoNames().map(function(name) {
            var dino = this.dinos[name];
            dino.name = name;
            return dino;
        }.bind(this));
        all.sort(function(a, b) {
            return a.cost - b.cost;
        });
        return all;
    },
    dinosByPower: function() {
        var all = this.dinoNames().map(function(name) {
            var dino = this.dinos[name];
            dino.name = name;
            return dino;
        }.bind(this));
        all.sort(function(a, b) {
            return (a.attack + a.health) - (b.attack + b.health);
        });
        return all;
    },
    values: function(name, level) {
        var dino = JSON.parse(JSON.stringify(this.dinos[name]));
        var multiplier = (level / 40);
        dino.health *= multiplier;
        dino.attack *= multiplier;
        dino.revenue *= multiplier;
        return dino;
    },
    dinos: {
        Diplocaulus: {
            type: DinoType.AMPHIBIAN,
            imgUrl: "/img/dino.png",
            health: 284,
            attack: 73,
            revenue: 238,
            cost: 190
        },
        Ichtyostega: {
            type: DinoType.AMPHIBIAN,
            imgUrl: "/img/dino.png",
            health: 1493,
            attack: 570,
            revenue: 1432,
            cost: 3330
        },
        Koolasaurus: {
            type: DinoType.AMPHIBIAN,
            imgUrl: "/img/dino.png",
            health: 4386,
            attack: 1675,
            revenue: 4591,
            cost: 20500,
        },
        Koolasuchus: {
            type: DinoType.AMPHIBIAN,
            imgUrl: "/img/dino.png",
            health: 467,
            attack: 146,
            revenue: 749,
            cost: 610
        },
        Labyrinthodontia: {
            type: DinoType.AMPHIBIAN,
            imgUrl: "/img/dino.png",
            health: 236,
            attack: 90,
            revenue: 353,
            cost: 130
        },
        Limnoscelis: {
            type: DinoType.AMPHIBIAN,
            imgUrl: "/img/dino.png",
            health: 266,
            attack: 68,
            revenue: 307,
            cost: 130
        },
        Metriorhynchus: {
            type: DinoType.AMPHIBIAN,
            imgUrl: "/img/dino.png",
            health: 793,
            attack: 303,
            revenue: 1290,
            cost: 1400
        },
        Microposaurus: {
            type: DinoType.AMPHIBIAN,
            imgUrl: "/img/dino.png",
            health: 1570,
            attack: 491,
            revenue: 1536,
            cost: 2500
        },
        Prionosuchus: {
            type: DinoType.AMPHIBIAN,
            imgUrl: "/img/dino.png",
            health: 1616,
            attack: 505,
            revenue: 2132,
            cost: 3470
        },
        Sarcosuchus: {
            type: DinoType.AMPHIBIAN,
            imgUrl: "/img/dino.png",
            health: 1500,
            attack: 573,
            revenue: 1873,
            cost: 3050
        },
        Allosaurus: {
            type: DinoType.CARNIVORE,
            imgUrl: "/img/carnivore.jpg",
            health: 440,
            attack: 138,
            revenue: 614,
            cost: 500
        },
        Carnoraptor: {
            type: DinoType.CARNIVORE,
            imgUrl: "/img/carnivore.jpg",
            health: 1665,
            attack: 636,
            revenue: 4206,
            cost: 7730
        },
        Carnotaurus: {
            type: DinoType.CARNIVORE,
            imgUrl: "/img/carnivore.jpg",
            health: 419,
            attack: 160,
            revenue: 911,
            cost: 730
        },
        Dilophosaurus: {
            type: DinoType.CARNIVORE,
            imgUrl: "/img/carnivore.jpg",
            health: 396,
            attack: 151,
            revenue: 3179,
            cost: 690
        },
        Dimetrodon: {
            type: DinoType.CARNIVORE,
            imgUrl: "/img/carnivore.jpg",
            health: 1520,
            attack: 581,
            revenue: 1109,
            cost: 3610
        },
        Gigantosaurus: {
            type: DinoType.CARNIVORE,
            imgUrl: "/img/carnivore.jpg",
            health: 476,
            attack: 122,
            revenue: 632,
            cost: 520
        },
        Guanlong: {
            type: DinoType.CARNIVORE,
            imgUrl: "/img/carnivore.jpg",
            health: 255,
            attack: 80,
            revenue: 257,
            cost: 170
        },
        Indominus_Rex: {
            type: DinoType.CARNIVORE,
            imgUrl: "/img/carnivore.jpg",
            health: 5430,
            attack: 2074,
            revenue: 2822,
            cost: 29400
        },
        Irritator: {
            type: DinoType.CARNIVORE,
            imgUrl: "/img/carnivore.jpg",
            health: 400,
            attack: 153,
            revenue: 651,
            cost: 530
        },
        Majungasaurus: {
            type: DinoType.CARNIVORE,
            imgUrl: "/img/carnivore.jpg",
            health: 224,
            attack: 86,
            revenue: 307,
            cost: 110
        },
        Monolophosaurus: {
            type: DinoType.CARNIVORE,
            imgUrl: "/img/carnivore.jpg",
            health: 689,
            attack: 215,
            revenue: 633,
            cost: 860
        },
        Ophiacodon: {
            type: DinoType.CARNIVORE,
            imgUrl: "/img/carnivore.jpg",
            health: 379,
            attack: 277,
            revenue: 418,
            cost: 780
        },
        Ostafrikasaurus: {
            type: DinoType.CARNIVORE,
            imgUrl: "/img/carnivore.jpg",
            health: 1410,
            attack: 539,
            revenue: 1959,
            cost: 3190
        },
        Pyroraptor: {
            type: DinoType.CARNIVORE,
            imgUrl: "/img/carnivore.jpg",
            health: 448,
            attack: 171,
            revenue: 798,
            cost: 660
        },
        Rajasaurus: {
            type: DinoType.CARNIVORE,
            imgUrl: "/img/carnivore.jpg",
            health: 881,
            attack: 276,
            revenue: 1198,
            cost: 1300
        },
        Spinoraptor: {
            type: DinoType.CARNIVORE,
            imgUrl: "/img/carnivore.jpg",
            health: 2715,
            attack: 1037,
            revenue: 3225,
            cost: 9520
        },
        Spinosaurus: {
            type: DinoType.CARNIVORE,
            imgUrl: "/img/carnivore.jpg",
            health: 978,
            attack: 250,
            revenue: 1382,
            cost: 1500
        },
        Suchomimus: {
            type: DinoType.CARNIVORE,
            imgUrl: "/img/carnivore.jpg",
            health: 1614,
            attack: 413,
            revenue: 1615,
            cost: 2630
        },
        Tyrannosaurus_Rex: {
            type: DinoType.CARNIVORE,
            imgUrl: "/img/carnivore.jpg",
            health: 1603,
            attack: 612,
            revenue: 1224,
            cost: 3750
        },
        Tyrannotitan: {
            type: DinoType.CARNIVORE,
            imgUrl: "/img/carnivore.jpg",
            health: 408,
            attack: 156,
            revenue: 1499,
            cost: 710
        },
        Utahraptor: {
            type: DinoType.CARNIVORE,
            imgUrl: "/img/carnivore.jpg",
            health: 259,
            attack: 99,
            revenue: 63,
            cost: 200
        },
        Velociraptor: {
            type: DinoType.CARNIVORE,
            imgUrl: "/img/carnivore.jpg",
            health: 800,
            attack: 306,
            revenue: 1900,
            cost: 1500
        },
        Ankylodocus: {
            type: DinoType.HERBIVORE,
            imgUrl: "/img/dino.png",
            health: 3218,
            attack: 1005,
            revenue: 1235,
            cost: 10920
        },
        Ankylosaurus: {
            type: DinoType.HERBIVORE,
            imgUrl: "/img/dino.png",
            health: 1011,
            attack: 259,
            revenue: 1520,
            cost: 1200
        },
        Argentinosaurus: {
            type: DinoType.HERBIVORE,
            imgUrl: "/img/dino.png",
            health: 281,
            attack: 72,
            revenue: 1497,
            cost: 160
        },
        Bonitasaura: {
            type: DinoType.HERBIVORE,
            imgUrl: "/img/dino.png",
            health: 263,
            attack: 67,
            revenue: 190,
            cost: 150
        },
        Corythosaurus: {
            type: DinoType.HERBIVORE,
            imgUrl: "/img/dino.png",
            health: 531,
            attack: 136,
            revenue: 310,
            cost: 630
        },
        Diplodocus: {
            type: DinoType.HERBIVORE,
            imgUrl: "/img/dino.png",
            health: 527,
            attack: 135,
            revenue: 936,
            cost: 750
        },
        Euoplocephalus: {
            type: DinoType.HERBIVORE,
            imgUrl: "/img/dino.png",
            health: 969,
            attack: 248,
            revenue: 320,
            cost: 1000
        },
        Gallimimus: {
            type: DinoType.HERBIVORE,
            imgUrl: "/img/dino.png",
            health: 396,
            attack: 151,
            revenue: 494,
            cost: 580
        },
        Giganocephalus: {
            type: DinoType.HERBIVORE,
            imgUrl: "/img/dino.png",
            health: 2091,
            attack: 436,
            revenue: 2720,
            cost: 8490
        },
        Nasutoceratops: {
            type: DinoType.HERBIVORE,
            imgUrl: "/img/dino.png",
            health: 489,
            attack: 125,
            revenue: 669,
            cost: 550
        },
        Pachycephalosaurus: {
            type: DinoType.HERBIVORE,
            imgUrl: "/img/dino.png",
            health: 452,
            attack: 141,
            revenue: 725,
            cost: 590
        },
        Pachyceratops: {
            type: DinoType.HERBIVORE,
            imgUrl: "/img/dino.png",
            health: 1785,
            attack: 456,
            revenue: 122,
            cost: 6360
        },
        Parasaurolophus: {
            type: DinoType.HERBIVORE,
            imgUrl: "/img/dino.png",
            health: 881,
            attack: 275,
            revenue: 1105,
            cost: 1200
        },
        Pelecanimimus: {
            type: DinoType.HERBIVORE,
            imgUrl: "/img/dino.png",
            health: 266,
            attack: 83,
            revenue: 427,
            cost: 170
        },
        Shunosaurus: {
            type: DinoType.HERBIVORE,
            imgUrl: "/img/dino.png",
            health: 1695,
            attack: 530,
            revenue: 1237,
            cost: 3100
        },
        Stegoceratops: {
            type: DinoType.HERBIVORE,
            imgUrl: "/img/dino.png",
            health: 3134,
            attack: 801,
            revenue: 2956,
            cost: 8960
        },
        Stegosaurus: {
            type: DinoType.HERBIVORE,
            imgUrl: "/img/dino.png",
            health: 982,
            attack: 251,
            revenue: 1382,
            cost: 1500
        },
        Supersaurus: {
            type: DinoType.HERBIVORE,
            imgUrl: "/img/dino.png",
            health: 969,
            attack: 248,
            revenue: 1290,
            cost: 1400
        },
        Therizinosaurus: {
            type: DinoType.HERBIVORE,
            imgUrl: "/img/dino.png",
            health: 2427,
            attack: 325,
            revenue: 870,
            cost: 3000
        },
        Triceratops: {
            type: DinoType.HERBIVORE,
            imgUrl: "/img/dino.png",
            health: 274,
            attack: 70,
            revenue: 1536,
            cost: 100
        },
        Tuojiangosaurus: {
            type: DinoType.HERBIVORE,
            imgUrl: "/img/dino.png",
            health: 235,
            attack: 73,
            revenue: 290,
            cost: 130
        },
        Unaysaurus: {
            type: DinoType.HERBIVORE,
            imgUrl: "/img/dino.png",
            health: 1757,
            attack: 449,
            revenue: 2340,
            cost: 2770
        },
        Alanqa: {
            type: DinoType.PTEROSAUR,
            imgUrl: "/img/dino.png",
            health: 217,
            attack: 83,
            revenue: 768,
            cost: 120
        },
        Coloborhynchus: {
            type: DinoType.PTEROSAUR,
            imgUrl: "/img/dino.png",
            health: 238,
            attack: 91,
            revenue: 1450,
            cost: 140
        },
        Dimorphodon: {
            type: DinoType.PTEROSAUR,
            imgUrl: "/img/dino.png",
            health: 1569,
            attack: 599,
            revenue: 826,
            cost: 3600
        },
        Dsungaripterus: {
            type: DinoType.PTEROSAUR,
            imgUrl: "/img/dino.png",
            health: 386,
            attack: 148,
            revenue: 3096,
            cost: 560
        },
        Hatzegopteryx: {
            type: DinoType.PTEROSAUR,
            imgUrl: "/img/dino.png",
            health: 253,
            attack: 97,
            revenue: 1129,
            cost: 200
        },
        Pteranodon: {
            type: DinoType.PTEROSAUR,
            imgUrl: "/img/dino.png",
            health: 1520,
            attack: 581,
            revenue: 1787,
            cost: 2910
        },
        Quetzalcoatlus: {
            type: DinoType.PTEROSAUR,
            imgUrl: "/img/dino.png",
            health: 891,
            attack: 278,
            revenue: 1244,
            cost: 1350
        },
        Tapejara: {
            type: DinoType.PTEROSAUR,
            imgUrl: "/img/dino.png",
            health: 428,
            attack: 134,
            revenue: 1029,
            cost: 670
        },
        Tropeognathus: {
            type: DinoType.PTEROSAUR,
            imgUrl: "/img/dino.png",
            health: 260,
            attack: 81,
            revenue: 261,
            cost: 180
        },
        Tropeogopterus: {
            type: DinoType.PTEROSAUR,
            imgUrl: "/img/dino.png",
            health: 2492,
            attack: 952,
            revenue: 1557,
            cost: 7130
        },
        Zhejiangopterus: {
            type: DinoType.PTEROSAUR,
            imgUrl: "/img/dino.png",
            health: 793,
            attack: 303,
            revenue: 1393,
            cost: 1100
        }
    },
    dinoNames: function() {
        var names = [];
        for (var k in this.dinos) {
            if (this.dinos.hasOwnProperty(k)) {
                names.push(k);
            }
        }
        return names;
    },
    randomOpponent: function() {
        var names = this.dinoNames();
        return names[Math.floor(Math.random()*names.length)];
    },
    // Determine the attack multiplier that the first has over the second.
    // Example:
    //      advantage(CARNIVORE, HERBIVORE) => 1.5
    //      advantage(CARNIVORE, PTEROSAUR) => 1.0
    //      advantage(CARNIVORE, AMPHIBIAN) => 0.5
    attackMultiplier: function(first, second) {
        return advantages[first][second] || 1;
    }
};
