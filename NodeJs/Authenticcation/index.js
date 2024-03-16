const bcrypt=require('bcrypt');
const hashPashword=async (pw)=>{
    const salt=await bcrypt.genSalt(10);
    const hash =await bcrypt.hash(pw,salt);
    console.log(salt);
    console.log(hash);
}
const login=async (pw,hashedPw)=>{
    const result=await bcrypt.compare(pw,hashedPw);
    if(result){
console.log("Logged in");
    }else{
        console.log("Incorrect!");
    }
}
hashPashword('Babu');

login("Babu","$2b$10$UzisNAg9MdNc/jPoqfSVQezCiwJ.JlR1u8npoC/04yaHFKU9El5Ne")