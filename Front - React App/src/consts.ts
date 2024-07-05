import { HexString } from "@gear-js/api";

const ADDRESS = {
  NODE: process.env.REACT_APP_NODE_ADDRESS as string,
};

const LOCAL_STORAGE = {
  ACCOUNT: 'account',
};

export { ADDRESS, LOCAL_STORAGE };

interface ContractData {
  programId: HexString,
  metadata: string
};

export const SPONSOR_MNEMONIC = 'badge account tiny language purity panel equip ignore topic spell urge question';
export const SPONSOR_NAME = 'pruebawallet2';

export const MAIN_CONTRACT: ContractData = {
  programId: '0xe69727180e6a43860f5195c7023052766baad4938400f44e6be709a89e5f087f',
  metadata: '00010000000100000000010600000000000000010800000041114c000808696f3843796265724d657373616765496e000120284164644e657755736572000000384d6f64696679557365726e616d650400040118537472696e670001003c4d6f64696679557365724c6576656c04000801144c6576656c000200404d6f64696679557365724d6f64756c6504000c01184d6f64756c65000300404d6f6469667955736572506f696e7473040010010c7536340004004046756c6c5265676973746572557365720400040118537472696e67000500444d6f6469667955736572417474656d707304001401087538000600384164644e657750726f67726573730c000801144c6576656c00000c01184d6f64756c650000140108753800070000040000050200080808696f144c6576656c00010c2042656767696e657200000030496e7465726d65646961746500010020416476616e636564000200000c0808696f184d6f64756c65000114144669727374000000185365636f6e6400010014546869726400020018466f7572746800030014466966746800040000100000050600140000050300180808696f3c43796265724d6573736167654f75740001202c557365724372656174656400000040557365726e616d654d6f64696669656400010044557365724c6576656c4d6f64696669656400020048557365724d6f64756c654d6f6469666965640003004855736572506f696e74734d6f646966696564000400485573657246756c6c526567697374657265640005004c55736572417474656d70736d6f646966696564000600404e657750726f6772657373416464656404001c0110626f6f6c000700001c0000050000200808696f30496f43796265725374617465000008011c706c617965727324016c5665633c284163746f7249642c204379626572506c61796572293e00012073706f6e736f72734001745665633c284163746f7249642c20437962657253706f6e736f7273293e000024000002280028000004082c34002c10106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004003001205b75383b2033325d000030000003200000001400340808696f2c4379626572506c6179657200001c01106e616d65040118537472696e6700013c66756c6c5f726567697374657265641c0110626f6f6c000118706f696e747310010c75363400013463757272656e745f6c6576656c0801144c6576656c00013863757272656e745f6d6f64756c650c01184d6f64756c65000128737461646973746963733801505665633c4379626572537461646973746963733e00012c7472795f666f725f64617914010875380000380000023c003c0808696f3c43796265725374616469737469637300000c01146c6576656c0801144c6576656c0001186d6f64756c650c01184d6f64756c6500011473636f72651401087538000040000002440044000004082c4800480808696f34437962657253706f6e736f72730000080108696414010875380001106e616d65040118537472696e670000'
}
