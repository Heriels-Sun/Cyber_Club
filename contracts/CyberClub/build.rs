
use io::ProgramMetadata;
use gear_wasm_builder::WasmBuilder;
use gmeta::Metadata;


fn main(){

   WasmBuilder::with_meta(ProgramMetadata::repr()).exclude_features(vec!["binary-vendor"]).build();
}