function musicPlayer(params){
  el = params.el || document.body
  files = params.files || []
  color = Object.assign({}, {background: '#fff', main: '#000', font: '#C2C2C4'}, params.color)

  _createPlayer()

  function _createPlayer() {
    let player = document.createElement('div')
    let player_container = document.createElement('div')
    let player_control = document.createElement('div')
    let player_volume = document.createElement('div')
    let player_list = document.createElement('div')
    // structure
    player.appendChild(player_container)
    player_container.appendChild(player_control)
    player_container.appendChild(player_volume)
    player_container.appendChild(player_list)
    // add some class
    player.classList.add('player')
    player_container.classList.add('player-container')
    player_control.classList.add('player-control')
    player_volume.classList.add('player-volume')
    player_list.classList.add('player-list')

    el.appendChild(player)

    _addStyleForPlayer(player)
  }

  function _progress(){}
}