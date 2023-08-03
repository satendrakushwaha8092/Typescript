function palindrome(str:string){
    let i=0
    let j=str.length-1
    if(str.length==0||str.length==1){
        return "palindrome"
    }
    while(i<j){
        if(str[i]==str[j]){
            i++;
            j--;
        }else{
            return "not palindrome"
        }
    }
    return "palindrome"
}

console.log(palindrome('abcdcba'))


function palindrome2(str:string){
    if(str.length==0||str.length==1){
        return "palindrome"
    }
   for(let i=0; i<str.length/2; i++){
    if(str[i]==str[str.length-1-i]){
        continue
    }else{
        return "not palindrome"
    }
   }
    return "palindrome"
}

console.log(palindrome2('abcdcbaa'))