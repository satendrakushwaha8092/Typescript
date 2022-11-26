//3. logic for anagram program with its time complexity. (for large strings)


function checkAnagram(a, b) {

    // Not of same length, can't be Anagram
    if (a.length !== b.length) {
        return false;
    }

    // Inbuilt functions to rearrange the string
    var str1 = a.split('').sort().join('');
    var str2 = b.split('').sort().join('');
    
    console.log(str1)
    console.log(str2)

    var result = (str1 === str2);
    return result;
}

// Checking the output
console.log(checkAnagram('vile', 'eliv'));

