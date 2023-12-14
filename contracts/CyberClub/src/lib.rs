
#![no_std]
use io::*;
use gstd::{debug, msg, prelude::*,ActorId};
use hashbrown::HashMap;

static mut STATE: Option<CyberState> = None;
// static MAX_POINTS: u8 = 100;

#[derive(Clone, Default, Debug)]
pub struct CyberState {
    pub players: HashMap<ActorId,CyberPlayer>,
    pub sponsors: HashMap<ActorId,CyberSponsors>
}

#[no_mangle]
extern "C" fn init() {
    let init_state: CyberState = CyberState { 
        ..Default::default()
    };
    unsafe { STATE = Some(init_state)}
}

#[no_mangle]
extern "C" fn handle() {

    let event = msg::load().expect("Error while loading the event in handle");  // Loads the payload message

    let _actor_id = msg::source();


    match event {
        // --------------------------- USER MESSAGES INIT ---------------------
        CyberMessageIn::AddNewUser => {
            let my_mut_state = state_mut();
       
           my_mut_state.players
            .entry(msg::source())
            .or_insert(
                CyberPlayer {
                    name:            "".to_string(),
                    points:          0,
                    current_level:   Level::Begginer,
                    current_module:  Module::First,
                    full_registered: false,
                    stadistics:      Vec::new(),
                    try_for_day:     3,
        });
            msg::reply(CyberMessageOut::UserCreated, 0)
                .expect("Error adding the user");
            debug!("The struct is : {:?}", my_mut_state);
        }
        CyberMessageIn::FullRegisterUser(username) => {
          
           let my_mut_state = state_mut();
       
           my_mut_state.players
           .entry(msg::source())
           .and_modify(|player| {
                player.name = username.to_string();
                player.full_registered = true;
              
           })
           .or_insert(
            CyberPlayer {
                name:            username.to_string(),
                points:          0,
                current_level:   Level::Begginer,
                current_module:  Module::First,
                full_registered: true,
                stadistics:      Vec::new(),
                try_for_day:     3,
           });
          
            msg::reply(CyberMessageOut::UsernameModified, 0)
                .expect("Error modifing the username");
            debug!("The struct is : {:?}", my_mut_state);
        }
        CyberMessageIn::ModifyUsername(username) => {

            let my_mut_state = state_mut();
       
           my_mut_state.players
           .entry(msg::source())
           .and_modify(|player| {
                player.name = username.to_string();
               
           })
           .or_insert(
            CyberPlayer {
                name:            username.to_string(),
                points:          0,
                current_level:   Level::Begginer,
                current_module:  Module::First,
                full_registered: false,
                stadistics:      Vec::new(),
                try_for_day:     3,
           });
           
            msg::reply(CyberMessageOut::UsernameModified, 0)
                .expect("Error modifing the username");
            debug!("The struct is : {:?}", my_mut_state);
        }
        CyberMessageIn::ModifyUserLevel(level) => {

            let my_mut_state = state_mut();
       
            my_mut_state.players
            .entry(msg::source())
            .and_modify(|player| {
                player.current_level = level;
                
            })
            .or_insert(
             CyberPlayer {
                current_level : Level::Begginer,
                    ..Default::default()
            });
           
            msg::reply(CyberMessageOut::UserLevelModified, 0)
                .expect("Error modifing the current user level");
            debug!("The struct is : {:?}", my_mut_state);
        }
        CyberMessageIn::ModifyUserPoints(points) => {

            let my_mut_state = state_mut();
       
            my_mut_state.players
            .entry(msg::source())
            .and_modify(|player| {
                player.points = points;
                
            })
            .or_insert(
             CyberPlayer {
                points : points,
                    ..Default::default()
            });
           
            msg::reply(CyberMessageOut::UserPointsModified, 0)
                .expect("Error modifing the current user points");
            debug!("The struct is : {:?}", my_mut_state);
        }
        CyberMessageIn::ModifyUserModule(module) => {

            let my_mut_state = state_mut();
       
            my_mut_state.players
            .entry(msg::source())
            .and_modify(|player| {
                player.current_module = module;

            })
            .or_insert(
             CyberPlayer {
                current_module : Module::First,
                    ..Default::default()
            });
           
            msg::reply(CyberMessageOut::UserModuleModified, 0)
                .expect("Error modifing the current user module");
            debug!("The struct is : {:?}", my_mut_state);

        }

        CyberMessageIn::ModifyUserAttemps(attemps) => {

            let my_mut_state = state_mut();
       
            my_mut_state.players
            .entry(msg::source())
            .and_modify(|player| {
                player.try_for_day = attemps;

            })
            .or_insert(
             CyberPlayer {
                try_for_day : attemps,
                    ..Default::default()
            });
           
            msg::reply(CyberMessageOut::UserAttempsmodified, 0)
                .expect("Error modifing the current user atemps");
            debug!("The struct is : {:?}", my_mut_state);

        }
        // --------------------------- USER MESSAGES END ---------------------
        CyberMessageIn::AddNewProgress(level_completed, module_completed, score_obtained) => {

            let my_mut_state = state_mut();
            my_mut_state.players
            .entry(msg::source())
            .and_modify(|player| {
                if player.try_for_day != 0 {
                    player.try_for_day -= 1;
                    if player.current_level != level_completed.clone() {
                        player.current_level = level_completed.clone();
                    }
                    player.current_module = module_completed.clone();
                    player.stadistics.push(CyberStadistics { level: level_completed.clone(), module: module_completed.clone(), score: score_obtained.clone() });
                    add_user_points(player, score_obtained.into());
                }
            })
            .or_insert(
             CyberPlayer {
                stadistics : vec![CyberStadistics { level: level_completed, module: module_completed, score: score_obtained }],
                    ..Default::default()
            });
           
            msg::reply(CyberMessageOut::NewProgressAdded(true), 0)
                .expect("Error modifing the current user module");
            debug!("The struct is : {:?}", my_mut_state);
        },
    }
}

fn add_user_points(player: &mut CyberPlayer, points: u64) {
    if points != 0 {
        player.points += points;
    }
}

// =============================== GET MUT STATE ===========================================
fn state_mut() -> &'static mut CyberState { // This function give us the mut state
    let state = unsafe { STATE.as_mut() };
    unsafe { state.unwrap_unchecked() }
}
// =========================================================================================

// =============================== STATE ==============================================
// 5. Create the state() function of your contract.
#[no_mangle]
extern "C" fn state() {
    let state = unsafe { STATE.take().expect("Unexpected error in taking state") };
    msg::reply::<IoCyberState>(state.into(), 0)
    .expect("Failed to encode or reply  from `state()`");
}

impl From<CyberState> for IoCyberState {
    fn from(value: CyberState) -> Self {

    let CyberState {

        players,
        sponsors

    } = value;

    let players = players.iter().map(|(k, v)| (*k, v.clone())).collect();
    let sponsors = sponsors.iter().map(|(k, v)| (*k, v.clone())).collect();

    Self {
        players,
        sponsors
    }

}
}