// Jumping
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (plrSprite.isHittingTile(CollisionDirection.Bottom)) {
        plrSprite.vy = -100
    }
})
// Set the scene
scene.setBackgroundImage(assets.image`devbackground`)
tiles.setTilemap(tilemap`level1`)

let lbList = new LBCharList();
let plrBot = lbList.createCharacter(assets.image`plrStickfigure`, "Player");
let plrSprite = plrBot.getSprite();
// Player properties
plrSprite.ay = 300
scene.cameraFollowSprite(plrSprite)
// Movement
// Walking
controller.player1.moveSprite(plrSprite, 50, 0)
// Spawn player
tiles.placeOnRandomTile(plrSprite, assets.tile`spawnTile`)