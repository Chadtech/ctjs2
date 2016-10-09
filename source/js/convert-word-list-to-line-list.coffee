module.exports = (words, wordCursorIsIn) ->
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