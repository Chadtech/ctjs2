characterWidth = 11
characterHeight = 19

xMargin = 8 * characterWidth
yMargin = 2 * characterHeight
lineSpace = 8
scriptVariety = [ true, true ]
doc                     = []
currentCursorSpot       = 0
justPressedKey          = undefined
currentlyPressedKeys    = []
words            = []
arrayOfLines            = []
arrayOfPages            = []
cursorsLine             = 0
cursorInLine            = 0
lineLength  = 0
lineLength              = (window.innerWidth - (xMargin * 2 )) // 2
characterInWord = 0

# A dictionary returning numbers based off the name of the key pressed. These are the key codes for each key.
Keys =
  'backspace':      8
  'tab':            9
  'enter':          13
  'shift':          16
  'ctrl':           17
  'alt':            18
  'caps lock':      20
  'escape':         27
  'space':          32
  'left':           37
  'up':             38
  'right':          39
  'down':           40
  'delete':         46
  '0':              48
  '1':              49
  '2':              50
  '3':              51
  '4':              52
  '5':              53
  '6':              54
  '7':              55
  '8':              56
  '9':              57
  'a':              65
  'b':              66
  'c':              67
  'd':              68
  'e':              69
  'f':              70
  'g':              71
  'h':              72
  'i':              73
  'j':              74
  'k':              75
  'l':              76
  'm':              77
  'n':              78
  'o':              79
  'p':              80
  'q':              81
  'r':              82
  's':              83
  't':              84
  'u':              85
  'v':              86
  'w':              87
  'x':              88
  'y':              89
  'z':              90
  'left command':   91
  'right command':  93
  'numpad0':        96
  'numpad1':        97
  'numpad2':        98
  'numpad3':        99
  'numpad4':        100
  'numpad5':        101
  'numpad6':        102
  'numpad7':        103
  'numpad8':        104
  'numpad9':        105
  'f1':             112
  'f2':             113
  'f3':             114
  'f4':             115
  'f5':             116
  'f6':             117
  'f7':             118
  'f8':             119
  'f9':             120
  'f10':            121
  'f11':            122
  'f12':            123
  'semicolon':      186
  'equals':         187
  'comma':          188
  'minus':          189
  'period':         190
  'forward slash':  191
  'tilda':          192
  'left bracket':   219
  'back slash':     220
  'right bracket':  221
  'single quote':   222

for key in Object.keys(Keys)
  Keys[ Keys[key] ] = key





convertCharacterListToWordList = (doc) ->
  words = [ [ ] ]
  docIndex = 0
  while docIndex < doc.length
    
    switch doc[ docIndex ]
      when 52
        words[ words.length - 1 ].push doc[ docIndex ]
        words.push []
      when 53
        words.push [ 53 ]
        words.push [ ]
      else
        words[ words.length - 1 ].push doc[ docIndex ]

    if docIndex is (currentCursorSpot - 1)
      wordCursorIsIn = words.length - 1
      characterInWord = words[ words.length - 1 ].length - 1
    if currentCursorSpot is 0
        cursorInLine = 0

    docIndex++

  words


convertWordListToLineList = (words) ->
  lines = [ [] ]
  lineLength = 0
  wordIndex = 0
  while wordIndex < words.length
    if words[ wordIndex ].length
      if words[ wordIndex ][0] is 53
        lines.push []
        lineLength = 0
      else
        if (lineLength + words[wordIndex].length) < lineLength
          lines[ lines.length - 1 ].push words[ wordIndex ]
          lineLength += words[ wordIndex ].length
        else
          lines.push []
          lines[ lines.length - 1 ].push words[ wordIndex ]
          lineLength = words[ wordIndex ].length

    if wordCursorIsIn is wordIndex
      cursorsLine = lines.length - 1
      cursorInLine = lineLength - (words[ wordIndex ] - characterInWord - 1)

    wordIndex++

  lines


convertLinesToCharacterLists = (lines) ->
  lineIndex = 0
  while lineIndex < lines.length
    thisLine = []
    for word in lines[ lineIndex ]
      for character in word
        thisLine.push character
    lines[ lineIndex ] = thisLine

  lines



organizeWords = (doc) ->
  words = convertCharacterListToWordList doc
  lines = convertWordListToLineList words
  lines = convertLinesToCharacterLists lines

  lines



draw = ->
  if currentCursorSpot < 0
    currentCursorSpot = 0
  canvas = document.getElementById 'docCanvas'
  ctx    = canvas.getContext '2d'
  ctx.cavnas.width = window.innerWidth
  if windoer.innerHeight < lines.length * (characterHeight + lineSpace) + 64
    ctx.canvas.height = lines.length * (characterHeight + lineSpace) + 64
  else
    ctx.canvas.height = window.innerHeight

  if lines.length * (characterHeight + lineSpace) + 64 - (window.pageYOffset + yMargin + cursorsLine * (characterHeight + lineSpace)) < 124
    if currentlyPressedKeys.length
      window.scrollBy 0, characterHeight + lineSpace

  organizeWords()
  ctx.fillStyle = '#000000'
  if window.innerHeight > lines.length * (characterHeight + lineSpace) + 64
    ctx.fillRect 0, 0, window.innerWidth, window.innerHeight
  else
    ctx.fillRect 0, 0, window.innerWidth, lines.length * (characterHeight + lineSpace) + 64

  lineIndex = 0
  while lineIndex < lines.length
    charIndex = 0
    while charIndex < lines[ lineIndex].length
      thisImage = characters[ lines[ lineIndex ][ charIndex ]].bigImage
      xCor = (charIndex * characterWidth) + xMargin
      yCor = ((lineSpace + characterHeight) * lineIndex) + yMargin
      ctx.drawImage thisImage, xCor, yCor
      charIndex++
    lineIndex++

  xCor = cursorInLine * characterWidth + xMargin
  yCor = cursorsLine * (characterHeight + lineSpace) + yMargin
  ctx.drawImage cursorImage, xCor, yCor
  
  writeData()



documentUpdate = (doc) ->
  keepGoing = true
  charIndex = 0
  while (charIndex < characters.length) and keepGoing 
    triggerIndex = 0
    thisChar = characters[ charIndex ]
    while triggerIndex < characters[ charIndex ].triggers.length
      
      passedNecessaryConditions = true
      necCondIndex = 0
      while necCondIndex < thisChar.necessaryConditions.length
        thisCondition = thisChar.necessaryConditions[ necCondIndex ]
        if not (currentlyPressedKeys in thisCondition)
          passedNecessaryConditions = false
        necCondIndex++

      passedPrecludingConditions = true
      preClCondIndex = 0
      while preClCondIndex < thisChar.precludingConditions.length
        thisCondition = thisChar.precludingConditions[ preClCondIndex]
        if currentlyPressedKeys in thisCondition
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

writeData = (doc) ->
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
    datumIndex++


  if (pixel.length > 0) and (3 > pixel.length)
    while 3 > pixel.length
      pixel.push 83
  else
    pixel = [ 83, 83, 83]
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

onMouseDown = (evnet) ->
  xCor = event.clientX
  yCor = event.clientY

  leftOfRightEdge = xCor < (window.innerWidth - xMargin)
  rightOfLeftEdge = xMargin < xCor
  withHorizontal  = leftOfRightEdge and rightOfLeftEdge

  AboveBottomEdge = yCor < (window.innerHeight - yMargin)
  BelowTopEdge    = yMargin < yCor
  withinVertical  = AboveBottomEdge and BelowTopEdge

  if withHorizontal and withinVertical
    lineHeight = characterHeight + lineSpace
    whichLineInDoc = (ySpot + window.pageYOffset) 
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

      draw()

keyEventDown = (event) ->
  console.log 'DOPE!'
  console.log event
  justPressedKey = event.keyCode
  if not (justPressedKey in currentlyPressedKeys)
    currentlyPressedKeys.push event.keyCode
  documentUpdate()
  event.preventDefault()


keyEventUp = (event) ->
  indexToRemove = currentlyPressedKeys.indexOf event.keyCode
  currentlyPressedKeys.splice indexToRemove, 1


onDragOver = (event) ->
  event.preventDefault()
  false


fileLoad = (event) ->
  canvas = document.getElementById 'docCanvas'
  ctx    = canvas.getContext '2d'
  event.preventDefault()

  fileName = event.dataTransfer.files[0].name
  fileType = event.dataTransfer.files[0].type.slice 0, 5
  if fileType is 'image'
    imageReader = new FileReader

    loadEnd = ((theFile) ->
      fileName = theFile.name
      (e) ->
        imageToPaste = new image
        imageToPaste.src e.target.result
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
          counter = 0
          while keepGrabbing and (counter < 4000)
            xCor = pixelIndex // imageToPaste.height
            yCor = pixelIndex % imageToPaste.height
            thisPixel = ctx.getImageData xCor, yCor, 1, 1
            thisPixel = thisPixel.data

            colorIndex = 0
            while (colorIndex < 3) and keepGrabbing
              if thisPixel[ pixelIndex ] is 83
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
          draw()

    )( event.dataTransfer.files[0] )
    imageReader.readAsDataURL event.dataTransfer.files[0]

    # imageReader.onloadend = ()

keyDownThenDraw = (event) ->
  keyEventDown(event)
  draw()


Body = document.getElementsByTagName 'body'
Body = Body[0]
console.log draw
Body.addEventListener 'onLoad',       draw
Body.addEventListener 'ondragover',   onDragOver
Body.addEventListener 'ondrop',       fileLoad
Body.addEventListener 'onkeydown',    keyDownThenDraw
Body.addEventListener 'onmousedown',  onMouseDown
Body.addEventListener 'onresize',     draw
Body.addEventListener 'onkeyup',      keyEventUp
# Body.addEventListener ''











