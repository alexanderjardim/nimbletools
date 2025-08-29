# Nimble tools: create character use case

- uses ./src/features/characters/services/data-loader.service.ts to load character classes, ancestries, and backgrounds (see more in services section)
- created characters are saved locally
- form state is saved in the local session, so user can come back later

## Create character multi-step form

### Choose character class
--- loads characters classes to show from ./src/features/characters/data/character-classes.data.ts
--- shows each class in a clickable area showing the class name, image and teaser text
--- user can choose one class by clicking on it
--- clicking on the "next" button goes to the next step

### Choose character ancestry
--- loads ancestries to show from ./src/features/characters/data/ancestries.data.ts
--- shows each ancestry in a clickable area showing the ancestry name, image and teaser text
--- user can choose one ancestry by clicking on it
--- clicking on the "next" button goes to the next step

### Choose character background
--- loads backgrounds to show from ./src/features/characters/data/backgrounds.data.ts


### Assign stats
--- shows the stats read from ./src/shared/constants/character.constants.ts
--- user can show which stats array to use from the following list:
---- standard: +2, +2, +0, -1
---- balanced: +2, +1, +1, +0
---- min-max: +3, +1, -1, -1
--- user selects the stat array to use
--- user distributes the chosen array between the stats
--- clicking on the "next" button goes to the next step  

### Assign skill point
--- shows the skills read from ./src/shared/constants/character.constants.ts
--- each skill has an input text controlled by '+', '-' arrows,
--- by the side of the each input text the total sum between the points assigned to that skill and the stat assigned to it is shown 
--- total of points that can be assigned is 4
--- user cannot assign negative points

### Fill in character sheet
--- user fill in the input texts name, height, weight, and age
--- Saves the character by clicking "Create character"

### save character
--- character is saved to local storage using the ./src/features/characters/services/character-storage.service.ts

