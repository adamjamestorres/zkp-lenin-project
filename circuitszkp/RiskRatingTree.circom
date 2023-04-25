pragma circom 2.0.3;

include "./circomlib/circuits/poseidon.circom";
include "./ReputationTree.circom";

template RiskRatingProof(nLevels) {
    // set by admin
		signal input raterKey;
		signal input publicAddr;
    // Construction of Proof
		signal input pathIndices[nLevels];
    signal input siblings[nLevels];
    // outputs
		signal output root;
    signal output id;
    // Build Identiity Commitment using Poseidon
    component hasher = Poseidon(2);
    signal identityCommitment;
    hasher.inputs[0] <== publicAddr;
    hasher.inputs[1] <== raterKey;
    identityCommitment <== hasher.out;
    // Add user to this Reputation Tree and return the root and id
    component inclusionProof = MerkleTreeInclusionProof(nLevels);
    inclusionProof.leaf <== identityCommitment;

    for (var i = 0; i < nLevels; i++) {
        inclusionProof.siblings[i] <== siblings[i];
        inclusionProof.pathIndices[i] <== pathIndices[i];
    }

    root <== inclusionProof.root;
    // output  the root and id of the hashed address
    component idHasher = Poseidon(1);
    idHasher.inputs[0] <== publicAddr;
    id <== idHasher.out;

}

component main = RiskRatingProof(10);