enum ActionKind {
    Walking,
    Idle,
    Jumping,
    jewel,
    rock
}
namespace SpriteKind {
    export const jewel = SpriteKind.create()
}
function spawn_rocks () {
    mySprite2 = sprites.create(img`
        e e e . . . . e e e . . . . 
        c d d c . . c d d c . . . . 
        c b d d f f d d b c . . . . 
        c 3 b d d b d b 3 c . . . . 
        f b 3 d d d d 3 b f . . . . 
        e d d d d d d d d e . . . . 
        e d f d d d d f d e . b f b 
        f d d f d d f d d f . f d f 
        f b d d b b d d 2 f . f d f 
        . f 2 2 2 2 2 2 b b f f d f 
        . f b d d d d d d b b d b f 
        . f d d d d d b d d f f f . 
        . f d f f f d f f d f . . . 
        . f f . . f f . . f f . . . 
        `, SpriteKind.Enemy)
    mySprite2.setPosition(40, 5)
    mySprite2.ay = 200
}
function spawn_jewels () {
    for (let value of scene.getTilesByType(9)) {
        jewel2 = sprites.create(img`
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 f f f f f f f f f f f f f f 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 f f f f f f f f f f f f f f 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 f f f f f f f f f f f f f f 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 f f f f f f f f f f f f f f 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 f f f f f f f f f f f f f f 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 f f f f f f f f f f f f f f 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 f f f f f f f f f f f f f f 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            `, SpriteKind.jewel)
        value.place(jewel2)
    }
}
function spawn_player () {
    mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f f f f . . . 
        . . . f e e e e e e e e e f . . 
        . . f e e e e e e e e e e f . . 
        . . f e e e d d d e d d e f . . 
        . . f e e d 1 d d d d 1 d f . . 
        . f f e d d f d d d d f d f . . 
        f e f d d d d d d d d d d f . . 
        f e f d d d d d d d d d d f . . 
        . f f d d d d d d f d d f f . . 
        f e 1 f d d d d d d d f 1 f . . 
        . f d f f f f f f f f f d f . . 
        . . f f 1 1 1 1 1 1 1 f f . . . 
        . . . f e e e f e e e f . . . . 
        . . f e e e e f e e e e f . . . 
        . . . f f f f . f f f f . . . . 
        `, SpriteKind.Player)
    mySprite.setPosition(30, 230)
    scene.cameraFollowSprite(mySprite)
    controller.moveSprite(mySprite, 100, 0)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    mySprite.destroy()
    mySprite2.destroy()
    mysprite3.destroy()
    otherSprite.destroy()
    mySprite.startEffect(effects.disintegrate)
    releaserock = 0
    info.changeLifeBy(-1)
    music.powerDown.play()
    pause(2000)
    spawn_player()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.jewel, function (sprite, otherSprite) {
    music.playTone(659, music.beat(BeatFraction.Eighth))
    music.playTone(784, music.beat(BeatFraction.Quarter))
    jewelnum += 1
    otherSprite.destroy(effects.trail, 100)
    otherSprite.y += -3
})
function new_level () {
    mySprite2.destroy()
    mysprite3.destroy()
    levelnum += 1
    effects.confetti.endScreenEffect()
    if (levelnum == 2) {
        speed = 6000
        scene.setTileMap(img`
            1 5 6 5 5 5 5 5 5 5 5 5 6 5 5 1 
            2 b b b b b b b b b b b b b b 7 
            2 9 b b b b b b 9 b b b b b 9 7 
            2 4 4 4 b b 4 4 4 4 b b 4 4 4 7 
            2 b b b b b b b b b b b b b b 7 
            2 b b b b b b b b 9 b b b b b 7 
            2 b b 4 4 4 b b 4 4 4 4 4 b b 7 
            2 b b b b b b b b b b b b b b 7 
            2 9 b b b b b b 9 b b b b b 9 7 
            2 4 4 4 b b 4 4 4 4 4 4 b b 4 7 
            2 b b b b b b b b b b b b b b 7 
            f b b b b b b b b b b b b b b f 
            2 4 4 4 4 4 4 b b 4 4 4 4 4 4 7 
            2 b b b b b b b b b b b b b b 7 
            2 b b b b b b 9 b b 3 b b b b 7 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
            `)
    }
    if (levelnum == 3) {
        speed = 5000
        scene.setTileMap(img`
            1 5 6 5 5 5 5 5 5 5 5 5 6 5 5 1 
            2 b b b b b b b b b b b b b b 7 
            2 b b 9 b b b b b b b b 9 b b 7 
            2 4 4 4 b b b b b b b b 4 4 4 7 
            2 b b 4 b b b 9 3 b b b 4 b b 7 
            2 b b 4 b b 4 4 4 4 b b 4 b b 7 
            2 b 9 4 b b b b b b b b 4 9 b 7 
            2 b 4 b b b b b b b b b b 4 b 7 
            2 b b b b 4 b b b b 4 b b b b 7 
            2 b b b b b b b 9 b b b b b b 7 
            2 4 b b b b b 4 4 b b b b b 4 7 
            2 b b 9 b b b b b b b b 9 b b 7 
            2 b b 4 b b 4 b b 4 b b 4 b b 7 
            2 b b b b b b b b b b b b b b 7 
            f b b b b b b b b b b b b b b f 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
            `)
    }
    if (levelnum == 4) {
        speed = 4000
        scene.setTileMap(img`
            1 5 6 5 5 5 5 5 5 5 5 5 6 5 5 1 
            2 b b b b b b b b b b b b b b 7 
            2 9 b b b b b b b b b b b b 9 7 
            2 4 b b b b b 9 3 b b b b b 4 7 
            2 b 4 b b b b 4 4 b b b b 4 b 7 
            2 b b 4 b b b b b b b b 4 b b 7 
            2 b b b 4 b b b b b b 4 b b b 7 
            2 b b b b 4 b b b b 4 b b b b 7 
            2 9 b b b b b b b b b b b b 9 7 
            2 4 b b b b b b b b b b b b 4 7 
            2 b b b b b b 9 9 b b b b b b 7 
            2 b b b b 4 4 4 4 4 4 b b b b 7 
            2 b b 4 4 b b b b b b 4 4 b b 7 
            2 b b b b b b b b b b b b b b 7 
            f b b b b b b b 9 b b b b b b f 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
            `)
    }
    if (levelnum == 5) {
        speed = 4000
        scene.setTileMap(img`
            1 5 6 5 5 5 5 5 5 5 5 5 6 5 5 1 
            2 b b b b b b b b b b b b b b 7 
            2 b b b b b b b b b b b b b b 7 
            2 b 4 4 4 4 4 9 b 4 4 4 4 4 b 7 
            2 b b b b b 4 b b 4 b b b b b 7 
            2 9 b b b b 4 b 9 4 b b b b 9 7 
            2 4 4 b b b 4 b b 4 b b b 4 4 7 
            2 b b b b b 4 9 b 4 b b b b b 7 
            2 b b b b 9 4 b b 4 9 b b b b 7 
            2 b b b 4 4 4 b 9 4 4 4 b b b 7 
            2 b b b b b 4 b b 4 b b b b b 7 
            2 b b b b b b b b b b b b b b 7 
            2 4 4 b b b b b b b b b b 4 4 7 
            2 b b b b b b b b b b b b b b 7 
            f b b b b b b 3 b b b b b b b f 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
            `)
    }
    if (levelnum == 6) {
        speed = 3000
        scene.setTileMap(img`
            1 5 6 5 5 5 5 5 5 5 5 5 6 5 5 1 
            2 b b b b b b b b b b b b b b 7 
            2 b b b b b b b b b b b b b b 7 
            2 b 9 9 b b b b b b b 9 9 b b 7 
            2 b 4 4 b b b b b b b 4 4 b b 7 
            2 b b b b b b b b b b b b b b 7 
            2 b b b b 9 b b b 9 b b b b b 7 
            2 b b b 4 4 b b b 4 4 b b b b 7 
            2 b b b b b b b b b b b b b b 7 
            2 b b 9 b b b b b b b b 9 b b 7 
            2 b b 4 b b 4 b b 4 b b 4 b b 7 
            2 b b b b b b b b b b b b b b 7 
            2 4 b b b b b 3 b b b b b b 4 7 
            2 b b b b b b 4 4 b b b b b b 7 
            f b b b b b b 4 4 b b b b b b f 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
            `)
    }
    if (levelnum == 7) {
        speed = 3000
        scene.setTileMap(img`
            1 5 6 5 5 5 5 5 5 5 5 5 6 5 5 1 
            2 b b b b b b b b b b b b b b 7 
            2 b b b b b b b b b b b b b b 7 
            2 b b b b b 9 b b 9 b b b b b 7 
            2 b 4 4 4 4 4 b b 4 4 4 4 b b 7 
            2 b b b b 4 9 b b 9 4 b b b b 7 
            2 b b b b 4 4 b b 4 4 b b b b 7 
            2 4 b b b b b b b b b b b b 4 7 
            2 9 b b b b b 3 b b b b b b 9 7 
            2 4 4 4 b b b 4 4 b b b 4 4 4 7 
            2 b b 4 b b b b b b b b 4 b b 7 
            2 b 9 4 b b b b b b b b 4 9 b 7 
            2 b 4 4 b b 4 4 4 4 b b 4 4 b 7 
            2 b b b b b b b b b b b b b b 7 
            f b b b b b b b b b b b b b b f 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
            `)
    }
    if (levelnum == 8) {
        speed = 2000
        scene.setTileMap(img`
            1 5 6 5 5 5 5 5 5 5 5 5 6 5 5 1 
            2 b b b b b b b b b b b b b b 7 
            2 b b b b b b b b b b b 9 b b 7 
            2 b 4 4 4 4 4 b 9 b 4 4 4 b b 7 
            2 b b b b 9 4 b b b 4 b b b b 7 
            2 9 b b b b 4 b b b 4 b b b 9 7 
            2 4 b b b b b b b b b b b b 4 7 
            2 b b b b b b b 3 b b b b b b 7 
            2 b b 9 b 4 4 4 4 4 4 b 9 b b 7 
            2 b b b b b b b b b b b b b b 7 
            2 4 b b b b b 9 b b b b b b 4 7 
            2 b b b b b b 4 4 b b b b b b 7 
            2 b b 4 b b b b b b b b 4 b b 7 
            2 b b b b b b b b b b b b b b 7 
            f b b b b b b b b b b b b b b f 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
            `)
    }
    if (levelnum == 9) {
        speed = 2000
        scene.setTileMap(img`
            1 5 6 5 5 5 5 5 5 5 5 5 6 5 5 1 
            2 b b b b b b b b b b b b b b 7 
            2 b b b b b b b b b b b b b b 7 
            2 b 9 b b b b 9 b b b b 9 b b 7 
            2 b b b b b b b b b b b b b b 7 
            2 4 9 b b b b 9 b b b b 9 b 4 7 
            2 b b b b b b b b b b b b b b 7 
            2 b 9 b b b b b b b b b 9 b b 7 
            2 b 4 4 4 4 4 4 4 4 4 4 4 b b 7 
            2 b b b b b b b b b b b b b b 7 
            f b b b b b b b b b b b b b b f 
            2 4 4 b b b b b b b b b b 4 4 7 
            2 b b b b 4 b b b b 4 b b b b 7 
            2 b b b b b b b b b b b b b b 7 
            2 b b b b b b b 3 b b b b b b 7 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
            `)
    }
    if (levelnum == 10) {
        speed = 1000
        scene.setTileMap(img`
            1 5 6 5 5 5 5 5 5 5 5 5 6 5 5 1 
            2 b b b b b b b b b b b b b b 7 
            2 b b b b b b b b b b b b b b 7 
            2 9 b b b b b b b 3 b b b 9 b 7 
            2 4 b b b 4 b b b 4 b b b 4 b 7 
            2 b b 9 b b b 9 b b b 9 b b b 7 
            2 b b 4 b b b 4 b b b 4 b b b 7 
            2 b b b b b b b b b b b b b b 7 
            2 4 b b b 4 b b b 4 b b b 4 b 7 
            2 b b 9 b b b 9 b b b 9 b b b 7 
            2 b b 4 b b b 4 b b b 4 b b b 7 
            2 b b b b b b b b b b b b b b 7 
            2 4 b b b 4 b b b 4 b b b 4 b 7 
            2 b b b b b b b b b b b b b b 7 
            f b b b b b b b b b b b b b b f 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
            `)
    }
    if (levelnum == 11) {
        game.over(true)
    }
    spawn_player()
    spawn_jewels()
    jewelnum = 0
    lvlcomplete = 0
    open = 0
}
function spawn_rock2 () {
    mysprite3 = sprites.create(img`
        . . 4 4 4 . . . . 4 4 4 . . . . 
        . 4 5 5 5 e . . e 5 5 5 4 . . . 
        4 5 5 5 5 5 e e 5 5 5 5 5 4 . . 
        4 5 5 4 4 5 5 5 5 4 4 5 5 4 . . 
        e 5 4 4 5 5 5 5 5 5 4 4 5 e . . 
        . e e 5 5 5 5 5 5 5 5 e e . . . 
        . . e 5 f 5 5 5 5 f 5 e . . . . 
        . . f 5 5 5 4 4 5 5 5 f . . f f 
        . . f 4 5 5 f f 5 5 6 f . f 5 f 
        . . . f 6 6 6 6 6 6 4 4 f 5 5 f 
        . . . f 4 5 5 5 5 5 5 4 4 5 f . 
        . . . f 5 5 5 5 5 4 5 5 f f . . 
        . . . f 5 f f f 5 f f 5 f . . . 
        . . . f f . . f f . . f f . . . 
        `, SpriteKind.Enemy)
    mysprite3.setPosition(195, 5)
    mysprite3.ay = 200
}
scene.onHitTile(SpriteKind.Enemy, 4, function (sprite) {
    mySprite2.vx = 50
    mysprite3.vx = -50
})
info.onLifeZero(function () {
    game.over(false)
})
scene.onHitTile(SpriteKind.Player, 3, function (sprite) {
    lvlcomplete = 1
})
scene.onHitTile(SpriteKind.Enemy, 15, function (sprite) {
    sprite.destroy(effects.ashes, 500)
})
let jump = 0
let right = 0
let open = 0
let lvlcomplete = 0
let releaserock = 0
let mysprite3: Sprite = null
let mySprite: Sprite = null
let jewel2: Sprite = null
let mySprite2: Sprite = null
let speed = 0
let jewelnum = 0
let levelnum = 0
music.setVolume(255)
scene.setBackgroundImage(img`
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999111111111119999999999999999999999999999999999999991111999999999999999999999999999999999999999999111111111111
    99999999999999999999999999999999999999999999999999991ddddddddd19999999999999999999999999991111199999991dd11999999999999999999999999999999999999999991dddddddddd1
    999999999999999999999999999999111119999999999f9999991ddddddddd19999999999999999999999999991ddd199999991ddd19999999999999999f9991111999999999999999991dddddddddd1
    999999999999999999999999999991fddd11999999999f9999991d11dddfffffffffffffffffffffff999999111ddd1f1999911ddd11999999999999999f9911dd1199999999999999991dd1d1ddddd1
    999999999999999999999999999911fdddd199999999f99999991ddddddd1d199999999111999999f11111191ddddddf199f91ddddd1fffffff99999999f111ddddfffffffffffffffffffffffd11dd1
    9999991111999999fffffff999991dfdddd19991119f999999991ddddddddd1999999911d1999999fddddd191ddddddf199f11ddddff1999999ff999999f1dddddd1999111f999999f991dddddddddd1
    9999991dd19999ff9999999ff9991dfd1d119991d19f999999991ddddddddd199999991dd1999999fddddd191ddddddf199f11dddfd1199999999f99999f1ddd1d119991ddf999999f991dddd1ddddd1
    1111111dd1911f11199111111f111dfdddd19111d1f1999999991ddddddd1d111111111dd1999999fddddd111d11dddf191f1ddddfdd111119911f11111f1dddddd19911ddf199999f991ddddddd1dd1
    d11dddddd191dfdd1991dddddfddddf1ddd111ddddf1111111111ddddddd1d11d11ddd1dd199999f11dd1dd11ddddddf191fddddfdddd1dd1991ddfddddfddddd1d1111dddf119111f111dddddd11ddd
    dddd1dddd191fddd19911d1dd1fdddfdddd111dddfd111dd1dd11ddddddddd11dddd1d1dd111111f1dddddd11dd1dddf191fddddfddddddd1991ddfddd1fddddddd1111dddf1191d1fdd1ddddddddddd
    ddddddddd111fd1d1111ddddddfdddfddddd11ddfddd11ddddddddddddddddd1ddddddddd11d11df1ddddddddddddddf191fddddfddddd1d1111ddfddddfdddddddd11ddddfd111ddfdddddddddddddd
    d11d1dddd1ddfdddd1dd1d1dddfdddfddddd11ddfffdd1dddd11ddddddddddddd1111ddddddd1ddf11dd1ddddddddddf111fddddfddddddddd1dddfddddfdddddddd11ddddfdd111f11ddddddddddddd
    ddddddddd1ddfdddd1ddddddddfdddfddddddd1fdddff11ddddddddddddddddddddddddddddd1dfd1ddddddddddddddf1d1fddddfddddddddd1dddfddddfddddddddddddddfdd1ddfddddddddddddddd
    ccccccccccccfcccccccccccccfcccfccccccccfcccccffcccccccccccccccccccccccccccccccfccccccccccccccccfcccfccccfcccccccccccccfccccfccccccccccccccfcccccfccccccccccccccc
    111111111111f1111111111111f111f1111111f11111111ff11111111111111111111111111111f1111fffffffffffff111f1111f1111111111111f1111f11111111111111f11111f111111111111111
    11ccccccccccf11cccccccccccf11cfccccccfcc11cccccccffcc11cccccffffffffffffffffffcc11ccccccccccc11fcccfcccccfc11ccccccccfcc11cfccccccccc11cccfcccccfcc11ccccccccccc
    11cdddddddddcf1cdddddddddfc11cfddddddfdc11cddddddddff11cddddddddddc11cdddddddfdc11cdddddddddc11fdddfdddddfc11cdddddddfdc11cfddddddddc11cddfdddddfdc11cdddddddddc
    11cdddddddddcf1cdddddddddfc11cfdddddfddc11cdddddddddc11cddddddddddc11cdddddddfdc11cdddddddddc11fdddfddddddff1cdddddffddc11cfddddddddc11cddfdddddfdc11cdddddddddc
    bbbbbbbbbbbbbbffbbbbbbbffbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbfbbbfbbbbbbbbfffffffbbbbbbbbfbbbbbbbbbbbbbfbbbbbfbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbfffffffbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbfbbbfbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbffffffffffffbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbfbbbfbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbffffffffffffbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbfbbbfbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    111d1111d111dd11dd1111111111ddfd111ffffffffffffffffffff1dd1111111111dddd1111f111111d1111d111dd1fdd1f11111111dddd11111111111f1111d111dd11dd1111111111dddd1111111d
    11ddd111111dddd11dd11111111111f1d111111111ddd111111dddd11dd11111111111d1d11f111111ddd111111ddddf1ddf1111111111d1d111111111fdd111111dddd11dd11111111111d1d1111111
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffffffffffffffffffffbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbccccbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccbccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbcbddbcbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbffffffffffffffbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffffbbbbbfbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffffffffbbfbbbbbbbbbbbbbbbbbbbbbbffffffbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbfbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbfbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    1111111dddd11111ddbbbbbbbbbbfbbbbbbdf1111111111dfdd111ffffffbbbbbbbbbbbbbbbdd1111111111dddd1f111ddbbbbbbbbbbbfbbbbbdd1111111111dddd11111ddbbbbbbbbbbbbbbbbbdd111
    111111111d1d11111ddbbbbbbbbbfbbbbbbbfd1111111111ffffff111ddbbbbbbbbbbbbbbbbbdd11111111111d1f11111ddbbbbbbbbbfbbbbbbbdd11111111111d1d11111ddbbbbbbbbbbbbbbbbbdd11
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbfbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbfbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbfbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbfbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbfbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbfbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbfbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcfbbbbbfbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbcccbbbccccbfbbbbbfbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbcbbcbbcbcbbfbbbbbbfbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbcbbbfbbbbbfbbbbbbbbbbbbbbbbbffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccbfbbbbbfbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcfbbbbbfbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbfbbbbbbbbbbbbccccbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbfbbbbbbbbbbbbcbddbcfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbffffbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbfffffffbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbfffffffbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    1111111111dddd11111111111d1111d11fdd11dd11111fffffffffffff1111111d1111d111dd11dd1111111111dddd11111111111df111d111dd11dd1111111111dddd1111111d111d1111d111dd11dd
    d11111111111d1d111111111ddd11111fffffffffffff1111111d1d111111111ddd111111dddd11dd11111fffffff1d111111111ddf111111dddd11dd11111111111d1d111111111ddd111111dddd11d
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbfbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbfbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    111d1111d111dd11dd1111111111dddd11111111111d1111d111dd11dd1111111111dddd11111111111df111d111ddf1dd1111111111dddd11111111111d1111d111dd11dd1111111111dddd1111111d
    11ddd111111dddd11dd11111111111d1d111111111ddd111111dddd11dd11111111111d1d111111111ddf111111dddf11dd11111111111d1d111111111ddd111111dddd11dd11111111111d1d1111111
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbcccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbccbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    cccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
    bccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccc
    ccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbb
    bbbbccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbddbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb1bb1bb1bbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbdd1111111111dddd11111ddbbbbbbbbbbbbbbbbbdd1111111111dddd11111ddbbbbbbbbbbbbbbbbbdd1111111111dddd11111ddbbbbbb2bb2bb2bbbbdd1111111111dddd11111ddb
    bbbbbbbbbbbbbbbbbdd11111111111d1d11111ddbbbbbbbbbbbbbbbbbdd11111111111d1d11111ddbbbbbbbbbbbbbbbbbdd11111111111d1d11111ddbbbb12bb2bb2bbbbbdd11111111111d1d11111dd
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb2bb12b12bbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb2bb2bb2bbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb2bb12b12bbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffffbbbbfffffffffffbbbbbbbfbbbbbbbffffffffffb2bf12f12ffffbffbbbbbbbbbbbbfffffffffb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffffbbbfffffffffffbbbbbbfffbbbbbbffffffffff2bbf2ff2fffffbffffffffffffbbffffffffff
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbffbbbffbbbbbbbbbbbbbbbfffbbbbbbffbbbbbbbf2bb12b12bbbbbbffffffffffffbbffbbbbbbff
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbffbbbffbbbbbbbbbbbbbbfffffbbbbbffbbbbbbb2fbb2fb2bbbbbbbffffbbbbbbffbbffbbbbbbff
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffffffbbbbbffbbbbbbbffbbbffbbbbbbbbbbbbbbfffffbbbbbffbbbbbbb2fb12f12bbbbbbbffffbbbbbbffbbffbbbbbbff
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffffffbbbbbffbbbbbbbffbbbffbbbbbbbbbbbbbbffbffbbbbbffbbbbbb2ffb12f12bbbbbbbffbbbbbbbbffbbffbbbbbbff
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffffffbbbbbffbbbbbbbffbbbfffffffffffbbbbfffbfffbbbbffbbbbbb2ffb2ff2fffffffbffbbbbbbbbffbbffbbbbbbff
    ccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbffbbbfffffffffffbbbbffbbbffbbbbffbbbbb21ff12f12fffffffbffbbbbbbbbffbbffbbbbbbff
    dbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbffbbbfffffffffffbbbfffbbbfffbbbffbbbbb2bff12f12fffffffbffbbbbbbbbffbbffbbbbbcff
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbffbbbffbbbbbbbbbbbbfffffffffbbbffbbbb21bf12b12bbbbbbbbbffbbbbbbbbffbbffbbbbbbff
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbffbbbffbbbbbbbbbbbfffffffffffbbffbbbb2bbf12b12bbbbbbbbbffbbbbbbbbffbbffbbbbbbff
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbffbbbffbbbbbbbbbbbffbbbbbbbffbbffbbb21bbf12b12bbbbbbbbbffbbbbbbbbffbbffbbbbbbff
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffffbbbfffffffffffbffbbbbbbbbbffbfffff2fff12b12fffffffffbffbbbbbbbbffbbffffffffff
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffffbbbbfffffffffffbffbbbbbbbbbffbffff21fff12b12fffffffffbffbbbbbbbbffbbfffffffffb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb21bb12b12bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb21bbb12b12bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb1bbb12b12bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb1bbb12b12bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    `)
pause(2000)
game.showLongText("당신은 내일 1교시에 제출할 숙제를 깜빡하고 학교에 두고 오다...", DialogLayout.Center)
game.showLongText("모든 숙제을 모은뒤 문으로 나가면 되는 간단한 게임입니다.", DialogLayout.Center)
game.showLongText("돌아다니는 동물과 닿으면 게임 오버", DialogLayout.Center)
info.setLife(6974)
levelnum = 1
jewelnum = 0
speed = 7000
scene.setBackgroundImage(img`
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    `)
scene.setTileMap(img`
    1 5 6 5 5 5 5 5 5 5 5 5 6 5 5 1 
    2 b b b b b b b b b b b b b b 7 
    2 b b 9 b b b b b b b b 9 b 3 7 
    2 b 4 4 4 b b b b b b b 4 4 4 7 
    2 b b 4 b b b b b b b b b b b 7 
    2 b b 4 b 9 b b b 4 4 4 b b b 7 
    2 b b 4 4 4 b b b b b b b b b 7 
    2 b b b b 9 b b b b b b b b b 7 
    2 b b b b 4 4 4 b b b 9 b b b 7 
    2 b b b b b b b b b b 4 b b b 7 
    2 b b b b b b b b b b b b b 9 7 
    2 b b b 9 b b b b b b b b b b 7 
    2 b b 4 4 b b b b 4 4 4 4 b b 7 
    2 b b b b b b b b b b b b b b 7 
    f b b b b b b b b b 9 b b b b f 
    1 4 4 4 4 4 4 4 4 4 4 4 4 4 4 1 
    `)
scene.setTile(4, img`
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    `, true)
scene.setTile(2, img`
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    `, true)
scene.setTile(7, img`
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    `, true)
scene.setTile(5, img`
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    `, true)
scene.setTile(1, img`
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    `, true)
scene.setTile(15, img`
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    4 1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    4 4 4 4 4 1 4 4 4 4 4 4 4 1 4 4 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    `, true)
scene.setTile(3, img`
    . . . . f f f f f f f f . . . . 
    . . . f 4 4 4 4 4 4 4 4 f . . . 
    . . f 4 4 4 5 5 5 5 4 4 4 f . . 
    . f 4 4 4 5 5 f f 5 5 4 4 4 f . 
    f 4 4 4 4 5 f f f f 5 4 4 4 4 f 
    f d 4 4 4 5 f f f f 5 4 4 4 d f 
    f d d 4 4 5 f f f f 5 4 4 d d f 
    f 4 d d d 5 5 f f 5 5 d d d 4 f 
    f 4 4 4 d 5 5 f f 5 5 d 4 4 4 f 
    f 4 4 4 4 5 5 f f 5 5 4 4 4 4 f 
    f 4 4 4 4 5 f f f f 5 4 4 4 4 f 
    f 4 4 4 4 5 f f f f 5 4 4 4 4 f 
    f 4 4 4 d 5 5 f f 5 5 d 4 4 4 f 
    f 4 4 d d 4 5 5 5 5 4 d d 4 4 f 
    f d d d 4 4 4 4 4 4 4 4 d d d f 
    f f f f f f f f f f f f f f f f 
    `, false)
scene.setTile(11, img`
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    `, false)
scene.setTile(6, img`
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    `, false)
scene.setTile(9, img`
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    b b b b b b b b b b b b b b b b 
    `, false)
spawn_jewels()
spawn_rocks()
spawn_rock2()
spawn_player()
forever(function () {
    if (mySprite.vx > 0 && mySprite.vy > 0) {
        right = 0
        mySprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f f f f . . . 
            . . . f e e e e e e e e e f . . 
            . . f e e e e e e e e e e e f . 
            . . f f e e e d d e d d e f f . 
            . . f e e d 1 d d d d 1 d f . . 
            . f f e d d f d d d d f d f . . 
            f e f e d d d d d d d d d f . . 
            f e f e d d d d d d d d d f . . 
            . f f e d d d d d f d d f f . . 
            f e 1 f d d d d d d d f 1 f . . 
            . f d f f f f f f f f f f d f . 
            . . f f 1 1 1 1 1 1 1 f f f . . 
            . . . f e e e f e e e f . . . . 
            . . . f f f f f e e e e f . . . 
            . . . . . . . . f f f f . . . . 
            `)
        pause(100)
        mySprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f f f f . . . 
            . . . f e e e e e e e e e f . . 
            . . f e e e e e e e e e e e f . 
            . . f e e e e d d e d d e f f . 
            . . f e e d 1 d d d d 1 d f . . 
            . f f e d d f d d d d f d f . . 
            f e f e d d d d d d d d d f . . 
            f e f e d d d d d d d d d f . . 
            . f f e d d d d d f d d f f . . 
            f e 1 f d d d d d d d f 1 f . . 
            f d f f f f f f f f f f d f . . 
            f f f f 1 1 1 1 1 1 1 f f f . . 
            . . . f e e e f e e e f . . . . 
            . . f e e e e f f f f f . . . . 
            . . . f f f f . . . . . . . . . 
            `)
        pause(100)
    }
    if (mySprite.vx == 0 && right == 0) {
        mySprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f f f f . . . 
            . . . f e e e e e e e e e f . . 
            . . f e e e e e e e e e e f . . 
            . . f e e e e d d e d d e f . . 
            . . f e e d 1 d d d d 1 d f . . 
            . f f e d d f d d d d f d f . . 
            f e f e d d d d d d d d d f . . 
            f e f e d d d d d d d d d f . . 
            . f f e d d d d d f d d f f . . 
            f e 1 f d d d d d d d f 1 . . . 
            . f d f f f f f f f f f d f . . 
            . . f f 1 1 1 1 1 1 1 f f . . . 
            . . . f e e e f e e e f . . . . 
            . . f e e e e f e e e e f . . . 
            . . . f f f f . f f f f . . . . 
            `)
    }
    if (mySprite.vx < 0) {
        right = 1
        mySprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f f f f . . . 
            . . . f e e e e e e e e e f . . 
            . . f e e e e e e e e e e e f . 
            . . f e e e e d d e d d e f . . 
            . . f e 1 d d d d 1 d d d f . . 
            . . f e f d d d d f d d d f f . 
            . . f e d d d d d d d d d f e f 
            . . f e d d d d d d d d d f e f 
            . . f e d d f d d d d d f f f . 
            . f 1 f f d d d d d d f 1 f e f 
            . f d f f f f f f f f f f d f . 
            . . f f 1 1 1 1 1 1 1 f f f . . 
            . . . f e e e f e e e f . . . . 
            . . . f f f f f e e e e f . . . 
            . . . . . . . . f f f f . . . . 
            `)
        pause(100)
        mySprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f f f f . . . 
            . . . f e e e e e e e e e f . . 
            . . f e e e e e e e e e e f . . 
            . . f e e e e d d e d d e f . . 
            . . f e 1 d d d d 1 d d d f . . 
            . . f e f d d d d f d d d f f . 
            . . f e d d d d d d d d d f e f 
            . . f e d d d d d d d d d f e f 
            . . f e d d f d d d d d f f f . 
            . f 1 f f d d d d d d f 1 f e f 
            f d f 1 f f f f f f f f d f f . 
            f f f f 1 1 1 1 1 1 1 f f . . . 
            . . . f e e e f e e e f . . . . 
            . . f e e e e f f f f f . . . . 
            . . . f f f f f . . . . . . . . 
            `)
        pause(100)
    }
    if (mySprite.vx == 0 && right == 1) {
        mySprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f f f f . . . 
            . . . f e e e e e e e e e f . . 
            . . f e e e e e e e e e e f . . 
            . . f e e e e d d e d d e f . . 
            . . f e 1 d d d d 1 d d d f . . 
            . . f e f d d d d f d d d f f . 
            . . f e d d d d d d d d d f e f 
            . . f e d d d d d d d d d f e f 
            . . f e d d f d d d d d f f f . 
            . f 1 f f d d d d d d f 1 f e f 
            . f d f f f f f f f f f d f f . 
            . . f f 1 1 1 1 1 1 1 f f f . . 
            . . . f e e e f e e e f . . . . 
            . . f e e e e f e e e e f . . . 
            . . . f f f f f f f f f . . . . 
            `)
    }
})
forever(function () {
    if (releaserock == 2) {
        pause(2000)
        spawn_rock2()
        releaserock = 0
    }
})
forever(function () {
    if (open == 1) {
        music.magicWand.play()
        pause(20000)
    }
})
forever(function () {
    if (mySprite.vy < 10 && right == 1) {
        mySprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f f f f . . . 
            . . . f e e e e e e e e e f . . 
            . . f e e e e e e e e e e f . . 
            . . f e e e e d d e d d e f . . 
            . . f e 1 d d d d 1 d d d f . . 
            . . f e f d d d d f d d d f f . 
            . . f e d d d d d d d d d f e f 
            . . f e d d d d d d d d d f e f 
            . f f e d d f d d d d d f f f . 
            f d 1 f f d d d d d d f 1 d e f 
            . f f f f f f f f f f f f f f . 
            . . . f 1 1 1 1 1 1 1 f . . . . 
            . . . f e e e f e e e f . . . . 
            . . . f f e e f f e e f . . . . 
            . . . . f f f f f f f f . . . . 
            `)
    }
    if (mySprite.vy < 10 && right == 0) {
        mySprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f f f f . . . 
            . . . f e e e e e e e e e f . . 
            . . f e e e e e e e e e e f . . 
            . . f e e e e d d e d d e f . . 
            . . f e e d 1 d d d d 1 d f . . 
            . f f e d d f d d d d f d f . . 
            f e f e d d d d d d d d d f . . 
            f e f e d d d d d d d d d f . . 
            . f f e d d d d d f d d f f . . 
            f d 1 f d d d d d d d f 1 d f . 
            . f f f f f f f f f f f f f . . 
            . . . f 1 1 1 1 1 1 1 f . . . . 
            . . . f e e e f e e e f . . . . 
            . . . f e e f f e e f . . . . . 
            . . . f f f . f f f . . . . . . 
            `)
    }
})
forever(function () {
    if (lvlcomplete == 0) {
        if (jewelnum == 8) {
            open = 1
        }
        if (open == 1) {
            scene.setTile(3, img`
                . . . . f f f f f f f f . . . . 
                . . . f f f f f f f f f f . . . 
                . . f 4 f f f f f f f f 4 f . . 
                . f 4 4 f f f f f f f f 4 4 f . 
                f 4 4 4 f f f f f f f f 4 4 4 f 
                f 4 4 4 f f f f f f f f 4 4 4 f 
                f 4 4 4 f f f f f f f f 4 4 4 f 
                f 4 4 4 f f f f f f f f 4 4 4 f 
                f 4 4 4 f f f f f f f f 4 4 4 f 
                f 4 4 4 f f f f f f f f 4 4 4 f 
                f 4 4 4 f f f f f f f f 4 4 4 f 
                f 4 4 4 f f f f f f f f 4 4 4 f 
                f 4 4 4 f f f f f f f f 4 4 4 f 
                f 4 4 4 f f f f f f f f 4 4 4 f 
                f 4 4 4 f f f f f f f f 4 4 4 f 
                f f f f f f f f f f f f f f f f 
                `, true)
        } else {
            scene.setTile(3, img`
                . . . . f f f f f f f f . . . . 
                . . . f 4 4 4 4 4 4 4 4 f . . . 
                . . f 4 4 4 5 5 5 5 4 4 4 f . . 
                . f 4 4 4 5 5 f f 5 5 4 4 4 f . 
                f 4 4 4 4 5 f f f f 5 4 4 4 4 f 
                f d 4 4 4 5 f f f f 5 4 4 4 d f 
                f d d 4 4 5 f f f f 5 4 4 d d f 
                f 4 d d d 5 5 f f 5 5 d d d 4 f 
                f 4 4 4 d 5 5 f f 5 5 d 4 4 4 f 
                f 4 4 4 4 5 5 f f 5 5 4 4 4 4 f 
                f 4 4 4 4 5 f f f f 5 4 4 4 4 f 
                f 4 4 4 4 5 f f f f 5 4 4 4 4 f 
                f 4 4 4 d 5 5 f f 5 5 d 4 4 4 f 
                f 4 4 d d 4 5 5 5 5 4 d d 4 4 f 
                f d d d 4 4 4 4 4 4 4 4 d d d f 
                f f f f f f f f f f f f f f f f 
                `, false)
        }
    } else {
        music.powerUp.play()
        effects.confetti.startScreenEffect()
        mySprite.destroy()
        mySprite2.destroy()
        mysprite3.destroy()
        scene.setTile(3, img`
            . . . . f f f f f f f f . . . . 
            . . . f f f f f f f f f f . . . 
            . . f 4 f f e e e e f f 4 f . . 
            . f 4 4 f e e e e e e f 4 4 f . 
            f 4 4 4 f e e e e e e f 4 4 4 f 
            f 4 4 4 f d d d d d d f 4 4 4 f 
            f 4 4 4 f d d d d d d f 4 4 4 f 
            f 4 4 4 f d d d d d d f 4 4 4 f 
            f 4 4 4 f f f 1 1 f f f 4 4 4 f 
            f 4 4 4 f f 1 1 1 1 f f 4 4 4 f 
            f 4 4 4 f 1 1 1 1 1 1 f 4 4 4 f 
            f 4 4 4 d 1 1 1 1 1 1 d 4 4 4 f 
            f 4 4 4 f f f f f f f f 4 4 4 f 
            f 4 4 4 f e e f f e e f 4 4 4 f 
            f 4 4 4 f f f f f f f f 4 4 4 f 
            f f f f f f f f f f f f f f f f 
            `, true)
        pause(1000)
        scene.setTile(3, img`
            . . . . f f f f f f f f . . . . 
            . . . f f f f f f f f f f . . . 
            . . f 4 f f f f f f f f 4 f . . 
            . f 4 4 f f f f f f f f 4 4 f . 
            f 4 4 4 f f f f f f f f 4 4 4 f 
            f 4 4 4 f f f f f f f f 4 4 4 f 
            f 4 4 4 f f f f f f f f 4 4 4 f 
            f 4 4 4 f f f f f f f f 4 4 4 f 
            f 4 4 4 f f f f f f f f 4 4 4 f 
            f 4 4 4 f f f f f f f f 4 4 4 f 
            f 4 4 4 f f f f f f f f 4 4 4 f 
            f 4 4 4 f f f f f f f f 4 4 4 f 
            f 4 4 4 f f f f f f f f 4 4 4 f 
            f 4 4 4 f f f f f f f f 4 4 4 f 
            f 4 4 4 f f f f f f f f 4 4 4 f 
            f f f f f f f f f f f f f f f f 
            `, true)
        pause(1000)
        scene.setTile(3, img`
            . . . . f f f f f f f f . . . . 
            . . . f f 4 4 4 4 4 4 f f . . . 
            . . f 4 4 4 4 4 4 4 4 4 4 f . . 
            . f 4 4 4 4 4 4 4 4 4 4 4 4 f . 
            f 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            f 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            f 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            f 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            f 4 4 4 4 4 5 4 4 5 4 4 4 4 4 f 
            f 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            f 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            f 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            f 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            f 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            f 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            f f f f f f f f f f f f f f f f 
            `, true)
        pause(2000)
        new_level()
    }
})
forever(function () {
    if (releaserock == 1) {
        spawn_rocks()
        releaserock = 2
    }
})
forever(function () {
    if (jump == 0) {
        mySprite.ay = 350
    } else {
        mySprite.vy = -200
        if (mySprite.isHittingTile(CollisionDirection.Top)) {
            jump = 0
            mySprite.vy = 100
        }
    }
})
forever(function () {
    if (mySprite2.x < 5 || mySprite2.x > 247) {
        mySprite2.destroy()
    }
    if (mysprite3.x < 10 || mysprite3.x > 247) {
        mysprite3.destroy()
    }
})
forever(function () {
    if (controller.A.isPressed() && jump == 0 && mySprite.isHittingTile(CollisionDirection.Bottom)) {
        music.playTone(523, music.beat(BeatFraction.Sixteenth))
        music.playTone(587, music.beat(BeatFraction.Sixteenth))
        music.playTone(659, music.beat(BeatFraction.Sixteenth))
        jump = 1
        pause(200)
        jump = 0
    }
})
forever(function () {
    if (releaserock == 0) {
        pause(speed)
        releaserock = 1
    }
})
