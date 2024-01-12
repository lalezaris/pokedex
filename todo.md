# MVP

- [x] setup application and repo
- [x] basic search form
  - filter list of pokemon
- [ ] pokemon details pane
  - display pokemon sprite, name, pokedex number
    - need to figure out how to handle for species with multiple varieties? (is_default flag?)
    - use front_default sprite
  - Highlight pokemon in list
    - pokeball marker or border?
    - grey pokeball hover state?
      - borders are easier for now

# Alpha

- [ ] track pokemon queries made in current session
  - update redux store to handle history
- [ ] add history view
  - Pokedex screen with list of previously viewed pokemon
  - Replace the search pane? Add tabs?
- [ ] re-visit old searches
  - interacting with history pane behaves simliar to search pane

# Backlog

- [ ] persist history across sessions
- [ ] basic pokemon information page
  - able to click on pokemon to view details
  - type, description, height, weight, etc
  - add router and basic navigation to navigate back to main/overview screen
- [ ] add abilities to details page
- [ ] attack moves to details page
- [ ] make it fancy
  - cleanup search box styles
  - scroll bar styles
  - maybe look like this: https://essentialsdocs.fandom.com/wiki/Pok%C3%A9dex?file=PokedexList.png
- [ ] info page

- [ ] evolution chain to details page
- [ ] species varieties to details page
- [ ] cleanup boilerplate code
- [x] setup linter
- [ ] global sass variables
- [ ] seen/owned counter?
  - blur names until viewed? then count as seen?
  - excuse to use redux?
- [ ] mobile friendly using css grid
  - as good a time as any to learn
- [ ] Update pokedex list marker to be pokeballs
  - seems cooler?
- [x] error state bug when there is an error selecting pokemon for details pane
  - The old sprite and name still appear, along with 'an error occurred'

# Won't do
