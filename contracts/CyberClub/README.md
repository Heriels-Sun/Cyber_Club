## How to Build this smart contract

This is the main smart contract for _Cyber Club_.
All you need to do to build it is follow the next steps.

**All the commands below are for Linux or Mac**

### Copy the Github repository

First you need to copy the repository of the proyect using the next command.
> Note: You need to have installed _git_

```shell
git clone https://github.com/Heriels-Sun/Cyber_Club.git
```

### ⚙️ Install Rust

You also need to have installed _Rust_, and the necessary tools for build

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

```shell
rustup toolchain add nightly

rustup target add wasm32-unknown-unknown --toolchain nightly
```

### 🏗️ Build Smart Contract

With all installed and with the repository, you must be in the right directory to build the smasrt contract.

```shell
cd contracts\CyberClub\
```

Now, you are ready to build the smart contract 👌

```shell
cargo build --release
```

### ✅ Run tests

Also, you can run all the test prepared for this smart contract 🧪

```shell
cargo test --release
```