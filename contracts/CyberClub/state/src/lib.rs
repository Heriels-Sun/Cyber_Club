#![no_std]
use io::*;
use gmeta::{metawasm, Metadata};
use gstd::{prelude::*, ActorId};

#[metawasm]
pub mod metafns {
    
    pub type State = <ProgramMetadata as Metadata>::State;

    pub fn state(state: State) -> IoCyberState {
        state
    }

    // Players functions Init --------------------------------------------
    pub fn get_players(state: State) -> Vec<(ActorId, CyberPlayer)> {
        state.players
    }

    pub fn get_player_by_id(state: State, id_player: ActorId) -> Option<CyberPlayer> {
        let players = state.players;
        for (id, player) in players {
            if id == id_player {
                return Some(player);
            }
        }
        None
    }
    // Players functions End ---------------------------------------------
    
}
