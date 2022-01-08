/*********************************************************************************


      _             _      _           _
     | | ___  _   _| | ___| |__   ___ | |_
  _  | |/ _ \| | | | |/ _ \ '_ \ / _ \| __|
 | |_| | (_) | |_| | |  __/ |_) | (_) | |_
  \___/ \___/ \__,_|_|\___|_.__/ \___/ \__|        _
 |  ___| __ __ _ _ __ ___   _____      _____  _ __| | __
 | |_ | '__/ _` | '_ ` _ \ / _ \ \ /\ / / _ \| '__| |/ /
 |  _|| | | (_| | | | | | |  __/\ V  V / (_) | |  |   <
 |_|  |_|  \__,_|_| |_| |_|\___| \_/\_/ \___/|_|  |_|\_\

Joulebot Framework by Jason Reiniger

Joulebots are sprites created and managed as an instance
of the JBChar class from this framework to help make
developing sprites easier.

*********************************************************************************/

// Joulebot NPC Type
namespace SpriteKind {
    export const JoulebotKind = SpriteKind.create();
}

// Joulebot class
class JBChar {
    private sprite: Sprite;
    private kind: string;

    // Constructor
    constructor(img: Image, kind: string) {
        this.kind = kind;
        this.sprite = sprites.create(img, SpriteKind.JoulebotKind);
    }

    // Set image
    setImg(newImg: Image) {
        this.sprite.setImage(newImg);
    }
    // Get image
    getImg() {
        return this.sprite.image;
    }
    // Set kind
    setKind(newKind: string) {
        this.kind = newKind;
    }
    // Get kind
    getKind() {
        return this.kind;
    }
    // Get sprite
    getSprite() {
        return this.sprite;
    }
    // Follow advanced
    followAdv(toFollow: Sprite, speedX: number, speedY: number) {
        game.onUpdate(function() {
            const botX = this.sprite.x
            const botY = this.sprite.y
            const tarX = toFollow.x
            const tarY = toFollow.y
            
        })
    }
}

// ========================================================================================================== //



// Joulebot character list class
class JBCharList {
    private charList: Array<JBChar>;

    // Constructor
    constructor() {
        this.charList = [];
    }

    // New Joulebot
    createCharacter(img: Image, kind: string) {
        let newChar = new JBChar(img, kind);
        this.charList.push(newChar);
        return newChar;
    }

    // List of characters
    allCharacters() {
        return this.charList;
    }

    // Find characters of kind
    charactersOfKind(kindToFind: string) {
        let returnList: Array<JBChar> = [];

        this.charList.forEach(function(val) {
            if (val.getKind() == kindToFind) {
                returnList.push(val);
            }
        })

        return returnList;
    }
}