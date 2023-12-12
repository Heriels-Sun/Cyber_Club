#![no_std]
use cyberclub_io::*;
use gmeta::metawasm;
use gstd::{prelude::*, ActorId};

#[metawasm]
pub mod metafns {
    pub type State = CyberState;

    // Players functions Init --------------------------------------------
    pub fn get_players(state: State) -> Vec<CyberPlayer> {
        state.players
    }

    pub fn get_player_by_id(state: State, id: ActorId) -> Option<CyberPlayer> {
        let players = state.players;
        players.into_iter().find(|w| w.id == id)
    }
    // Players functions End ---------------------------------------------

    // Games functions Init ----------------------------------------------
    pub fn get_games(state: State) -> Vec<CyberGames> {
        state.games
    }

    pub fn get_game_by_name(state: State, name: String) -> Option<CyberGames> {
        let games = state.games;
        games.into_iter().find(|w| w.name == name)
    }

    pub fn get_game_level(state: State, game_name: String, level: String) -> Option<CyberLevels> {
        let all_games = state.games;
        let game = all_games.into_iter().find(|w| w.name == game_name);
        let game_levels = game.unwrap().levels;
        game_levels.into_iter().find(|w| w.name == level)
    }

    pub fn get_game_module(state: State, game_name: String, level: String, module: u8) -> Option<CyberModules> {
        let all_games = state.games;
        let game = all_games.into_iter().find(|w| w.name == game_name);
        let game_levels = game.unwrap().levels;
        let level = game_levels.into_iter().find(|w| w.name == level);
        let all_modules = level.unwrap().modules;
        all_modules.into_iter().find(|w| w.level == module)
    }

    // Games functions End -----------------------------------------------

    // Sponsors functions Init -------------------------------------------
    pub fn get_sponsors(state: State) -> Vec<CyberSponsors> {
        state.sponsors
    }

    pub fn get_sponsors_by_id(state: State, id: u8) -> Option<CyberSponsors> {
        let sponsors = state.sponsors;
        sponsors.into_iter().find(|w| w.id == id)
    }
    // Sponsors functions End --------------------------------------------

}
