# MVP

- [x] setup application and repo
- [x] basic search form
  - filter list of pokemon
- [x] pokemon details pane
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

- [ ] cleanup boilerplate code
- [ ] expand documentation (readme)
- [ ] persist history across sessions
- [ ] basic pokemon information page
  - able to click on pokemon to view details
  - type, description, height, weight, etc
  - add router and basic navigation to navigate back to main/overview screen
- [ ] add abilities to details page
- [ ] attack moves to details page
- [ ] evolution chain to details page
- [ ] species varieties to details page
- [ ] make it fancier
  - cleanup search box styles
  - scroll bar styles
  - maybe look like this: https://essentialsdocs.fandom.com/wiki/Pok%C3%A9dex?file=PokedexList.png
- [ ] mobile friendly using css grid
  - as good a time as any to learn
- [ ] Move error and loading components to common (from Search)
- [ ] Update pokedex list marker to be pokeballs
  - seems cooler?
- [ ] create sass variables for border-widths and things like that
- [x] global sass variables
- [x] error state bug when there is an error selecting pokemon for details pane
  - The old sprite and name still appear, along with 'an error occurred'
- [x] setup linter

# Won't do

- [ ] seen/owned counter?
  - blur names until viewed? then count as seen?
  - excuse to use redux?
- [ ] Update names in pokedex list to use pokemon-details?
  - To prevent the hyphens, but will make 1025 calls to get the non-hyphened names
  - API limitation, maybe switching to graphql beta endpoint helps?
  - e.g. Type-Null, Iron Treads
