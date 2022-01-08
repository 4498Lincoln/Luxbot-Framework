/*********************************************************************************


  _               _           _
 | |   _   ___  _| |__   ___ | |_
 | |  | | | \ \/ / '_ \ / _ \| __|
 | |__| |_| |>  <| |_) | (_) | |_
 |_____\__,_/_/\_\_.__/ \___/ \__|                 _
 |  ___| __ __ _ _ __ ___   _____      _____  _ __| | __
 | |_ | '__/ _` | '_ ` _ \ / _ \ \ /\ / / _ \| '__| |/ /
 |  _|| | | (_| | | | | | |  __/\ V  V / (_) | |  |   <
 |_|  |_|  \__,_|_| |_| |_|\___| \_/\_/ \___/|_|  |_|\_\



Luxbot Framework by Jason Reiniger

Luxbots are sprites created and managed as an instance
of the LBChar class from this framework to help make
developing sprites easier.

*********************************************************************************/

// Luxbot NPC Type
namespace SpriteKind {
    export const LuxbotKind = SpriteKind.create();
}

// Luxbot class
class LBChar {
    private sprite: Sprite;
    private kind: string;

    // Constructor
    constructor(img: Image, kind: string) {
        this.kind = kind;
        this.sprite = sprites.create(img, SpriteKind.LuxbotKind);
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
        game.onUpdate(function () {
            const botX = this.sprite.x
            const botY = this.sprite.y
            const tarX = toFollow.x
            const tarY = toFollow.y

        })
    }
}

// ========================================================================================================== //



// Joulebot character list class
class LBCharList {
    private charList: Array<LBChar>;

    // Constructor
    constructor() {
        this.charList = [];
    }

    // New Luxbot
    createCharacter(img: Image, kind: string) {
        let newChar = new LBChar(img, kind);
        this.charList.push(newChar);
        return newChar;
    }

    // List of characters
    allCharacters() {
        return this.charList;
    }

    // Find characters of kind
    charactersOfKind(kindToFind: string) {
        let returnList: Array<LBChar> = [];

        this.charList.forEach(function (val) {
            if (val.getKind() == kindToFind) {
                returnList.push(val);
            }
        })

        return returnList;
    }
}