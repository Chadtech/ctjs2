module.exports = (k) ->

  character = (necessaryConditions,  triggers,  precludingConditions,  image,  characterAsString) ->
    output =
      necessaryConditions:  necessaryConditions
      triggers:             triggers
      precludingConditions: precludingConditions
      image:                image
      # characterAsString:    characterAsString
    output

  characters = [

    character [ k[ 'shift' ] ], [ k[ 'a' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'b' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'c' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'd' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'e' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'f' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'g' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'h' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'i' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'j' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'k' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'l' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'm' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'n' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'o' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'p' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'q' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'r' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 's' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 't' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'u' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'v' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'w' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'x' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'y' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'z' ] ], [  ], new Image()

    character [  ], [ k[ 'a' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 'b' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 'c' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 'd' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 'e' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 'f' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 'g' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 'h' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 'i' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 'j' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 'k' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 'l' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 'm' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 'n' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 'o' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 'p' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 'q' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 'r' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 's' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 't' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 'u' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 'v' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 'w' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 'x' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 'y' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ 'z' ] ], [ k[ 'shift' ] ], new Image()

    character [ ], [ k[ 'space' ] ], [ ], new Image()

    character [  ], [ k[ '0' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ '1' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ '2' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ '3' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ '4' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ '5' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ '6' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ '7' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ '8' ] ], [ k[ 'shift' ] ], new Image()
    character [  ], [ k[ '9' ] ], [ k[ 'shift' ] ], new Image()

    character [  ],             [ k[ 'period' ] ],        [ k[ 'shift' ] ], new Image()
    character [  ],             [ k[ 'comma' ] ],         [ k[ 'shift' ] ], new Image()
    character [  ],             [ k[ 'single quote' ] ],  [ k[ 'shift' ] ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'single quote'] ],   [ ], new Image()
    character [ k[ 'shift' ] ], [ k[ 'forward slash' ] ], [ ], new Image()
    character [ k[ 'shift' ] ], [ k[ '1' ] ],             [ ], new Image()

    character [ k[ 'shift' ] ], [ k[ '2' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ '-' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ '8' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ '3' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ '4' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ '5' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ '7' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ '9' ] ], [  ], new Image()
    character [ k[ 'shift' ] ], [ k[ '0' ] ], [  ], new Image()

    character [ ], [ k[ 'enter' ] ], [ ], new Image()
  ]

  zeros = (number, zeros) ->
    number = number + ''
    while number.length < 3
      number = '0' + number
    number

  for charIndex in [ 0 .. characters.length - 1 ]
    fileName = './hfnssC0_' + (zeros charIndex, 3) + '.png'
    characters[ charIndex ].image.src = fileName


  characters



