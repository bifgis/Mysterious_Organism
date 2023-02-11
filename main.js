// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)]
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
        newStrand.push(returnRandBase())
    }
    return newStrand
}

const pAequorFactory = (num, bases) => {
    return {
        specimenNum: num,
        dna: bases,
        mutate() {
            let baseIndex = Math.floor(Math.random() * 15);
            let original = this.dna[baseIndex];
            let newBase;
            do {
                newBase = returnRandBase();
            }
            while (newBase == original);
            this.dna[baseIndex] = newBase;
        },
        compareDNA(pAequorObj) {
            let shared = 0;
            if (this.dna.length !== pAequorObj.dna.length) {
                console.log('Different Number of Bases, please compare strands of identical length');
                return undefined;
            }
            for (let i = 0; i < this.dna.length; i++) {
                if (this.dna[i] === pAequorObj.dna[i]) {
                    shared++;
                }
            }
            console.log(shared);
            let percentShared = shared / (this.dna.length) * 100;
            console.log(`Specimen #${this.specimenNum} and Specimen #${pAequorObj.specimenNum} have ${percentShared}% DNA in common.`);
        },
        willLikelySurvive() {
            let count = 0;
            /*    for (let i = 0; i < this.dna.length; i++){
                    if (this.dna[i] === 'C' || this.dna[i] === 'G'){
                      count++;
                    }
                  }
            */
            this.dna.forEach(item => {
                if (item === 'C' || item === 'G') {
                    count++;
                }
            })
            if (count / this.dna.length >= 0.6) {
                return true;
            }
            return false;
        }
    }
}


const instantiateZoo = () => {
    let returnZoo = [];
    let count = 1;
    do {
        count++;
        let newPAequor = pAequorFactory(count, mockUpStrand());
        if (newPAequor.willLikelySurvive()) {
            returnZoo.push(newPAequor);
        }
    }
    while (returnZoo.length < 30);
    return returnZoo;
}

const survivorsZoo = instantiateZoo();

console.log(survivorsZoo)