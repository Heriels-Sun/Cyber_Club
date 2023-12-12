#![no_std]

use codec::{Decode, Encode};
use gmeta::{InOut, Metadata, Out};
use gstd::{prelude::*, ActorId};
use scale_info::TypeInfo;
pub struct ProgramMetadata;

impl Metadata for ProgramMetadata {
    type Init = ();

    type Handle = InOut<CyberMessageIn, CyberMessageOut>;

    type Reply = ();

    type Others = ();

    type Signal = ();

    type State = Out<CyberState>;
}

#[derive(Encode, Decode, TypeInfo)]
pub enum CyberMessageIn {
    // ============ USERS =================
    AddNewUser,
    ModifyUsername(String),
    ModifyUserLevel(String),
    ModifyUserPoints(u64),
    FullRegisterUser(String),
    // ============ GAMES =================
    AddNewGame(String, CyberLevels),
}

#[derive(Encode, Decode, TypeInfo)]
pub enum CyberMessageOut {
    // ============ USERS =================
    UserCreated,
    UsernameModified,
    UserLevelModified,
    UserPointsModified,
    UserFullRegistered,
    // ============ GAMES =================
    GameCreated,
}

#[derive(Encode, Decode, TypeInfo, Debug)]
pub struct CyberState {
    pub players: Vec<CyberPlayer>,
    pub games: Vec<CyberGames>,
    pub sponsors: Vec<CyberSponsors>
}

// ============ USERS INIT =================
#[derive(Encode, Decode, TypeInfo, Debug)]
pub struct CyberPlayer {
    pub id: ActorId,
    pub name: String,
    pub full_registered: bool,
    pub points: u64,  
    pub current_level: String
}
// ============ USERS END =================

// ============ GAMES INIT =================
#[derive(Encode, Decode, TypeInfo, Debug)]
pub struct CyberGames {
    pub name: String,
    pub levels: Vec<CyberLevels>,
}

#[derive(Encode, Decode, TypeInfo, Debug)]
pub struct CyberLevels {
    pub name: String,               // Ex. "Begginer"
    pub modules: Vec<CyberModules>,
}

#[derive(Encode, Decode, TypeInfo, Debug)]
pub struct CyberModules {
    pub name: String,
    pub level: u8
    //pub questions: Vec<CyberQuestion>,
}
// ============ GAMES END =================

// ============ SPONSORS INIT =================
#[derive(Encode, Decode, TypeInfo, Debug)]
pub struct CyberSponsors {
    pub id:   u8,
    pub name: String,
}
// ============ SPONSORS END =================
