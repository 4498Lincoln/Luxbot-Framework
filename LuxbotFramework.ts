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



Luxbot Framework by 4498Lincoln and JR-465856

Luxbots are sprites created and managed as an instance
of the LBChar class from this framework to help make
developing sprites easier.

*********************************************************************************/

// Luxbot NPC Type
namespace SpriteKind {
    export const LuxbotKind = SpriteKind.create()
}

// Luxbot class
class LBChar {
    // VARIABLES //
    private sprite: Sprite
    private kind: string
    private oldPosX: number
    private oldPosY: number
    private curPosX: number
    private curPosY: number
    private posRecordInterval: number
    private posRecordJumpUse: boolean

    private doFollowAdv: boolean

    ///////////////

    // Constructor
    constructor(img: Image, kind: string) {
        this.kind = kind
        this.sprite = sprites.create(img, SpriteKind.LuxbotKind)

        this.doFollowAdv = false

        this.oldPosX = this.sprite.x
        this.oldPosY = this.sprite.y
        this.curPosX = this.sprite.x
        this.curPosY = this.sprite.y
        this.posRecordInterval = 1000
        this.posRecordJumpUse = false

        control.runInParallel(function() {
            do {
                this.oldPosX = this.curPosX
                this.oldPosY = this.curPosY
                this.curPosX = this.sprite.x
                this.curPosY = this.sprite.y
                console.log(
                    this.oldPosX + " " + this.oldPosY + ", " +
                    this.curPosX + " " + this.curPosY
                )
                this.posRecordJumpUse = false
                pause(this.posRecordInterval)
            } while (true)
        })
    }

    // Set position record interval
    setPosRecordInterval(newInterval: number) {
        this.posRecordInterval = newInterval
    }
    // Get position record interval
    getPosRecordInterval() {
        return this.posRecordInterval
    }

    // Set image
    setImg(newImg: Image) {
        this.sprite.setImage(newImg)
    }
    // Get image
    getImg() {
        return this.sprite.image
    }
    // Set kind
    setKind(newKind: string) {
        this.kind = newKind
    }
    // Get kind
    getKind() {
        return this.kind
    }
    // Get sprite
    getSprite() {
        return this.sprite
    }
    // Follow advanced
    followAdv(params: {
            target: Sprite,
            interval: number,
            speedX: number,
            speedY: number,
            jump: {
                doJump: boolean,
                jumpVel: number,
                jumpStationary: boolean,
                jumpWall: boolean
            }
    }) {
        this.doFollowAdv = true
        control.runInParallel(function() {
            do {
                // Positions of bot and target
                const botX = this.sprite.x
                const botY = this.sprite.y
                const tarX = params.target.x
                const tarY = params.target.y

                // Calculate desired velocity
                const xVelNew = params.speedX * Math.sign(tarX - botX)
                const yVelNew = params.speedY * Math.sign(tarY - botY)

                // Set velocity of enemy
                if (params.speedX != 0) this.sprite.vx = xVelNew
                if (params.speedY != 0) this.sprite.vy = yVelNew

                // Jump
                if (params.jump.doJump) {
                    let jumped = false

                    // Jump on touched wall
                    if (!jumped) if (params.jump.jumpWall) {
                        if (this.sprite.isHittingTile(CollisionDirection.Left) || this.sprite.isHittingTile(CollisionDirection.Right)) {
                            if (this.sprite.isHittingTile(CollisionDirection.Bottom)) {
                                this.sprite.vy = params.jump.jumpVel
                                jumped = true
                            }
                        }
                    }
                    // Jump on velocity zero
                    if (!jumped) if (params.jump.jumpStationary && !this.posRecordJumpUse) {
                        if ((this.curPosX - this.oldPosX) == 0) {
                            this.sprite.vy = params.jump.jumpVel
                            this.posRecordJumpUse = true
                            jumped = true
                        }
                    }
                }

                pause(params.interval)
            } while (this.doFollowAdv)
        })
    }
    // Cancel follow advanced
    undoFollowAdv() {
        this.doFollowAdv = false
    }
    // Doing follow advanced
    doingFollowAdv() {
        return this.doFollowAdv
    }
    
    // Get tilemap position
    getTilePos() {
        return tiles.getTileLocation(Math.floor(this.sprite.x/16), Math.floor(this.sprite.y/16))
    }
}

// ========================================================================================================== //



// Joulebot character list class
class LBCharList {
    private charList: Array<LBChar>

    // Constructor
    constructor() {
        this.charList = []
    }

    // New Luxbot
    createCharacter(img: Image, kind: string) {
        let newChar = new LBChar(img, kind)
        this.charList.push(newChar)
        return newChar
    }

    // List of characters
    allCharacters() {
        return this.charList
    }

    // Find characters of kind
    charactersOfKind(kindToFind: string) {
        let returnList: Array<LBChar> = []

        this.charList.forEach(function (val) {
            if (val.getKind() == kindToFind) {
                returnList.push(val)
            }
        })

        return returnList
    }
}
