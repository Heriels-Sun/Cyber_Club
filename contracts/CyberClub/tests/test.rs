use io::{CyberMessageIn, CyberMessageOut};
use gtest::{Log, Program, System};

#[test]
fn test_users() {
    let sys = System::new();
    sys.init_logger();
    let program = Program::current(&sys);
    program.send(2, String::from("INIT MESSAGE"));

    let _res = program.send(2, CyberMessageIn::AddNewUser);
    let expected_log = Log::builder()
    .dest(2)
    .payload(CyberMessageOut::UserCreated);
    assert!(_res.contains(&expected_log));

    let _res = program.send(2, CyberMessageIn::AddNewUser);
    let expected_log = Log::builder()
    .dest(2)
    .payload(CyberMessageOut::UserCreated);
    assert!(_res.contains(&expected_log));

    let _res = program.send(2, CyberMessageIn::ModifyUsername("Sofia".to_string()));
    let expected_log = Log::builder()
    .dest(2)
    .payload(CyberMessageOut::UsernameModified);
    assert!(_res.contains(&expected_log));

    let _res = program.send(2, CyberMessageIn::ModifyUserPoints(10));
    let expected_log = Log::builder()
    .dest(2)
    .payload(CyberMessageOut::UserPointsModified);
    assert!(_res.contains(&expected_log));

    let _res = program.send(2, CyberMessageIn::ModifyUserLevel(io::Level::Begginer));
    let expected_log = Log::builder()
    .dest(2)
    .payload(CyberMessageOut::UserLevelModified);
    assert!(_res.contains(&expected_log));

    let _res = program.send(2, CyberMessageIn::ModifyUserModule(io::Module::Second));
    let expected_log = Log::builder()
    .dest(2)
    .payload(CyberMessageOut::UserModuleModified);
    assert!(_res.contains(&expected_log));

}

#[test]
fn test_progress() {

    let sys = System::new();
    sys.init_logger();
    let program = Program::current(&sys);
    program.send(2, String::from("INIT MESSAGE"));

    let _res = program.send(2, CyberMessageIn::AddNewUser);
    let expected_log = Log::builder()
    .dest(2)
    .payload(CyberMessageOut::UserCreated);
    assert!(_res.contains(&expected_log));

    let _res = program.send(2, CyberMessageIn::AddNewProgress(io::Level::Begginer, io::Module::Second, 60));
    let expected_log = Log::builder()
    .dest(2)
    .payload(CyberMessageOut::NewProgressAdded(true));
    assert!(_res.contains(&expected_log));
}
