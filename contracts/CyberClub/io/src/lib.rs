#![no_std]
use codec::{Decode, Encode};
use gmeta::{InOut, Metadata};
use gstd::{prelude::*, ActorId};
use scale_info::TypeInfo;


#[derive(Encode, Decode, TypeInfo)]
pub enum CyberMessageIn {
    // ============ USERS =================
    AddNewUser,
    ModifyUsername(String),
    ModifyUserLevel(Level),
    ModifyUserModule(Module),
    ModifyUserPoints(u64),
    FullRegisterUser(String),
    ModifyUserAttemps(u8),
    // ============ PROGRESS =================
    AddNewProgress(Level, Module, u8)
}

#[derive(Encode, Decode, TypeInfo)]
pub enum CyberMessageOut {
    // ============ USERS =================
    UserCreated,
    UsernameModified,
    UserLevelModified,
    UserModuleModified,
    UserPointsModified,
    UserFullRegistered,
    UserAttempsmodified,
    // ============ GAMES =================
    NewProgressAdded(bool)
}

#[derive(Default,Encode, Decode, TypeInfo, Debug)]
pub struct IoCyberState {
    pub players: Vec<(ActorId,CyberPlayer)>,
    pub sponsors: Vec<(ActorId,CyberSponsors)>
}

// ============ USERS INIT =================
#[derive(Encode, Decode, TypeInfo, Debug,Default,Clone)]
pub struct CyberPlayer {
    pub name: String,
    pub full_registered: bool,
    pub points: u64,  
    pub current_level: Level,
    pub current_module: Module,
    pub stadistics: Vec<CyberStadistics>,
    pub try_for_day: u8
}
// ============ USERS END =================

#[derive(Encode, Decode, TypeInfo, Debug,Default,Clone)]
pub enum Level {
    #[default]
    Begginer,
    Intermediate,
    Advanced
}

impl PartialEq for Level {
    fn eq(&self, other: &Self) -> bool {
        match (self, other) {
            (Level::Begginer, Level::Begginer)
            | (Level::Intermediate, Level::Intermediate)
            | (Level::Advanced, Level::Advanced) => true,
            _ => false,
        }
    }
}

#[derive(Encode, Decode, TypeInfo, Debug,Default,Clone)]
pub enum Module {
    #[default]
    First,
    Second,
    Third,
    Fourth,
    Fifth
}

#[derive( Clone, Encode, Decode, TypeInfo, Debug)]
pub struct CyberStadistics {
    pub level:  Level,
    pub module: Module,
    pub score:  u8
}

// ============ SPONSORS INIT =================
#[derive( Clone, Encode, Decode, TypeInfo, Debug)]
pub struct CyberSponsors {
    pub id:   u8,
    pub name: String,
}
// ============ SPONSORS END ==================

pub struct ProgramMetadata;

impl Metadata for ProgramMetadata {
    type Init = ();

    type Handle = InOut<CyberMessageIn, CyberMessageOut>;

    type Reply = ();

    type Others = ();

    type Signal = ();

    type State = IoCyberState;
}
