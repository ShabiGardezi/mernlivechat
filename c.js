const chats=[{name:"hunfa",age:10},{name:"haris",age:22}];

// const newchats=chats.map((e)=>{
//     return {...e};
// });
const newchats=chats.slice();

console.log(chats);
console.log(newchats);

console.log("after: ");




newchats[0].age=15;
console.log(chats);
console.log(newchats);