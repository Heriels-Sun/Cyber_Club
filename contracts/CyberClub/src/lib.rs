#![no_std]
use cyberclub_io::{CyberMessageIn, CyberMessageOut, CyberPlayer, CyberState, CyberGames};
use gstd::{debug, msg, prelude::*,};

static mut STATE: Option<CyberState> = None;

#[no_mangle]
extern "C" fn init() {
    let init_state: CyberState = CyberState { 
        players:  Vec::new(), 
        games:     Vec::new(), 
        sponsors:  Vec::new() 
    };
    unsafe { STATE = Some(init_state)}
}

#[no_mangle]
extern "C" fn handle() {

    let _event: CyberMessageIn = msg::load().expect("Error while loading the event in handle");  // Loads the payload message
    let actor_id = msg::source();

    match _event {
        // --------------------------- USER MESSAGES INIT ---------------------
        CyberMessageIn::AddNewUser => {
            let my_mut_state = state_mut();
            if  my_mut_state.players.iter().any(|p| p.id == actor_id) {
                debug!("The player with id : {:?}, is already registered", actor_id);
            } else {
                debug!("A new user will be added with actor Id: {:?}", actor_id);
                let new_player: CyberPlayer = CyberPlayer {
                    id:            actor_id,
                    name:          "".to_string(),
                    points:        0,
                    current_level: "Begginer".to_string(),
                    full_registered: false,
                };
                my_mut_state.players.push(new_player);
            }
            msg::reply(CyberMessageOut::UserCreated, 0)
                .expect("Error adding the user");
            debug!("The struct is : {:?}", my_mut_state);
        }
        CyberMessageIn::FullRegisterUser(username) => {
            debug!("The user with actor Id: {:?} will be modified", actor_id);
            let my_mut_state = state_mut();
            for player in my_mut_state.players.iter_mut() {
                if player.id == actor_id {
                    player.name            = username.to_string();
                    player.full_registered = true;
                }
            }
            msg::reply(CyberMessageOut::UsernameModified, 0)
                .expect("Error modifing the username");
            debug!("The struct is : {:?}", my_mut_state);
        }
        CyberMessageIn::ModifyUsername(username) => {
            debug!("The user with actor Id: {:?} will be modified", actor_id);
            let my_mut_state = state_mut();
            for player in my_mut_state.players.iter_mut() {
                if player.id == actor_id {
                    player.name = username.to_string();
                }
            }
            msg::reply(CyberMessageOut::UsernameModified, 0)
                .expect("Error modifing the username");
            debug!("The struct is : {:?}", my_mut_state);
        }
        CyberMessageIn::ModifyUserLevel(level) => {
            debug!("The user with actor Id: {:?} will be modified", actor_id);
            let my_mut_state = state_mut();
            for player in my_mut_state.players.iter_mut() {
                if player.id == actor_id {
                    player.current_level = level.to_string();
                }
            }
            msg::reply(CyberMessageOut::UserLevelModified, 0)
                .expect("Error modifing the user level");
            debug!("The struct is : {:?}", my_mut_state);
        }
        CyberMessageIn::ModifyUserPoints(points) => {
            debug!("The user with actor Id: {:?} will be modified", actor_id);
            let my_mut_state = state_mut();
            for player in my_mut_state.players.iter_mut() {
                if player.id == actor_id {
                    player.points = points;
                }
            }
            msg::reply(CyberMessageOut::UserPointsModified, 0)
                .expect("Error modifing the user points");
            debug!("The struct is : {:?}", my_mut_state);
        }
        // --------------------------- USER MESSAGES END ---------------------
        CyberMessageIn::AddNewGame(game_name, game_levels) => {
            debug!("The game with name: {:?} will be added", game_name);
            let my_mut_state = state_mut();
            my_mut_state.games = vec![CyberGames { name: game_name, levels: vec![game_levels] }];
            msg::reply(CyberMessageOut::GameCreated, 0)
                .expect("Error adding the game");
            debug!("The struct is : {:?}", my_mut_state);
        }
    }
}

// =============================== GET MUT STATE ===========================================
fn state_mut() -> &'static mut CyberState { // This function give us the mut state
    let _state = unsafe { STATE.as_mut() };
    unsafe { _state.unwrap_unchecked()}
}
// =========================================================================================

// =============================== STATE ==============================================

#[no_mangle]
extern "C" fn state() {
    let state = unsafe { STATE.as_ref()}
        .expect("The contract is not initialized") ;

    msg::reply(state, 0)
        .expect("Failed to share state");
}

// ====================================================================================

