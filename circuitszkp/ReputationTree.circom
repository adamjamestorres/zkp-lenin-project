pragma circom 2.0.3;
 
include "./circomlib/circuits/poseidon.circom";
include "./circomlib/circuits/mux1.circom";

template MerkleTreeInclusionProof(height) {
    signal input leaf;
    signal input pathIndices[height];
    signal input siblings[height];

    signal output root;
		signal output leafHash;

    component poseidons[height];
    component mux[height];

    signal hashes[height + 1];
    hashes[0] <== leaf;

    for (var i = 0; i < height; i++) {
        pathIndices[i] * (1 - pathIndices[i]) === 0;

        poseidons[i] = Poseidon(2);
        mux[i] = MultiMux1(2);

        mux[i].c[0][0] <== hashes[i];
        mux[i].c[0][1] <== siblings[i];

        mux[i].c[1][0] <== siblings[i];
        mux[i].c[1][1] <== hashes[i];

        mux[i].s <== pathIndices[i];

        poseidons[i].inputs[0] <== mux[i].out[0];
        poseidons[i].inputs[1] <== mux[i].out[1];

        hashes[i + 1] <== poseidons[i].out;
    }

    root <== hashes[height];

		component poseidonLeaf;
		poseidonLeaf = Poseidon(1);
		poseidonLeaf.inputs[0] <== leaf;
		leafHash <== poseidonLeaf.out;
}

component main = MerkleTreeInclusionProof(10);