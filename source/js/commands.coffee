module.exports = (k) ->



  command = (necessaryConditions, triggers, precludingConditions, execution) ->
    output =
      necessaryConditions:  necessaryConditions
      triggers:             triggers
      precludingConditions: precludingConditions
      execution:            execution

  commands = [

    command [], [ k[ 'backspace'] ], [ k['ctrl'], k['shift'] ], =>




  ]

###
Some commands are repeated iterations of other commands. A 'mega' command is a command done 2 to the megaMagnitude times
The megaMagnitude can be changed by a command. 
###

commands.push new command([], [ ktkc[0]['backspace'] ], [
  ktkc[0]['ctrl']
  ktkc[0]['shift']
], ->
  rawDocument.splice currentCursorSpot - 1, 1
  currentCursorSpot -= 1
  return
)
commands.push new command([ ktkc[0]['ctrl'] ], [ ktkc[0]['backspace'] ], [], ->
  time = 0
  while time < 2 ** megaMagnitude
    commands[0].execution()
    time++
  return
)
# Naming a function 'delete' returns an error. So I named it 'reverse backspace' instead. This command is fn + backspace on mac
# and delete on PC
commands.push new command([], [ ktkc[0]['delete'] ], [], ->
  rawDocument.splice currentCursorSpot, 1
  return
)
commands.push new command([], [ ktkc[0]['left'] ], [ ktkc[0]['ctrl'] ], ->
  if currentCursorSpot > 0
    currentCursorSpot -= 1
  return
)
# Go right one character
commands.push new command([], [ ktkc[0]['right'] ], [ ktkc[0]['ctrl'] ], ->
  if currentCursorSpot < rawDocument.length
    currentCursorSpot += 1
  return
)
# Go one line up
commands.push new command([], [ ktkc[0]['up'] ], [
  ktkc[0]['alt']
  ktkc[0]['tab']
  ktkc[0]['tilda']
], ->
  if cursorsLine == 0
    currentCursorSpot = 0
  else
    if arrayOfLines[cursorsLine - 1].length > cursorInLine
      currentCursorSpot -= arrayOfLines[cursorsLine - 1].length + 1
    else
      currentCursorSpot -= cursorInLine + 1
  if currentCursorSpot < 0
    currentCursorSpot = 0
  return
)
commands.push new command([], [ ktkc[0]['down'] ], [
  ktkc[0]['alt']
  ktkc[0]['tab']
  ktkc[0]['tilda']
], ->
  if cursorsLine + 1 == arrayOfLines.length
    currentCursorSpot = rawDocument.length
  else
    if arrayOfLines[cursorsLine + 1].length < cursorInLine
      currentCursorSpot += arrayOfLines[cursorsLine].length - cursorInLine + arrayOfLines[cursorsLine + 1].length + 1
    else
      currentCursorSpot += arrayOfLines[cursorsLine].length + 1
  if currentCursorSpot > rawDocument.length
    currentCursorSpot = rawDocument.length
  return
)
commands.push new command([ ktkc[0]['ctrl'] ], [ ktkc[0]['left'] ], [], ->
  time = 0
  while time < 2 ** megaMagnitude
    commands[3].execution()
    time++
  return
)
commands.push new command([ ktkc[0]['ctrl'] ], [ ktkc[0]['right'] ], [], ->
  time = 0
  while time < 2 ** megaMagnitude
    commands[4].execution()
    time++
  return
)
commands.push new command([ ktkc[0]['alt'] ], [ ktkc[0]['up'] ], [], ->
  time = 0
  while time < 2 ** megaMagnitude
    commands[5].execution()
    time++
  return
)
commands.push new command([ ktkc[0]['alt'] ], [ ktkc[0]['down'] ], [], ->
  time = 0
  while time < 2 ** megaMagnitude
    commands[6].execution()
    time++
  return
)
commands.push new command([ ktkc[0]['tilda'] ], [ ktkc[0]['up'] ], [], ->
  lineSpace += 1
  return
)
commands.push new command([ ktkc[0]['tilda'] ], [ ktkc[0]['down'] ], [], ->
  lineSpace -= 1
  return
)
commands.push new command([ ktkc[0]['tilda'] ], [ ktkc[0]['equals'] ], [], ->
  megaMagnitude += 1
  return
)
commands.push new command([ ktkc[0]['tilda'] ], [ ktkc[0]['minus'] ], [], ->
  megaMagnitude -= 1
  return
)
commands.push new command([ ktkc[0]['alt'] ], [ ktkc[0]['g'] ], [], ->
  if currentlyPressedKeys.indexOf(ktkc[0]['greek']) == -1
    currentlyPressedKeys.push ktkc[0]['greek']
  else
    currentlyPressedKeys.splice currentlyPressedKeys.indexOf(ktkc[0]['greek']), 1
    commands[0].execution()
  return
)
commands.push new command([ ktkc[0]['alt'] ], [ ktkc[0]['s'] ], [], ->
  if currentlyPressedKeys.indexOf(ktkc[0]['slanty']) == -1
    currentlyPressedKeys.push ktkc[0]['slanty']
  else
    currentlyPressedKeys.splice currentlyPressedKeys.indexOf(ktkc[0]['slanty']), 1
    commands[0].execution()
  return
)
commands.push new command([ ktkc[0]['tab'] ], [ ktkc[0]['up'] ], [], ->
  if scriptVariety[0] == true
    scriptVariety[0] = false
    scriptVariety[1] = true
  else
    scriptVariety[0] = true
  return
)
commands.push new command([ ktkc[0]['tab'] ], [ ktkc[0]['down'] ], [], ->
  if scriptVariety[0] == true
    scriptVariety[0] = false
    scriptVariety[1] = false
  else
    scriptVariety[0] = true
  return
)