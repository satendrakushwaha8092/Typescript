//11. Find prime numbers from 1 ....n 

function primeNumbers(n){
    let count = 0;
    for(let i=1; i<n; i++){
        count=0
        for(let j=1; j<i; j++){
            if(i%j==0) count++;
        }
        if(count==1) console.log(i)
    }
}

primeNumbers(100)