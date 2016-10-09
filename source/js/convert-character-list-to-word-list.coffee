module.exports = (doc, currentCursorSpot) =>
  words          = [ [ ] ]
  wordCursorIsIn = undefined
  docIndex       = 0
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
      wordCursorIsIn  = words.length - 1
      characterInWord = words[ words.length - 1 ].length - 1
    if currentCursorSpot is 0
      cursorInLine = 0

    docIndex++

  output =
    words:          words
    wordCursorIsIn: wordCursorIsIn
    cursorInLine:   cursorInLine