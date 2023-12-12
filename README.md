<!-- Description starts here -->

CyberClub is an educational game based on web3 technology built on Vara and designed to explore and understand the world of blockchain from basic to advanced level. With interactive and dynamic games, immersed in a carefully crafted interface that interactive with dynamic nft's. It immerses you in an exciting story that expands the educational experience, as you progress in your learning, you will receive rewards that will motivate you to continue exploring this fascinating blockchain universe.

<!-- End of description -->

This smart contracts are now live in the Vara Stabel Testnet 😄

<a style="color: #ffff00; font-size: 28px; text-decoration: none;" href="">
Cyber Club V0.1.2</a></br>

## Building Locally

You can build locally the smart contract in this branch, also, you can try the Front-End.
> Note: This commands works only on Linux 

### ⚙️ Install Rust

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### ⚒️ Add specific toolchains

```shell
rustup toolchain add nightly
rustup target add wasm32-unknown-unknown --toolchain nightly
```

### 🏗️ Build Smart Contract

```shell
cargo build --release
```

### ✅ Run tests

```shell
cargo test --release
```

### Build Front-End app

## Installing and Starting with yarn

```shell
yarn install

yarn start
```
