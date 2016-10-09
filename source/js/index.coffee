React = require 'react'


# DOM Elements
{p, a, div, input, img, canvas} = React.DOM

ConvertCharacterListToWordList = require './convert-character-list-to-word-list.coffee'
ConvertWordListToLineList      = require './convert-word-list-to-line-list.coffee'
ConvertLinesToCharacterLists   = require './convert-lines-to-character-lists.coffee'


Keys       = require './keys.coffee'
characters = (require './characters.coffee')( Keys )

characterWidth          = 11
characterHeight         = 19
xMargin                 = 8 * characterWidth
yMargin                 = 2 * characterHeight
lineSpace               = 2
scriptVariety           = [ true, true ]
doc                     = []
currentCursorSpot       = 0
justPressedKey          = undefined
currentlyPressedKeys    = []
words                   = []
lines                   = []
cursorsLine             = 0
cursorInLine            = 0
wordCursorIsIn          = 0 
lineLength              = (window.innerWidth - (xMargin * 2 )) // characterWidth
characterInWord         = 0
cursorImage             = new Image()
cursorImage.src         = './c0000.png'


command = (necessaryConditions, triggers, precludingConditions, execution) ->
  output =
    necessaryConditions:  necessaryConditions
    triggers:             triggers
    precludingConditions: precludingConditions
    execution:            execution

commands = [

  command [], [ Keys[ 'backspace' ] ], [ Keys[ 'ctrl'], Keys[ 'shift' ] ], =>
    doc.splice currentCursorSpot - 1, 1
    currentCursorSpot--

  command [], [ Keys['delete'] ], [], =>
    doc.splice currentCursorSpot, 1 

  command [], [ Keys['left'] ], [ Keys['ctrl'] ], =>
    if currentCursorSpot > 0
      currentCursorSpot--

  command [], [ Keys['right'] ], [ Keys['ctrl'] ], =>
    if currentCursorSpot < doc.length
      currentCursorSpot++

  command [], [ Keys['down'] ], [ Keys['ctrl'] ], =>
    if (cursorsLine + 1) is lines.length
      currentCursorSpot = doc.length
    else
      if lines[cursorsLine + 1].length < cursorInLine
        currentCursorSpot += lines[cursorsLine].length - cursorInLine + lines[cursorsLine + 1].length + 1
      else
        currentCursorSpot += lines[cursorsLine].length + 1
    if currentCursorSpot > doc.length
      currentCursorSpot = doc.length

  command [], [ Keys['up'] ], [ Keys['ctrl'] ], =>
    if cursorsLine is 0
      currentCursorSpot = 0
    else
      if lines[ cursorsLine - 1].length > cursorInLine
        currentCursorSpot -= lines[cursorsLine - 1].length + 1
      else
        currentCursorSpot -= cursorInLine + 1
    if currentCursorSpot < 0
      currentCursorSpot = 0
]

zeroPadder = (number, zeros) ->
  output = ''
  while output.length < zeros
    output = '0' + output
  output


Index = React.createClass

  componentDidMount: ->
    for key in Object.keys(Keys)
      Keys[ Keys[key] ] = key

    window.addEventListener 'load',       @draw
    window.addEventListener 'dragover',   @onDragOver
    window.addEventListener 'drop',       @fileLoad
    window.addEventListener 'keydown',    @keyDownThenDraw, false
    window.addEventListener 'mousedown',  @onMouseDown
    window.addEventListener 'resize',     @draw
    window.addEventListener 'keyup',      @keyEventUp


  organizeWords: ->

    words          = [ [ ] ]
    wordCursorIsIn = undefined
    docIndex       = 0
    while docIndex < doc.length
      
      switch doc[ docIndex ]
        when 52
          words[ words.length - 1 ].push doc[ docIndex ]
          words.push []
        when 78
          words.push [ 78 ]
          words.push [ ]
        else
          words[ words.length - 1 ].push doc[ docIndex ]

      if docIndex is (currentCursorSpot - 1)
        wordCursorIsIn  = words.length - 1
        characterInWord = words[ words.length - 1 ].length - 1
      if currentCursorSpot is 0
        cursorInLine = 0

      docIndex++


    lines = [ [] ]
    thisLineLength = 0
    wordIndex = 0
    while wordIndex < words.length
      if words[ wordIndex ].length
        if words[ wordIndex ][0] is 78
          lines.push []
          thisLineLength = 0
        else
          if (thisLineLength + words[wordIndex].length) < lineLength
            lines[ lines.length - 1 ].push words[ wordIndex ]
            thisLineLength += words[ wordIndex ].length
          else
            lines.push []
            lines[ lines.length - 1 ].push words[ wordIndex ]
            thisLineLength = words[ wordIndex ].length

      if wordCursorIsIn is wordIndex
        cursorsLine = lines.length - 1
        cursorInLine = thisLineLength - (words[ wordIndex ].length - characterInWord - 1)
      wordIndex++


    lineIndex = 0
    while lineIndex < lines.length
      thisLine = []
      for word in lines[ lineIndex ]
        for character in word
          thisLine.push character
      lines[ lineIndex ] = thisLine
      lineIndex++



  documentUpdate: ->
    keepGoing = true
    charIndex = 0
    while (charIndex < characters.length) and keepGoing 
      triggerIndex = 0
      thisChar = characters[ charIndex ]
      while triggerIndex < characters[ charIndex ].triggers.length
        
        if thisChar.triggers[ triggerIndex ] is justPressedKey

          passedNecessaryConditions = true
          necCondIndex = 0
          while necCondIndex < thisChar.necessaryConditions.length
            thisCondition = thisChar.necessaryConditions[ necCondIndex ]
            if not (thisCondition in currentlyPressedKeys)
              passedNecessaryConditions = false
            necCondIndex++

          passedPrecludingConditions = true
          preClCondIndex = 0
          while preClCondIndex < thisChar.precludingConditions.length
            thisCondition = thisChar.precludingConditions[ preClCondIndex]
            if thisCondition in currentlyPressedKeys
              passedPrecludingConditions = false
            preClCondIndex++

          if passedPrecludingConditions and passedNecessaryConditions
            keepGoing = false
            doc.splice currentCursorSpot, 0, charIndex
            currentCursorSpot++

        triggerIndex++
      charIndex++


    keepGoing     = true
    commandIndex  = 0
    while (commandIndex < commands.length) and keepGoing
      triggerIndex = 0
      thisCommand = commands[ commandIndex ]
      while triggerIndex < commands[ commandIndex ].triggers.length
        if thisCommand.triggers[ triggerIndex] is justPressedKey
          passedANecessaryCondition = not thisCommand.necessaryConditions.length
          if not passedANecessaryCondition

            necCondIndex = 0
            while necCondIndex < thisCommand.necessaryConditions.length
              thisCondition = thisCommand.necessaryConditions[ necCondIndex ]
              if currentlyPressedKeys in thisCondition
                passedANecessaryCondition = true
              necCondIndex++

          passedPrecludingConditions = true
          preClCondIndex = 0
          while preClCondIndex < thisCommand.precludingConditions.length
            thisCondition = thisCommand.precludingConditions[ preClCondIndex ]
            if currentlyPressedKeys in thisCondition
              passedPrecludingConditions = false
            preClCondIndex++

          if passedANecessaryCondition and passedPrecludingConditions
            commands[ commandIndex ].execution()
            keepGoing = false

        triggerIndex++
      commandIndex++


  mouseDown: (event) ->
    xCor = event.clientX
    yCor = event.clientY

    leftOfRightEdge   = xCor < (window.innerWidth - xMargin)
    rightOfLeftEdge   = xMargin < xCor
    withinHorizontal  = leftOfRightEdge and rightOfLeftEdge

    AboveBottomEdge = yCor < (window.innerHeight - yMargin)
    BelowTopEdge    = yMargin < yCor
    withinVertical  = AboveBottomEdge and BelowTopEdge

    if withinHorizontal and withinVertical
      lineHeight = characterHeight + lineSpace
      whichLineInDoc = (yCor + window.pageYOffset) 
      whichLineInDoc = whichLineInDoc // lineHeight

      whichCharInLine = (xCor - xMargin) // characterWidth

      characterLineClickedOn = 0
      if (whichLineInDoc - 1) < lines.length
        lineIndex = 0
        while lineIndex < (whichLineInDoc - 1)
          if lines[ lineIndex ].length < lineLength
            characterLineClickedOn += lines[ lineIndex ].length + 1
          else
            characterLineClickedOn += lines[ lineIndex ].length
          lineIndex++

        if whichCharInLine < lines[ whichLineInDoc - 1 ].length
          currentCursorSpot = characterLineClickedOn + whichCharInLine
        else
          currentCursorSpot = characterLineClickedOn + lines[ whichLineInDoc - 1 ].length

        @draw()

  draw: ->
    if currentCursorSpot < 0
      currentCursorSpot = 0

    canvas        = document.getElementById 'docCanvas'
    ctx           = canvas.getContext '2d'
    canvas.width  = window.innerWidth

    if window.innerHeight < lines.length * (characterHeight + lineSpace) + 64
      ctx.canvas.height = lines.length * (characterHeight + lineSpace) + 64
    else
      ctx.canvas.height = window.innerHeight

    if lines.length * (characterHeight + lineSpace) + 64 - (window.pageYOffset + yMargin + cursorsLine * (characterHeight + lineSpace)) < 124
      if currentlyPressedKeys.length
        window.scrollBy 0, characterHeight + lineSpace

    @organizeWords()

    ctx.fillStyle = '#000000'
    if window.innerHeight > lines.length * (characterHeight + lineSpace) + 64
      ctx.fillRect 0, 0, window.innerWidth, window.innerHeight
    else
      ctx.fillRect 0, 0, window.innerWidth, lines.length * (characterHeight + lineSpace) + 64

    lineIndex = 0
    while lineIndex < lines.length
      charIndex = 0
      while charIndex < lines[ lineIndex].length
        thisImage = characters[ lines[ lineIndex ][ charIndex ] ].image
        xCor = (charIndex * characterWidth) + xMargin
        yCor = ((lineSpace + characterHeight) * lineIndex) + yMargin
        ctx.drawImage thisImage, xCor, yCor
        charIndex++
      lineIndex++

    xCor = (cursorInLine * characterWidth) + xMargin
    yCor = ( cursorsLine * (characterHeight + lineSpace)) + yMargin
    ctx.drawImage cursorImage, xCor, yCor
    
    @writeData()

  writeData: ->
    canvas = document.getElementById 'docCanvas'
    ctx    = canvas.getContext '2d'

    docAsData = []

    docIndex = 0
    while docIndex < doc.length
      firstByte   = doc[ docIndex ] // 256
      secondByte  = doc[ docIndex ] % 256
      docAsData.push firstByte
      docAsData.push secondByte
      docIndex++

    pixels = []
    pixel  = []
    pixels.push [2, 1, 3, 255]

    datumIndex = 0
    while datumIndex < docAsData.length
      pixel.push docAsData[ datumIndex ]
      if pixel.length is 3
        pixels.push pixel
        pixel = []
      datumIndex++

    if (pixel.length > 0) and (3 > pixel.length)
      while 3 > pixel.length
        pixel.push 83
    else
      pixel = [ 83, 83, 83 ]
    pixels.push pixel

    pixelIndex = 0
    while pixelIndex < pixels.length
      canvasPixel = ctx.createImageData 1, 1
      color       = canvasPixel.data
      color[0]    = pixels[ pixelIndex ][0]
      color[1]    = pixels[ pixelIndex ][1]
      color[2]    = pixels[ pixelIndex ][2]
      color[3]    = 255

      xCor = pixelIndex
      xCor = xCor // (lines.length * (characterHeight + lineSpace) + 64)
      yCor = pixelIndex
      yCor = yCor % (lines.length * (characterHeight + lineSpace) + 64)
      ctx.putImageData canvasPixel, xCor, yCor

      pixelIndex++


  keyEventDown: (event) ->
    justPressedKey = event.keyCode
    if not (justPressedKey in currentlyPressedKeys)
      currentlyPressedKeys.push event.keyCode
    @documentUpdate()
    event.preventDefault()


  keyEventUp: (event) ->
    indexToRemove = currentlyPressedKeys.indexOf event.keyCode
    currentlyPressedKeys.splice indexToRemove, 1


  onDragOver: (event) ->
    event.preventDefault()
    false


  fileLoad: (event) ->
    canvas = document.getElementById 'docCanvas'
    ctx    = canvas.getContext '2d'
    event.preventDefault()

    fileName = event.dataTransfer.files[0].name
    fileType = event.dataTransfer.files[0].type.slice 0, 5
    if fileType is 'image'
      imageReader = new FileReader
      imageReader.onloadend = ((theFile) =>
        fileName = theFile.name
        (e) ->
          imageToPaste = new Image()
          imageToPaste.src = e.target.result
          ctx.canvas.height = imageToPaste.height
          ctx.drawImage imageToPaste, 0, 0
          authenticChadtechDocument = false

          vertificatinData = ctx.getImageData 0, 0, 1, 1
          vertificatinData = vertificatinData.data
          verified = true
          if vertificatinData[0] isnt 2
            verified = false
          if vertificatinData[1] isnt 1
            verified = false
          if vertificatinData[2] isnt 3
            verified = false
          if verified
            document.title = fileName
            pixelData = []
            openedDoc = []

            pixelIndex = 1
            keepGrabbing = true

            while keepGrabbing
              xCor = pixelIndex // imageToPaste.height
              yCor = pixelIndex % imageToPaste.height
              thisPixel = ctx.getImageData xCor, yCor, 1, 1
              thisPixel = thisPixel.data

              colorIndex = 0
              while (colorIndex < 3) and keepGrabbing
                if thisPixel[ colorIndex ] is 83
                  keepGrabbing = false
                else
                  pixelData.push thisPixel[ colorIndex ]
                colorIndex++

              pixelIndex++

            firstByte   = undefined
            secondByte  = undefined
            pixelIndex  = 0
            while pixelIndex < pixelData.length
              if (pixelIndex % 2) is 0
                firstByte = pixelData[ pixelIndex ] * 256
              else
                secondByte = pixelData[ pixelIndex ]
                openedDoc.push (firstByte + secondByte)
              pixelIndex++

            doc = openedDoc
          else
            @draw()

      )( event.dataTransfer.files[0] )

      imageReader.readAsDataURL event.dataTransfer.files[0]


  keyDownThenDraw: (event) ->
    @keyEventDown(event)
    @draw()

  render: ->
    canvas
      id: 'docCanvas'
      style:
        position: 'absolute'
        top:      0
        left:     0
        width:    window.innerWidth
      # onKeyDown: @keyDownThenDraw


Index          = React.createElement Index
injectionPoint = document.getElementById 'content'
React.render Index, injectionPoint